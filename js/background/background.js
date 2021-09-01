chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({
        config: initConfigDefine
    });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.task == "setDisabledEmail") {
        console.log("In Task setDisabledEmail");
        console.log("******************");
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

                            //@todo custom  handle export email die
                            var emailDied = {
                                'type': 'disableemail',
                                'email': message.email,
                                'vps': result.config.ipserver,
                                'key': result.config.keyapi,
                            };

                            chrome.tabs.sendMessage(tabCurrent, {
                                task: sTask,
                                status: 'success',
                                data: emailDied
                            });
                        });
                    }
                }
            });
        });
    }

    //Get data video comment
    if (message.task == "getDataCommentVideo") {
        console.log("In Task getDataCommentVideo");
        console.log("******************");
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
                            //@todo custom  Get data comment video
                            chrome.tabs.sendMessage(tabCurrent, {
                                task: sTask,
                                status: 'success',
                                data: random_item(result.config.comments)
                            });
                        });
                    }
                }
            });
        });
    }

    //@todo custom  Get data video
    if (message.task == "getDataVideo") {
        console.log("In Task getDataVideo");
        console.log("******************");
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

                    //@todo custom  call api to get value define
                    if (nTime == nTitleGet || flag == true) {
                        chrome.storage.sync.get('config', function (result) {
                            var sTask = 'getDataVideoResult';
                            //@todo custom  call api to get value define
                            chrome.storage.sync.get('config', function () {
                                var initConfig = result.config;
                                var videoUse = random_item(initConfig.videos);
                                var sVideoID = videoUse.id;
                                var sTitle = videoUse.title;
                                var duration = videoUse.time;         //Thoi gian xem
                                var nTimeSub = videoUse.time_sub;     //Thoi gian sub

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
                        });
                    }
                }
            });
        });
    }

    //Get info video
    if (message.task == "getInfoVideo") {
        console.log("In Task getInfoVideo");
        console.log("******************");
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

                            //@todo custom  getInfoVideoResult
                            var videoUse = random_item(result.config.videos);
                            chrome.tabs.sendMessage(tabCurrent, {
                                task: sTask,
                                status: 'success',
                                data: videoUse.id
                            });
                        });
                    }
                }
            });
        });
    }

    //getInfoVideoDetail
    if (message.task == "getInfoVideoDetail") {
        console.log("In Task getInfoVideoDetail");
        console.log("*********************");
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

                            var timeViewAny = {
                                time: randomIntFromRange(100, 200),
                                time_sub: randomIntFromRange(120, 180),
                            };
                            console.log("sendMessage => timeViewAny");
                            console.log("*********************");
                            chrome.tabs.sendMessage(tabCurrent, {
                                task: sTask,
                                status: 'success',
                                data: timeViewAny
                            });
                        });
                    }
                }
            });
        });
    }

    //clearAllCache
    if (message.task == "clearAllCache") {
        console.log("In Task clearAllCache");
        console.log("*********************");
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
                        var callback = function () {
                        };
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

//Random Array
function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}

// Get UrlParameter
function getUrlParameter(sParam, sUrl = '') {
    if (sUrl != '') {
        var sPageURL = sUrl;
    } else {
        var sPageURL = window.location.search.substring(1);
    }
    var sURLVariables = sPageURL.split('&');
    var sParameterName;
    var i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

//Random range Minmax
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}