jQuery(document).ready(function ($) {
    chrome.storage.sync.get('config', function (result) {
        var initConfig = result.config;

        if (initConfig.ipserver == '') {
            $.getJSON("https://api.ipify.org/?format=json", function (e) {
                $("#value-ipserver").val(e.ip);
                initConfig.ipserver = e.ip;

                $("#value-ipserver").val(e.ip);

                chrome.storage.sync.set({
                    config: initConfig
                });
            });
        } else {
            $("#value-ipserver").val(initConfig.ipserver);
        }

        $("#value-keyapi").val(initConfig.keyapi);

        if (initConfig.start == 'yes') {
            $("#btn-runvideo").html('Tool Đang Chạy...');
            $("#btn-getip").html('Tool Đang Chạy...');
        }
    });

    //Get IP Server
    $("body").on("click", "#btn-getip", function (event) {
        event.preventDefault();

        var ipServer = $.trim($("#value-ipserver").val());
        var keyapi = $.trim($("#value-keyapi").val());

        if (ipServer == '' || keyapi == '') {
            $(".result").html('<p class="alert alert-danger error">IP Server và Key API không được rỗng</p>');
        } else {
            var oThis = $(this);
            $(oThis).html('Loadding...');
            $(oThis).prop('disabled', true);
            $("#value-ipserver").prop('disabled', true);
            $("#value-keyapi").prop('disabled', true);

            $.ajax({
                type: 'post',
                dataType: 'json',
                url: urlGetDataDefine,
                data: {
                    "type": "info",
                    "ip": ipServer,
                    "key": keyapi,
                },
                beforeSend: function () {
                    $(".result").html('<p class="alert alert-primary">Đang lấy dữ liệu...</p>');
                },
                success: function (data) {
                    var dataGet = data.data;

                    $(oThis).prop('disabled', false);
                    $("#value-ipserver").prop('disabled', false);
                    $("#value-keyapi").prop('disabled', false);

                    if (data.type == 'success') {

                        chrome.storage.sync.get('config', function (result) {
                            var config = result.config;
                            config.auto_like = 'yes';
                            config.auto_subscribe = 'yes';
                            config.account = (dataGet.email != '') ? dataGet.email : '';
                            config.user_pro = true;
                            config.search_google = 'no';
                            config.search_bing = 'no';
                            config.keyapi = keyapi;
                            config.ipserver = ipServer;
                            config.autoremovecache = 'yes';
                            config.timechangeemail = 120;
                            config.start = 'yes';

                            chrome.storage.sync.set({
                                config: config
                            }, function () {
                            });

                            $(".result").html('<p class="alert alert-primary">Lấy dữ liệu thành công.</p>');
                            $("#btn-getip").html('Tool Đang Được Chạy...');

                            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                                chrome.tabs.sendMessage(tabs[0].id, {
                                    task: "runVideo",
                                    valueData: 'yes',
                                });
                            });
                        });
                    }

                    if (data.type == 'fail') {
                        $(".result").html('<p class="alert alert-danger error">' + dataGet + '</p>');
                        $(oThis).html('Đồng Bộ Và Khởi Chạy');
                    }
                },
                error: function (xhr, status, error) {
                    $(".result").html('<p class="alert alert-danger error">' + error + '</p>');
                    $(oThis).html('Đồng Bộ Và Khởi Chạy');
                }
            });
        }
    });

    //Btn Run Video
    $("body").on("click", "#btn-runvideo", function (event) {
        event.preventDefault();

        var oThis = $(this);
        var keyapi = $.trim($("#value-keyapi").val());
        if (keyapi == '') {
            $(".result").html('<p class="alert alert-danger error">Vui lòng nhập Key API trước khi khởi chạy Tool!</p>');
        } else {
            $(this).html('Đang Lấy Dữ Liệu...');
            $(oThis).prop('disabled', true);

            $.ajax({
                type: 'post',
                dataType: 'json',
                url: urlGetDataDefine,
                data: {
                    "type": "infothucong",
                    "key": keyapi,
                },
                beforeSend: function () {
                    $(".result").html('<p class="alert alert-primary">Đang lấy dữ liệu...</p>');
                },
                success: function (data) {
                    $(oThis).prop('disabled', false);
                    var dataGet = data.data;

                    if (data.type == 'success') {
                        chrome.storage.sync.get('config', function (result) {
                            var config = result.config;
                            config.user_pro = true;
                            config.search_google = 'no';
                            config.search_bing = 'no';
                            config.keyapi = keyapi;
                            config.autoremovecache = 'yes';
                            config.timechangeemail = 120;
                            config.start = 'yes';

                            chrome.storage.sync.set({
                                config: config
                            }, function () {
                            });

                            $(".result").html('<p class="alert alert-primary">Lấy dữ liệu thành công.</p>');
                            $(oThis).html('Tool Đang Được Chạy...');

                            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                                chrome.tabs.sendMessage(tabs[0].id, {
                                    task: "runVideo",
                                    valueData: 'yes',
                                });
                            });
                        });
                    }

                    if (data.type == 'fail') {
                        $(".result").html('<p class="alert alert-danger error">' + dataGet + '</p>');
                        $(oThis).html('Khởi Chạy Thủ Công');
                    }
                },
                error: function (xhr, status, error) {
                    $(".result").html('<p class="alert alert-danger error">' + error + '</p>');
                    $(oThis).html('Khởi Chạy Thủ Công');
                }
            });
        }
    });

    //Btn Cancel
    $("body").on("click", "#btn-cancel", function (event) {
        event.preventDefault();

        //Set config rong
        chrome.storage.sync.set({
            config: initConfigDefine
        });

        $("#btn-runvideo").html('Khởi Chạy');
    });

    $("body").on("click", "#btn-resetlogin", function (event) {
        event.preventDefault();

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                task: "removeCookie",
                valueData: 'yes',
            });
        });
    });
});


