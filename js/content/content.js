jQuery(document).ready(function ($) {
    var aDomain = initConfigDefine.websites;
    var config = '';

    var sYB = 'www.youtube.com';
    var sGo = 'www.google.com';
    var sBi = 'www.bing.com';
    var sAc = 'accounts.google.com';
    var sLinkLogin = 'https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Dvi%26next%3D%252F&amp%3Bhl=vi&amp%3Bpassive=false&amp%3Bservice=youtube&amp%3Builel=0&flowName=GlifWebSignIn&flowEntry=AddSession';

    if (typeof chrome.runtime.onMessage === "undefined") {
    } else {
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            if (message.task == "runVideo" && message.valueData == 'yes') {
                window.location.href = 'https://' + sYB;
            }

            if (message.task == "removeCookie" && message.valueData == 'yes') {
                window.location.href = 'https://www.youtube.com/?removecookie=yes';
            }
        });
    }

    var checkRemoveCookie = getUrlParameter('removecookie');
    if (checkRemoveCookie != undefined && checkRemoveCookie == 'yes') {
        eraseCookie('vtyoutubeaccounts');

        chrome.storage.sync.set({
            config: initConfigDefine
        });

        $('p.extension-show-info').remove();
        var sHtml = '<p class="extension-show-info">Reset Login Thành Công!</p>';
        $(sHtml).appendTo('body');
    }

    //Get Account
    chrome.storage.sync.get('config', function (result) {
        config = result.config;
        console.log("Get Account In chrome.storage.sync content.js/40");
        console.log("config:");
        console.log(config);
        console.log("*******************");
        if (config.start == "yes") {
            aDomain = config.websites;

            var flagLogin = false;
            var flagRundom = true;
            var sUrlFull = window.location.href;
            var sDomain = location.hostname;

            //Account
            if (sDomain == sAc) {
                flagLogin = true;
                flagRundom = false;
                var flag = false;

                var sAccount = random_item(config.account.split(/\r?\n/));
                console.log("Get Account");
                console.log("sAccount:" + sAccount);
                console.log("flag:" + flag);
                console.log("************************");
                if (sAccount != '') {
                    var aAccount = sAccount.split('|');
                    var sEmail = $.trim(aAccount[0]);
                    var sPassWord = $.trim(aAccount[1]);
                    var sEmailRecovery = $.trim(aAccount[2]);
                    if (sEmail != '' && sPassWord != '') {
                        flag = true;
                        chrome.storage.sync.get('config', function (result) {
                            var initConfig = result.config;

                            initConfig.data = [];
                            chrome.storage.sync.set({
                                config: initConfig
                            });
                        });

                        console.log("Run fun auToLoginAccount");
                        auToLoginAccount(sEmail, sPassWord, sEmailRecovery);
                    }
                }

                if (flag == false) {
                    window.location.href = 'https://' + sGo;
                }
            }

            //Youtube
            if (sDomain == sYB) {
                console.log("IN DOMAIN YOUTUBE");
                console.log("*****************");
                flagRundom = false;
                var checkHome = true;

                /*================= START Detail Video =================*/
                var checkDetailVideo = youtube_parser(sUrlFull);
                if (checkDetailVideo != false && checkDetailVideo != '') {
                    checkHome = false;
                    setTimeout(function () {
                        if ($(".extension-show-info.viewvideo").length) {
                        } else {
                            var nDuration = '';
                            $.each(config.data, function (key, val) {
                                if (val.videoID == checkDetailVideo) {
                                    nDuration = val.duration;
                                }
                            });

                            if (nDuration == '') {
                                nDuration = 300;
                            }

                            viewXem(parseInt(nDuration) + parseInt(randomIntFromRange(10, 50)));
                        }
                    }, randomIntFromRange(4000, 7000));
                }
                /*================= END Detail Video =================*/

                /*================= START Find video =================*/
                var checkSearch = getUrlParameter('search_query');
                console.log("Start find video in YOUTUBE");
                console.log("***********************");
                if (checkSearch != undefined && checkSearch != '') {
                    checkHome = false;

                    var sTitle = $('#search-form input#search').val();
                    if ($("#contents a.ytd-thumbnail").length && sTitle != '') {
                        var sVideoID = '';
                        var nDuration = 300;

                        if (config.data != '') {
                            $.each(config.data, function (key, val) {
                                if (val.videoTitle == sTitle) {
                                    sVideoID = val.videoID;
                                    nDuration = val.duration;
                                }
                            });
                        }

                        if (sVideoID != '') {
                            $('p.extension-show-info').remove();
                            var sHtml = '<p class="extension-show-info">Đang tìm Video có ID: ' + sVideoID + '</p>';
                            $(sHtml).appendTo('body');

                            autoScrollBrowser();

                            setTimeout(function () {
                                var check = false;
                                $("#contents a.ytd-thumbnail").each(function (i, obj) {
                                    if ($(this).attr('href') != undefined) {
                                        var idVideoGet = youtube_parser($(this).attr('href'));
                                        if (idVideoGet != false && idVideoGet == sVideoID) {
                                            check = true;

                                            $(this).find('.no-transition').click();

                                            viewXem(parseInt(nDuration) + parseInt(randomIntFromRange(10, 50)));

                                            return false;
                                        }
                                    }
                                });

                                setTimeout(function () {
                                    if (check == false) {
                                        window.location.href = 'https://' + sYB;
                                    }
                                }, 1500);
                            }, randomIntFromRange(12000, 18000));
                        } else {
                            window.location.href = 'https://' + sYB;
                        }
                    } else {
                        window.location.href = 'https://' + sYB;
                    }
                }
                /*================= END Find video =================*/

                if (sUrlFull == 'https://' + sYB + '/' || checkHome == true) {
                    if (config.account != '' && config.account != null && readCookie('vtyoutubeaccounts') == null) {
                        flagLogin = true;

                        if (config.autoremovecache == 'yes') {
                            console.log("In clear cache trình duyệt");
                            console.log("***********************");
                            $('p.extension-show-info').remove();
                            var sHtml = '<p class="extension-show-info">Đang xóa cache trình duyệt...</p>';
                            $(sHtml).appendTo('body');

                            flagRundom = false;

                            var date = new Date();
                            var seconds = Math.round(date.getTime() / 1000);
                            var sTime = seconds.toString();
                            document.title = sTime;

                            chrome.runtime.sendMessage({
                                task: "clearAllCache",
                                time: sTime,
                            });

                            setTimeout(function () {
                                createCookie('vtyoutubeaccounts', 'yes', config.timechangeemail);
                            }, 10000);
                        } else {
                            createCookie('vtyoutubeaccounts', 'yes', config.timechangeemail);
                            return false;
                        }
                    }

                    if (flagLogin == false) {
                        var nRandom = random_item([1, 1, 3, 1, 1, 3, 1, 1, 2]);

                        if (nRandom == 1) {
                            autoSearchData('youtube');
                        }

                        if (nRandom == 2) {
                            setTimeout(function () {
                                randomHomeYT();
                            }, randomIntFromRange(5000, 10000));
                        }

                        if (nRandom == 3) {
                            autoRedrectRandomLink();
                        }
                    }
                }
            }

            //Google
            if (sDomain == sGo && config.search_google == 'yes') {
                //@todo custom  search google
                console.log("IN Domain Google");
                flagRundom = false;
                var checkSearch = getUrlParameter('q');
                console.log("checkSearch:" + checkSearch);
                if (checkSearch == undefined) {
                    var check = random_item([1, 2, 1]);
                    if (check == 1) {
                        autoSearchData('google');
                    } else {
                        autoRedrectRandomLink();
                    }
                } else {
                    setTimeout(function () {
                        var sTitle = $('input.gLFyf').val();
                        if (sTitle == undefined) { sTitle = $('.tsf-p #lst-ib').val(); }
                        if (sTitle == undefined) { sTitle = $('.wQnou input.JSAgYe').val(); }
                        if (sTitle == undefined) { sTitle = $('input#lst-ib').val(); }
                        if (sTitle == undefined) {
                            var aTitle = document.title.split(' - ');
                            sTitle = aTitle[0];
                        }
                        console.log("sTitle:" + sTitle);
                        if (sTitle == undefined || sTitle == '') {
                            window.location.href = 'https://' + sGo + '/';
                        }

                        var sVideoID = '';
                        if (sTitle != '' && sTitle != undefined) {
                            if (config.data != '') {
                                $.each(config.data, function (key, val) {
                                    if (val.videoTitle == sTitle) {
                                        sVideoID = val.videoID;
                                    }
                                });
                            }
                            console.log("sVideoID:" + sVideoID);
                            if (sVideoID != '') {
                                autoScrollBrowser();

                                $('p.extension-show-info').remove();
                                var sHtml = '<p class="extension-show-info">Đang tìm Video có ID: ' + sVideoID + '</p>';
                                $(sHtml).appendTo('body');

                                setTimeout(function () {
                                    var flag = false;

                                    //Tab Tất Cả
                                    /*if ($(".y8AWGd a").length) {
                                        $(".y8AWGd a").each(function (index, value) {
                                            var idVideoGet = youtube_parser($(this).attr('href'));
                                            console.log("Tab Tất Cả idVideoGet:" + idVideoGet);
                                            if (idVideoGet != false && idVideoGet == sVideoID) {
                                                flag = true;
                                                $(this)[0].click();
                                                return;
                                            }
                                        });
                                    }*/
                                    console.log("Start find video in Google");
                                    console.log("***********************");
                                    //@todo custom  search videos google
                                    //Tab Tất Cả
                                    if ($('#search a').length) {
                                        $("#search a").each(function () {
                                            var idVideoGet = youtube_parser($(this).attr('href'));
                                            console.log("Tab Tất Cả idVideoGet:" + idVideoGet);
                                            if (idVideoGet != false && idVideoGet == sVideoID) {
                                                flag = true;
                                                $(this)[0].click();
                                                return;
                                            }
                                        });
                                    }

                                    //Tab Video
                                    if ($(".yuRUbf > a").length) {
                                        $(".yuRUbf > a").each(function (index, value) {
                                            var idVideoGet = youtube_parser($(this).attr('href'));
                                            console.log("Tab Video idVideoGet:" + idVideoGet);
                                            if (idVideoGet != false && idVideoGet == sVideoID) {
                                                flag = true;
                                                $(this)[0].click();
                                                return;
                                            }
                                        });
                                    }

                                    //Tab other
                                    if ($("#rso .rc .r > a").length) {
                                        $("#rso .rc .r > a").each(function (index, value) {
                                            var idVideoGet = youtube_parser($(this).attr('href'));
                                            console.log("Tab other idVideoGet:" + idVideoGet);
                                            if (idVideoGet != false && idVideoGet == sVideoID) {
                                                flag = true;
                                                $(this)[0].click();
                                                return;
                                            }
                                        });
                                    }

                                    setTimeout(function () {
                                        if (flag == false) {
                                            //Tab Not Tab Hinh Anh
                                            if ($("#hdtb-msb-vis .hdtb-mitem.hdtb-msel").length) {
                                                //Chuyen Tab
                                                if ($("#hdtb-msb-vis .hdtb-mitem.hdtb-msel").next().find('a').attr('href') == undefined) {
                                                    window.location.href = 'https://' + sGo + '/';
                                                } else {
                                                    $("#hdtb-msb-vis .hdtb-mitem.hdtb-msel").next().find('a')[0].click();
                                                }
                                            }

                                            //Tab Hinh Anh
                                            if ($(".T47uwc .NZmxZe").length) {
                                                $(".T47uwc .rQEFy.NZmxZe").next()[0].click();
                                            }

                                            setTimeout(function () {
                                                window.location.href = 'https://' + sGo + '/';
                                            }, 5000);
                                        }
                                    }, 2500);
                                }, randomIntFromRange(8000, 15000));
                            } else {
                                window.location.href = 'https://' + sGo + '/';
                            }
                        }
                    }, 1500);
                }
            }

            //Bing
            if (sDomain == sBi && config.search_bing == 'yes') {
                flagRundom = false;
                var checkSearch = getUrlParameter('q');
                if (checkSearch == undefined) {
                    var check = random_item([1, 2, 1]);
                    if (check == 1) {
                        autoSearchData('bing');
                    } else {
                        autoRedrectRandomLink();
                    }
                } else {
                    var checkDetail = getUrlParameter('view');
                    if (checkDetail == undefined) {
                        var sTitle = $('#sb_form #sb_form_q').val();
                        if (sTitle != '' && sTitle != undefined) {
                            if (config.data != '') {
                                $.each(config.data, function (key, val) {
                                    if (val.videoTitle == sTitle) {
                                        sVideoID = val.videoID
                                    }
                                });
                            }

                            if (sVideoID != '') {
                                autoScrollBrowser();

                                $('p.extension-show-info').remove();
                                var sHtml = '<p class="extension-show-info">Đang tìm Video có ID: ' + sVideoID + '</p>';
                                $(sHtml).appendTo('body');

                                setTimeout(function () {
                                    if ($(".b_scopebar #b-scopeListItem-video.b_active").length) {
                                        var flag = false;
                                        $(".dg_b .dg_u .mc_vtvc_link").each(function (index, value) {
                                            var dataGet = $(this).find('.vrhdata').attr('vrhm');
                                            if (dataGet != undefined) {
                                                var aArr = $.parseJSON(dataGet);
                                                if (aArr['murl'] != '') {
                                                    var idVideoGet = youtube_parser(aArr['murl']);
                                                    if (idVideoGet != false && idVideoGet == sVideoID) {
                                                        flag = true;
                                                        $(this)[0].click();
                                                        return;
                                                    }
                                                }
                                            }
                                        });

                                        setTimeout(function () {
                                            if (flag == false) {
                                                window.location.href = random_item(aDomain);
                                            }
                                        }, 1500);
                                    } else {
                                        if ($(".b_scopebar li.b_active").next().length) {
                                            $(".b_scopebar li.b_active").next().find('a')[0].click();
                                        } else {
                                            window.location.href = random_item(aDomain);
                                        }
                                    }
                                }, randomIntFromRange(8000, 15000));
                            } else {
                                window.location.href = random_item(aDomain);
                            }
                        } else {
                            window.location.href = random_item(aDomain);
                        }
                    } else {
                        setTimeout(function () {
                            var nDuration = '';
                            var idVideoGet = youtube_parser($("#mm_vdmb_keydata .mmvdp_meta_title_link").attr('href'));
                            if (idVideoGet != false) {
                                $.each(config.data, function (key, val) {
                                    if (val.videoID == idVideoGet) {
                                        nDuration = val.duration;
                                    }
                                });
                            }

                            setTimeout(function () {
                                if (nDuration == '') {
                                    nDuration = 300;
                                }

                                nDuration = parseInt(nDuration) + parseInt(randomIntFromRange(10, 50));

                                $('p.extension-show-info').remove();
                                var sHtml = '<p class="extension-show-info">' +
                                    'Thời gian xem video còn lại: <span id="extension-clock">' + nDuration + '</span>s' +
                                    '</p>';
                                $(sHtml).appendTo('body');

                                var sTime = setInterval(function () {
                                    nDuration--;
                                    if (nDuration >= 0) {
                                        $("#extension-clock").html(nDuration);
                                    }

                                    if (nDuration === 0 || nDuration <= 0) {
                                        window.location.href = random_item(aDomain);
                                        clearInterval(sTime);
                                    }
                                }, 1000);

                            }, 1500);
                        }, 2500);
                    }
                }
            }

            if (flagRundom == true) {
                autoRedrectRandomLink();
            }
        }
    });

    //Auto search
    function autoSearchData(sDomain = '') {
        console.log("In Fun autoSearchData");
        console.log("sDomain:" + sDomain);
        console.log("*********************");
        $('p.extension-show-info').remove();
        var sHtml = '<p class="extension-show-info">Đang lấy video để xem...</p>';
        $(sHtml).appendTo('body');

        if (sDomain == 'youtube') {
            $('#search-form input#search').val('');
        }

        if (sDomain == 'google') {
            $('.tsf input.gLFyf').val('');
        }

        if (sDomain == 'bing') {
            $('#sb_form_q').val('');
        }

        var flagCheck = true;
        var date = new Date();
        var seconds = Math.round(date.getTime() / 1000);
        var sTime = seconds.toString();

        document.title = sTime;

        chrome.runtime.sendMessage({
            task: "getDataVideo",
            time: sTime,
        });

        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            if (message.task == "getDataVideoResult") {
                if (message.status == 'success') {
                    var sTtitle = message.value;

                    $('p.extension-show-info').remove();
                    var sHtml = '<p class="extension-show-info">Từ khóa tìm kiếm: ' + sTtitle + '</p>';
                    $(sHtml).appendTo('body');

                    if (sDomain == 'bing') {
                        if ($('form#sb_form').length) {
                            $('#sb_form_q').bind('autotyped', function () {
                                setTimeout(function () {
                                    $("form#sb_form .search").click();
                                }, randomIntFromRange(800, 2200));

                            }).autotype(sTtitle, { delay: randomIntFromRange(80, 200) });
                        } else {
                            window.location.href = random_item(aDomain);
                        }
                    }

                    if (sDomain == 'google') {
                        if ($('input.gLFyf').length) {
                            $('input.gLFyf').click();
                            $('input.gLFyf').bind('autotyped', function () {
                                setTimeout(function () {
                                    $("#tsf").submit();
                                    $("form").submit();
                                }, randomIntFromRange(800, 2200));
                            }).autotype(sTtitle, { delay: randomIntFromRange(80, 200) });
                        } else {
                            window.location.href = random_item(aDomain);
                        }
                    }

                    if (sDomain == 'youtube') {
                        if ($('#search-form input#search').length) {
                            $('#search-form input#search').bind('autotyped', function () {
                                setTimeout(function () {
                                    $("#search-icon-legacy").click();
                                }, randomIntFromRange(800, 2200));
                            }).autotype(sTtitle, { delay: randomIntFromRange(80, 200) });
                        } else {
                            window.location.href = random_item(aDomain);
                        }
                    }
                }

                if (message.status == 'fail') {
                    flagCheck = false;
                    $('p.extension-show-info').remove();
                    var sHtml = '<p class="extension-show-info error">' + message.value + '</p>';
                    $(sHtml).appendTo('body');
                }
            }
        });

        setTimeout(function () {
            if (flagCheck == true) {
                window.location.href = random_item(aDomain);
            }
        }, 65000);
    }

    //Login account
    function auToLoginAccount(sEmail = '', sPassWord = '', sEmailRecovery = '') {
        console.log("In Fun auToLoginAccount");
        console.log("Email: " + sEmail);
        console.log("PassWord: " + sPassWord);
        console.log("EmailRecovery: " + sEmailRecovery);
        console.log("***************");
        var flagCheck = false;
        $('p.extension-show-info').remove();
        var sHtml = '<p class="extension-show-info">' +
            '- Email: ' + sEmail + '<br>' +
            '- Mật Khẩu: ' + sPassWord + '<br>' +
            '- Email Khôi Phục: ' + sEmailRecovery +
            '</p>';
        $(sHtml).appendTo('body');

        var sUrlFull = window.location.href;

        var checkLinkCurrent = sUrlFull.split('?continue=');
        if (checkLinkCurrent.length == 2) {
            checkLinkCurrent = checkLinkCurrent[0];
        } else {
            checkLinkCurrent = '';
        }

        setTimeout(function () {
            //Email Disabled
            var nCheck = sUrlFull.split("/disabled/").length;
            if (nCheck == 2) {
                flagCheck = true;
                sendEmailDisabled(sEmail);
            }

            //UserName
            var checkLink = sUrlFull.split('/identifier');
            if (checkLink.length == 2) {
                flagCheck = true;

                $('p.extension-show-info').remove();
                var sHtml = '<p class="extension-show-info">- Email: ' + sEmail + '</p>';
                $(sHtml).appendTo('body');

                if ($("input[type=email]").length) {
                    $("input[type=email]").click();
                    $("input[type=email]").val(sEmail);
                } else {
                    $(".CxRgyd > div > .d2CFce input.whsOnd").click();
                    $(".CxRgyd > div > .d2CFce input.whsOnd").val(sEmail);
                }

                setTimeout(function () {
                    $(".qhFLie .U26fgb").click(); //BTN Tiep theo
                    $("button.VfPpkd-LgbsSe").click(); //BTN Tiep theo

                    auToLoginAccountChange(sEmail, sPassWord, sEmailRecovery, checkLinkCurrent);

                    return false;
                }, randomIntFromRange(2000, 3000));
            }

            //Password
            var checkLink = sUrlFull.split('/challenge/pwd');
            if (checkLink.length == 2) {
                flagCheck = true;

                $('p.extension-show-info').remove();
                var sHtml = '<p class="extension-show-info">- Mật Khẩu: ' + sPassWord + '</p>';
                $(sHtml).appendTo('body');

                if ($("input[type=password]").length) {
                    $("input[type=password]").click();
                    $("input[type=password]").val(sPassWord);
                } else {
                    $(".SdBahf input.whsOnd").click();
                    $(".SdBahf input.whsOnd").val(sPassWord);
                }

                setTimeout(function () {
                    $(".qhFLie .U26fgb").click(); //BTN Tiep theo
                    $(".qhFLie button.VfPpkd-LgbsSe").click(); //BTN Tiep theo

                    auToLoginAccountChange(sEmail, sPassWord, sEmailRecovery, checkLinkCurrent);

                    return false;
                }, randomIntFromRange(2000, 3000));
            }

            //Chon nut: xac nhan email khoi phuc cua bạn
            var checkLink = sUrlFull.split('/challenge/selection');
            if (checkLink.length == 2) {
                flagCheck = true;

                $(".OVnw0d .JDAKTe .lCoei").each(function (index) {
                    if ($(this).attr('data-challengetype') == 12) {
                        $(this).click();

                        auToLoginAccountChange(sEmail, sPassWord, sEmailRecovery, checkLinkCurrent);

                        return false;
                    }
                });
            }

            //Email khoi phuc
            var checkLink = sUrlFull.split('/challenge/kpe');
            if (checkLink.length == 2) {
                flagCheck = true;

                $('p.extension-show-info').remove();
                var sHtml = '<p class="extension-show-info">- Email khôi phục: ' + sEmailRecovery + '</p>';
                $(sHtml).appendTo('body');

                if ($("input[type=email]").length) {
                    $("input[type=email]").click();
                    $("input[type=email]").val(sEmailRecovery);
                } else {
                    $(".Xb9hP .whsOnd").val(sEmailRecovery);
                }

                setTimeout(function () {
                    $(".zQJV3 .qhFLie .U26fgb").click(); //BTN Tiep theo
                    $(".qhFLie button.VfPpkd-LgbsSe").click(); //BTN Tiep theo

                    auToLoginAccountChange(sEmail, sPassWord, sEmailRecovery, checkLinkCurrent);

                    return false;
                }, randomIntFromRange(2000, 3000));
            }

            if (flagCheck == false) {
                window.location.href = sLinkLogin;
            }
        }, randomIntFromRange(3000, 4500));
    }

    //AuToLoginAccountChange
    function auToLoginAccountChange(sEmail = '', sPassWord = '', sEmailRecovery = '', checkLinkCurrent = '') {
        console.log("In Fun auToLoginAccountChange");
        console.log("Email: " + sEmail);
        console.log("PassWord: " + sPassWord);
        console.log("EmailRecovery: " + sEmailRecovery);
        console.log("checkLinkCurrent: " + checkLinkCurrent);
        console.log("***************");

        var nTimeChangeAccount = 0;

        $('p.extension-show-info error').remove();
        var sHtml = '<p class="extension-show-info error">Đang đợi chuyển hướng trang đăng nhập: <span id="extension-clock">' + nTimeChangeAccount + '</span>s</p>';
        $(sHtml).appendTo('body');

        var sTimeChange = setInterval(function () {
            nTimeChangeAccount++;

            $("#extension-clock").html(nTimeChangeAccount);

            if (nTimeChangeAccount >= 20) {
                clearInterval(sTimeChange);

                window.location.href = sLinkLogin;
            } else {
                var sUrlFull = window.location.href;

                var checkLinkCurrentTemp = sUrlFull.split('?continue=');
                if (checkLinkCurrentTemp.length == 2) {
                    checkLinkCurrentTemp = checkLinkCurrentTemp[0];
                } else {
                    checkLinkCurrentTemp = '';
                }

                if (checkLinkCurrent != checkLinkCurrentTemp) {
                    clearInterval(sTimeChange);

                    $('p.extension-show-info.error').remove();

                    auToLoginAccount(sEmail, sPassWord, sEmailRecovery);
                }
            }
        }, 1000);
    }

    //send Email Disabled
    function sendEmailDisabled(sEmail = '') {
        console.log("In Fun sendEmailDisabled");
        console.log("Email:" + sEmail);
        console.log("********************");
        //Remove Email In Chrome
        chrome.storage.sync.get('config', function (result) {
            var initConfig = result.config;

            var aAccountNew = [];
            var aAccount = initConfig.account.split(/\r?\n/);
            $.each(aAccount, function (key, value) {
                var aAccountTemp = value.split('|');
                var sEmailRemove = $.trim(aAccountTemp[0]);
                if (sEmailRemove != sEmail) {
                    aAccountNew.push(value);
                }
            });

            initConfig.account = aAccountNew.join("\n");
            chrome.storage.sync.set({
                config: initConfig
            });
        });

        var date = new Date();
        var seconds = Math.round(date.getTime() / 1000);
        var sTime = seconds.toString();
        document.title = sTime;

        chrome.runtime.sendMessage({
            task: "setDisabledEmail",
            time: sTime,
            email: sEmail
        });

        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            if (message.task == "setDisabledEmailResult") {
                window.location.href = sLinkLogin;
            }
        });
    }

    //View videos
    function viewXem(nDuration = '') {
        console.log("In Fun viewXem");
        console.log("******************");
        if (readCookie('vtyoutubeaccounts') == null) {
            createCookie('vtyoutubeaccounts', 'yes', config.timechangeemail);
        } else {
            setTimeout(function () {
                chrome.storage.sync.get('config', function (result) {
                    var initConfig = result.config;

                    var nView = initConfig.views;

                    if (nView < 4) {
                        var flag = false;
                        var aDataVideo = '';
                        var sVideoID = youtube_parser(window.location.href);
                        var nTimeSub = 70;

                        //Xem Video Lan 2 trở đi
                        if (nDuration == '') {
                            console.log("Xem Video Lần 2 trở đi");
                            console.log("******************");
                            if (sVideoID != false && sVideoID != '') {
                                var date = new Date();
                                var seconds = Math.round(date.getTime() / 1000);
                                var sTimeData = seconds.toString();
                                document.title = sTimeData;

                                chrome.runtime.sendMessage({
                                    task: "getInfoVideoDetail",
                                    time: sTimeData,
                                    videoID: sVideoID
                                });

                                chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
                                    if (message.task == "getInfoVideoDetailResult") {
                                        if (message.status == 'success') {
                                            aDataVideo = message.data;
                                            flag = true;
                                        }

                                        if (message.status == 'error') {
                                            window.location.href = random_item(aDomain);
                                        }
                                    }
                                });
                            } else {
                                window.location.href = random_item(aDomain);
                            }
                        } else {
                            //Xem Video Lan 1
                            if (initConfig.account != '') {

                                console.log("Start: Xem Video Lần 1");
                                autoLike();
                                console.log("Run autoLike in Fun viewXem");
                                console.log('*************************');

                                if (sVideoID != false && sVideoID != '') {
                                    $.each(initConfig.data, function (key, val) {
                                        if (val.videoID == sVideoID) {
                                            nTimeSub = val.timeSub;
                                        }
                                    });
                                }

                                setTimeout(function () {
                                    console.log("Run autoSubscribe in Fun viewXem");
                                    console.log("timesub:" + nTimeSub);
                                    console.log("******************");
                                    autoSubscribe(nTimeSub);

                                }, 2500);

                                setTimeout(function () {
                                    console.log("Run getComment in Fun viewXem");
                                    console.log("******************");
                                    getComment();
                                }, randomIntFromRange(60000, 130000));

                                console.log("End: Xem Video Lần 1");
                                console.log("******************");
                            }
                        }

                        //Play Video
                        setTimeout(function () {
                            console.log("Play Video");
                            console.log("******************");
                            var aLabel = ['Phát (k)', 'Play (k)'];
                            var sLabel = $("button.ytp-play-button").attr("aria-label");

                            $(aLabel).each(function (key, value) {
                                if (value == sLabel) {
                                    $("button.ytp-play-button").click();
                                }
                            });
                        }, randomIntFromRange(6000, 10500));

                        setTimeout(function () {
                            if (flag == true) {
                                nDuration = 0;
                                if (typeof aDataVideo.time != 'undefined' || aDataVideo.time != undefined) {
                                    nDuration = aDataVideo.time;

                                    if (initConfig.account != '') {
                                        if (aDataVideo.time_sub > 0) {
                                            nTimeSub = aDataVideo.time_sub;
                                        }
                                        console.log("Run autoSubscribe in Fun viewXem");
                                        console.log("timesub:" + nTimeSub);
                                        console.log("******************");
                                        autoSubscribe(nTimeSub);


                                        console.log("Run autoLike in Fun viewXem");
                                        console.log("******************");
                                        autoLike();


                                        setTimeout(function () {
                                            if (initConfigDefine.auto_comment == "yes") {
                                                console.log("Run autoComment in Fun viewXem");
                                                console.log("comment:" + random_item(initConfigDefine.comments));
                                                console.log("*********************");
                                                autoComment(random_item(initConfigDefine.comments));
                                            }
                                        }, randomIntFromRange(60000, 130000));
                                    }
                                }
                            }

                            console.log("run autoScrollBrowser in viewXem");
                            console.log("******************");
                            autoScrollBrowser();

                            //run new page nếu hết thời gian xem
                            if (nDuration <= 0) {
                                console.log("Redirect trang khi hết thời gian xem => in Fun viewxem");
                                console.log("nDuration:" + nDuration);
                                console.log("******************");
                                window.location.href = random_item(aDomain);
                            }

                            $('p.extension-show-info').remove();
                            var sHtml = '<p class="extension-show-info viewvideo">Đang xem video lần thứ ' + nView + ': <span id="extension-clock">' + nDuration + '</span>s</p>';
                            $(sHtml).appendTo('body');

                            var sTime = setInterval(function () {
                                nDuration--;

                                if (nDuration >= 0) {
                                    $("#extension-clock").html(nDuration);
                                }

                                if (nDuration == 20) {
                                    nDuration = 0;
                                    clearInterval(sTime);

                                    var iView = nView + 1;
                                    if (iView >= 4) {
                                        initConfig.views = 1;
                                        chrome.storage.sync.set({
                                            config: initConfig
                                        });

                                        window.location.href = random_item(aDomain);
                                    } else {
                                        initConfig.views = iView;
                                        chrome.storage.sync.set({
                                            config: initConfig
                                        });

                                        $('p.extension-show-info').remove();
                                        var sHtml = '<p class="extension-show-info">Đang tìm video lần ' + iView + '</p>';
                                        $(sHtml).appendTo('body');

                                        var aVideoID = '';
                                        var date = new Date();
                                        var seconds = Math.round(date.getTime() / 1000);
                                        var sTimeData = seconds.toString();
                                        document.title = sTimeData;

                                        chrome.runtime.sendMessage({
                                            task: "getInfoVideo",
                                            time: sTimeData,
                                            videoID: sVideoID
                                        });

                                        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
                                            if (message.task == "getInfoVideoResult") {
                                                if (message.status == 'success') {
                                                    aVideoID = message.data;
                                                }
                                            }
                                        });

                                        setTimeout(function () {
                                            if (aVideoID == '') {
                                                initConfig.views = 1;
                                                chrome.storage.sync.set({
                                                    config: initConfig
                                                });
                                                window.location.href = random_item(aDomain);
                                            } else {
                                                var flagCheck = false;
                                                $("#related ytd-watch-next-secondary-results-renderer .ytd-watch-next-secondary-results-renderer #thumbnail").each(function () {
                                                    var idVideo = youtube_parser($(this).attr('href'));
                                                    if (idVideo != false && idVideo != sVideoID) {
                                                        if ($.inArray(idVideo, aVideoID) !== -1) {
                                                            flagCheck = true;

                                                            $(this)[0].click();

                                                            console.log("Run View lần tiếp theo");
                                                            console.log("******************");
                                                            viewXem();

                                                            return false;
                                                        }
                                                    }
                                                });

                                                setTimeout(function () {
                                                    if (flagCheck == false) {
                                                        initConfig.views = 1;
                                                        chrome.storage.sync.set({
                                                            config: initConfig
                                                        });

                                                        window.location.href = random_item(aDomain);
                                                    }
                                                }, 10000);
                                            }
                                        }, 3700);
                                    }
                                }
                            }, 1000);
                        }, 5000);
                    } else {
                        initConfig.views = 1;
                        chrome.storage.sync.set({
                            config: initConfig
                        });

                        window.location.href = random_item(aDomain);
                    }
                });
            }, 2500);
        }
    }

    //Auto Subscrible
    function autoSubscribe(timeSub = 70) {
        console.log("In fun autoSubscribe");
        console.log("timeSub:" + timeSub);
        console.log("******************");
        var timeSub = parseInt(timeSub) + randomIntFromRange(0, 60);
        var attr = $("#meta-contents #subscribe-button #notification-preference-button").attr('hidden');
        if (typeof attr !== typeof undefined && attr !== false) {
            //Chua dang ky
            setTimeout(function () {
                $("#meta-contents #subscribe-button tp-yt-paper-button.style-scope").click();
                setTimeout(function () {
                    $("#meta-contents #subscribe-button a.ytd-subscription-notification-toggle-button-renderer yt-icon-button#button").click();
                    setTimeout(function () {
                        $("#items .ytd-menu-popup-renderer:nth-child(1)").click();
                    }, randomIntFromRange(2000, 4000));
                }, randomIntFromRange(2000, 4000));
            }, timeSub);
        } else {
            //Da dang ky
        }
    }

    //Auto Redirect RandomLink
    function autoRedrectRandomLink(lbl = '', sClass = '') {
        console.log("In fun autoRedrectRandomLink");
        console.log(lbl);
        console.log(sClass);
        console.log("******************");
        var counter = randomIntFromRange(10, 40);

        if (counter > 10) {
            setTimeout(function () {
                var heightScroll = $(document).height() - randomIntFromRange(0, 600);
                $('html, body').animate({ scrollTop: heightScroll }, randomIntFromRange(3000, 10000));
            }, randomIntFromRange(4000, 10000));
        }

        if (lbl == '') {
            lbl = 'Đang chạy tạm thời sẽ chuyển hướng trang sau: ';
        }

        $('p.extension-show-info').remove();
        var sHtml = '<p class="extension-show-info ' + sClass + '">' +
            lbl + ' <span id="extension-clock">' + counter + '</span>s' +
            '</p>';
        $(sHtml).appendTo('body');

        setInterval(function () {
            counter--;
            if (counter >= 0) {
                $("#extension-clock").html(counter);
            }

            if (counter === 0) {
                window.location.href = random_item(aDomain);
                clearInterval(counter);
            }

        }, 1000);
    }

    //Get Comment
    function getComment() {
        console.log("In  fun getComment");
        console.log("**************");
        var sVideo = youtube_parser(window.location.href);
        if (sVideo != false) {
            if ($("#header #placeholder-area").length) {
                $("#header #placeholder-area").click();
                setTimeout(function () {
                    var date = new Date();
                    var seconds = Math.round(date.getTime() / 1000);
                    var sTime = seconds.toString();
                    document.title = sTime;

                    chrome.runtime.sendMessage({
                        task: "getDataCommentVideo",
                        time: sTime,
                        video: sVideo
                    });

                    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
                        if (message.task == "getDataVideoCommentResult") {
                            if (message.status == 'success') {
                                if (initConfigDefine.auto_comment == 'yes') {
                                    console.log("Run autoComment In getComment");
                                    console.log("comment:" + message.data);
                                    console.log("******************");
                                    autoComment(message.data);
                                }
                            }
                        }
                    });
                }, randomIntFromRange(1500, 2500));
            }
        }
    }

    //Auto Comment
    function autoComment(sComment) {
        console.log("In fun autoComment");
        console.log("comment:" + sComment);
        console.log("******************");
        if (sComment != '') {
            var sComment = sComment + random_item(['', '.', '..', '...', '!', '!!', '!!!']);

            $('p.extension-show-comment').remove();
            var sHtml = '<p class="extension-show-comment"><strong>Nội dung bình luận:</strong> ' + sComment + '</p>';
            $(sHtml).appendTo('body');

            document.querySelector('#simplebox-placeholder').click();
            $("#comment-dialog #commentbox #contenteditable-root").html(sComment);

            $("#comment-dialog #commentbox .ytd-commentbox.style-primary").removeAttr('disabled');
            $("#comment-dialog #commentbox .ytd-commentbox.style-primary #button").attr('tabindex', 0);
            $("#comment-dialog #commentbox .ytd-commentbox.style-primary #button").attr('aria-disabled', false);
            $("#comment-dialog #commentbox .ytd-commentbox.style-primary #button").removeAttr('style');

            setTimeout(function () {
                $("#comment-dialog #commentbox #submit-button").click();
                $('p.extension-show-comment').remove();
            }, randomIntFromRange(800, 2000));
        }
    }

    //Auto Like
    function autoLike() {
        console.log("In fun autoLike");
        console.log("*************");
        if ($("#menu-container #top-level-buttons-computed ytd-toggle-button-renderer").length) {
            setTimeout(function () {
                if ($("#menu-container #top-level-buttons-computed ytd-toggle-button-renderer.style-default-active").length) {
                    //Da like or Dislike
                } else {
                    var check = random_item([1, 2, 1, 1]);
                    if (check == 1) {
                        $("#menu-container #top-level-buttons-computed ytd-toggle-button-renderer:nth-child(1) a")[0].click();
                    } else {
                        $("#menu-container #top-level-buttons-computed ytd-toggle-button-renderer:nth-child(2) a")[0].click();
                    }
                }
            }, randomIntFromRange(18000, 55000));
        }
    }

    //Auto Scroll Brower
    function autoScrollBrowser() {
        console.log("In Fun autoScrollBrowser");
        console.log("*********************");
        var nTimeScrollBottom = randomIntFromRange(7500, 9000);
        var nTimeScrollTop = randomIntFromRange(7500, 9000);
        var nTimeTotal = nTimeScrollBottom + nTimeScrollTop + randomIntFromRange(2000, 6000);
        var iTemp = 0;
        var sTime = setInterval(function () {
            nTimeScrollBottom = randomIntFromRange(7500, 9000);
            nTimeScrollTop = randomIntFromRange(7500, 9000);
            nTimeTotal = nTimeScrollBottom + nTimeScrollTop + randomIntFromRange(2000, 6000);

            var heightScroll = $(document).height() - randomIntFromRange(0, 800);

            $('html, body').animate({ scrollTop: heightScroll }, nTimeScrollBottom);

            if (iTemp == 0) {
                $('html, body').animate({ scrollTop: 0 }, nTimeScrollTop);
            } else {
                setTimeout(function () {
                    $('html, body').animate({ scrollTop: 0 }, nTimeScrollTop);
                }, nTimeScrollBottom);
            }

            if (iTemp >= 1) {
                clearInterval(sTime)
            }

            iTemp++;

        }, nTimeTotal);
    }

    //Random Home YT
    function randomHomeYT() {
        console.log("In Fun randomHomeYT");
        if ($("ytd-rich-item-renderer.style-scope").length) {
            var nItem = randomIntFromRange(1, $("ytd-rich-item-renderer.style-scope").length);
            var flag = true;
            $("ytd-rich-item-renderer.style-scope").each(function (i, obj) {
                if ((i + 1) == nItem) {
                    if ($(this).find("#thumbnail").attr('href') != undefined) {
                        viewXem(randomIntFromRange(50, 150));

                        $(this).find("#thumbnail")[0].click();
                    } else {
                        flag = false;
                    }
                }
            });

            if (flag == false) {
                window.location.href = 'https://' + sYB;
            }
        } else {
            window.location.href = 'https://' + sYB;
        }
    }

    //Get Param url
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
    }

    //Get ID Video from url
    function youtube_parser(url) {
        if (url != '' && url != undefined) {
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            var match = url.match(regExp);
            if (match != undefined) {
                return (match && match[7].length == 11) ? match[7] : false;
            }
        }

        return false;
    }

    //Random Array
    function random_item(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    //Random range Minmax
    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //Create Cookie
    function createCookie(name, value, minute) {
        var expires;

        if (minute) {
            var date = new Date();

            date.setTime(date.getTime() + (minute * 60 * 1000));

            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";

        setTimeout(function () {
            window.location.href = sLinkLogin;
        }, 2500);
    }

    //Read cookie
    function readCookie(name) {
        var nameEQ = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    }

    //Delete cookie
    function eraseCookie(name) {
        createCookie(name, "", -1);
    }
});
