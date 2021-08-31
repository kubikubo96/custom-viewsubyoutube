const accounts = getRandom(window.YTaccounts, 5);
const websites = getRandom(window.YTwebsites, 5);
const videos = getRandom(window.YTvideos, 5);
const comments = getRandom(window.YTwebsites, 5);

var initConfigDefine = {
    'start': 'yes',
    'auto_like': 'yes',
    'auto_subscribe': 'yes',
    'account': accounts,
    'data': [],
    'keyapi': 'youtube_b17ed4461a38b6ddf4d5d4c2878e24df',
    'ipserver': '',
    'user_pro': true,
    'views': 1,
    'pause': 'yes',
    'autoremovecache': 'yes',
    'timechangeemail': 120,
    'search_bing': 'no',
    'search_google': 'yes',
    'website': websites,
    'videos': videos,
    'comments': comments
};

//lấy 1 mảng con random từ 1 mảng lớn
function getRandom(arr = [], n = 0) {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if(n == 0 && len == 0) {
        return [];
    }
    if (n > len) {
        n = len;
    }
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}