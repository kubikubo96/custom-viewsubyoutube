chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({
        config: initConfigDefine
    });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.task == "setDisabledEmail") {
        var nTime = parseInt(message.time);

        chrome.tabs.query({}, function (tabs) {
            $.each(tabs, function (key, value) {
                var tabCurrent = tabs[key].id;

                var sTitleGet = tabs[key].title;

                var numchk = new RegExp("^[0-9]*$");
                if (numchk.test(sTitleGet)) {
                    var nTitleGet = parseInt(tabs[key].title);

                    var flag = false;
                    if (!isNaN(nTitleGet)) {
                        var nTimeCheck = nTime - nTitleGet;
                        if (nTimeCheck == 0 || nTimeCheck < 2) {
                            flag = true;
                        }
                    }

                    if (nTime == nTitleGet || flag == true) {
                        chrome.storage.sync.get('config', function (result) {
                            var sTask = 'setDisabledEmailResult';

                            $.ajax({
                                type: 'post',
                                dataType: 'json',
                                url: urlGetDataDefine,
                                data: {
                                    'type': 'disableemail',
                                    'email': message.email,
                                    'vps': result.config.ipserver,
                                    'key': result.config.keyapi,
                                },
                                success: function (data) {
                                    var dataGet = data.data;
                                    if (data.type == 'success') {
                                        chrome.tabs.sendMessage(tabCurrent, {
                                            task: sTask,
                                            status: 'success',
                                            data: dataGet
                                        });
                                    }

                                    if (data.type == 'error') {
                                        chrome.tabs.sendMessage(tabCurrent, {
                                            task: sTask,
                                            status: 'error',
                                            data: dataGet
                                        });
                                    }
                                },
                                error: function (xhr, status, error) {
                                    chrome.tabs.sendMessage(tabCurrent, {
                                        task: sTask,
                                        value: error,
                                        status: 'fail'
                                    });
                                }
                            });
                        });
                    }
                }
            });
        });
    }

    //Get data video comment
    if (message.task == "getDataCommentVideo") {
        var nTime = parseInt(message.time);
        var sVideo = message.video;

        chrome.tabs.query({}, function (tabs) {
            $.each(tabs, function (key, value) {
                var tabCurrent = tabs[key].id;

                var sTitleGet = tabs[key].title;

                var numchk = new RegExp("^[0-9]*$");
                if (numchk.test(sTitleGet)) {
                    var nTitleGet = parseInt(tabs[key].title);

                    var flag = false;
                    if (!isNaN(nTitleGet)) {
                        var nTimeCheck = nTime - nTitleGet;
                        if (nTimeCheck == 0 || nTimeCheck < 2) {
                            flag = true;
                        }
                    }

                    if (nTime == nTitleGet || flag == true) {
                        chrome.storage.sync.get('config', function (result) {
                            var sTask = 'getDataVideoCommentResult';

                            $.ajax({
                                type: 'post',
                                dataType: 'json',
                                url: urlGetDataDefine,
                                data: {
                                    "type": "comment",
                                    "key": result.config.keyapi,
                                    "video": sVideo,
                                },
                                success: function (data) {
                                    var dataGet = data.data;
                                    if (data.type == 'success') {
                                        chrome.tabs.sendMessage(tabCurrent, {
                                            task: sTask,
                                            status: 'success',
                                            data: dataGet
                                        });
                                    } else {
                                        chrome.tabs.sendMessage(tabCurrent, {
                                            task: sTask,
                                            status: 'success',
                                            data: initConfigDefine.comments[Math.floor(Math.random() * initConfigDefine.comments.length)]
                                        });
                                    }
                                },
                                error: function (xhr, status, error) {
                                    chrome.tabs.sendMessage(tabCurrent, {
                                        task: sTask,
                                        status: 'success',
                                        data: initConfigDefine.comments[Math.floor(Math.random() * initConfigDefine.comments.length)]
                                    });
                                }
                            });
                        });
                    }
                }
            });
        });
    }

    //Get data video @custom
    if (message.task == "getDataVideo") {
        var nTime = parseInt(message.time);

        chrome.tabs.query({}, function (tabs) {
            $.each(tabs, function (key, value) {
                var tabCurrent = tabs[key].id;
                var sTitleGet = tabs[key].title;

                var numchk = new RegExp("^[0-9]*$");
                if (numchk.test(sTitleGet)) {
                    var nTitleGet = parseInt(tabs[key].title);

                    var flag = false;
                    if (!isNaN(nTitleGet)) {
                        var nTimeCheck = nTime - nTitleGet;
                        if (nTimeCheck == 0 || nTimeCheck < 2) {
                            flag = true;
                        }
                    }

                    if (nTime == nTitleGet || flag == true) {
                        chrome.storage.sync.get('config', function (result) {
                            var sTask = 'getDataVideoResult';
                            var config = result.config;

                            if (config.keyapi != '' && config.keyapi != null) {
                                //@custom call api to get value define
                                chrome.storage.sync.get('config', function () {
                                    var initConfig = initConfigDefine;
                                    var videoUse = initConfigDefine.videos[Math.floor(Math.random() * initConfigDefine.videos.length)];
                                    var sVideoID = videoUse.id;
                                    var sTitle = videoUse.title;
                                    var duration = videoUse.time;         //Thoi gian xem
                                    var nTimeSub = videoUse.time_sub;     //Thoi gian sub

                                    initConfig.user_pro = true;
                                    initConfig.search_bing = 'no';
                                    initConfig.search_google = 'no';
                                    initConfig.autoremovecache = 'yes';
                                    initConfig.timechangeemail = 'yes';
                                    initConfig.views = 1;

                                    var flag = false;
                                    if (initConfig.data != '') {
                                        $.each(initConfig.data, function (key, val) {
                                            if (val.chromeTab == tabCurrent) {
                                                flag = true;

                                                initConfig.data[key].videoID = sVideoID;
                                                initConfig.data[key].videoTitle = sTitle;
                                                initConfig.data[key].duration = duration;
                                                initConfig.data[key].timeSub = nTimeSub;
                                                initConfig.data[key].chromeTab = tabCurrent;
                                            }
                                        });
                                    }

                                    setTimeout(function () {
                                        if (flag == false) {
                                            initConfig.data.push({
                                                videoID: sVideoID,
                                                videoTitle: sTitle,
                                                duration: duration,
                                                timeSub: nTimeSub,
                                                chromeTab: tabCurrent,
                                            });
                                        }

                                        chrome.storage.sync.set({
                                            config: initConfig
                                        });

                                        chrome.tabs.sendMessage(tabCurrent, {
                                            task: sTask,
                                            value: sTitle,
                                            status: 'success',
                                        });
                                    }, 1000);
                                });
                            } else {
                                chrome.storage.sync.get('config', function () {
                                    var initConfig = initConfigDefine;
                                    var videoUse = initConfigDefine.videos[Math.floor(Math.random() * initConfigDefine.videos.length)];
                                    var sVideoID = videoUse.id;
                                    var sTitle = videoUse.title;
                                    var duration = videoUse.time;         //Thoi gian xem
                                    var nTimeSub = videoUse.time_sub;     //Thoi gian sub

                                    initConfig.user_pro = true;
                                    initConfig.search_bing = 'no';
                                    initConfig.search_google = 'no';
                                    initConfig.autoremovecache = 'yes';
                                    initConfig.timechangeemail = 'yes';
                                    initConfig.views = 1;

                                    var flag = false;
                                    if (initConfig.data != '') {
                                        $.each(initConfig.data, function (key, val) {
                                            if (val.chromeTab == tabCurrent) {
                                                flag = true;

                                                initConfig.data[key].videoID = sVideoID;
                                                initConfig.data[key].videoTitle = sTitle;
                                                initConfig.data[key].duration = duration;
                                                initConfig.data[key].timeSub = nTimeSub;
                                                initConfig.data[key].chromeTab = tabCurrent;
                                            }
                                        });
                                    }

                                    setTimeout(function () {
                                        if (flag == false) {
                                            initConfig.data.push({
                                                videoID: sVideoID,
                                                videoTitle: sTitle,
                                                duration: duration,
                                                timeSub: nTimeSub,
                                                chromeTab: tabCurrent,
                                            });
                                        }

                                        chrome.storage.sync.set({
                                            config: initConfig
                                        });

                                        chrome.tabs.sendMessage(tabCurrent, {
                                            task: sTask,
                                            value: sTitle,
                                            status: 'success',
                                        });
                                    }, 1000);
                                });
                            }
                        });
                    }
                }
            });
        });
    }

    //Get info video
    if (message.task == "getInfoVideo") {
        var nTime = parseInt(message.time);

        chrome.tabs.query({}, function (tabs) {
            $.each(tabs, function (key, value) {
                var tabCurrent = tabs[key].id;
                var sTitleGet = tabs[key].title;

                var numchk = new RegExp("^[0-9]*$");
                if (numchk.test(sTitleGet)) {
                    var nTitleGet = parseInt(tabs[key].title);

                    var flag = false;
                    if (!isNaN(nTitleGet)) {
                        var nTimeCheck = nTime - nTitleGet;
                        if (nTimeCheck == 0 || nTimeCheck < 2) {
                            flag = true;
                        }
                    }

                    if (nTime == nTitleGet || flag == true) {
                        chrome.storage.sync.get('config', function (result) {
                            var sTask = 'getInfoVideoResult';
                            var config = result.config;

                            $.ajax({
                                type: 'post',
                                dataType: 'json',
                                url: urlGetDataDefine,
                                data: {
                                    "type": "infovideo",
                                    "key": config.keyapi,
                                    "videoid": message.videoID
                                },
                                success: function (data) {
                                    if (data.type == 'success') {
                                        chrome.tabs.sendMessage(tabCurrent, {
                                            task: sTask,
                                            status: 'success',
                                            data: data.data
                                        });
                                    } else {
                                        chrome.tabs.sendMessage(tabCurrent, {
                                            task: sTask,
                                            status: 'error',
                                        });
                                    }
                                },
                                error: function (xhr, status, error) {
                                    chrome.tabs.sendMessage(tabCurrent, {
                                        task: sTask,
                                        value: error,
                                        status: 'error'
                                    });
                                }
                            });
                        });
                    }
                }
            });
        });
    }

    //getInfoVideoDetail
    if (message.task == "getInfoVideoDetail") {
        var nTime = parseInt(message.time);

        chrome.tabs.query({}, function (tabs) {
            $.each(tabs, function (key, value) {
                var tabCurrent = tabs[key].id;
                var sTitleGet = tabs[key].title;

                var numchk = new RegExp("^[0-9]*$");
                if (numchk.test(sTitleGet)) {
                    var nTitleGet = parseInt(tabs[key].title);

                    var flag = false;
                    if (!isNaN(nTitleGet)) {
                        var nTimeCheck = nTime - nTitleGet;
                        if (nTimeCheck == 0 || nTimeCheck < 2) {
                            flag = true;
                        }
                    }

                    if (nTime == nTitleGet || flag == true) {
                        chrome.storage.sync.get('config', function (result) {
                            var sTask = 'getInfoVideoDetailResult';
                            var config = result.config;

                            $.ajax({
                                type: 'post',
                                dataType: 'json',
                                url: urlGetDataDefine,
                                data: {
                                    "type": "infovideodetail",
                                    "key": config.keyapi,
                                    "videoid": message.videoID
                                },
                                success: function (data) {
                                    if (data.type == 'success') {
                                        chrome.tabs.sendMessage(tabCurrent, {
                                            task: sTask,
                                            status: 'success',
                                            data: data.data
                                        });
                                    } else {
                                        chrome.tabs.sendMessage(tabCurrent, {
                                            task: sTask,
                                            status: 'success',
                                            data: data.data
                                        });
                                    }
                                },
                                error: function (xhr, status, error) {
                                    chrome.tabs.sendMessage(tabCurrent, {
                                        task: sTask,
                                        status: 'success',
                                        data: data.data
                                    });
                                }
                            });
                        });
                    }
                }
            });
        });
    }

    //clearAllCache
    if (message.task == "clearAllCache") {
        var nTime = parseInt(message.time);

        chrome.tabs.query({}, function (tabs) {
            $.each(tabs, function (key, value) {
                var sTitleGet = tabs[key].title;

                var numchk = new RegExp("^[0-9]*$");
                if (numchk.test(sTitleGet)) {
                    var nTitleGet = parseInt(tabs[key].title);

                    var flag = false;
                    if (!isNaN(nTitleGet)) {
                        var nTimeCheck = nTime - nTitleGet;
                        if (nTimeCheck == 0 || nTimeCheck < 2) {
                            flag = true;
                        }
                    }

                    if (nTime == nTitleGet || flag == true) {
                        var callback = function () { };
                        var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
                        var oneWeekAgo = (new Date()).getTime() - millisecondsPerWeek;
                        chrome.browsingData.remove({
                            "since": oneWeekAgo
                        }, {
                            "appcache": true,
                            "cache": true,
                            "cacheStorage": true,
                            "cookies": true,
                            "downloads": true,
                            "fileSystems": true,
                            "formData": true,
                            "history": true,
                            "indexedDB": true,
                            "localStorage": true,
                            "passwords": true,
                            "serviceWorkers": true,
                            "webSQL": true
                        }, callback);
                    }
                }
            });
        });
    }
});