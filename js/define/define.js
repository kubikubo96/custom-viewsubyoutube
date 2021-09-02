let dnt = '1800'; //Thời gian xem videos
let dnts = '500'; //Thời gian sub videos
let videos = [
    { id: 'bryYEtMWCA8', title: 'Chàng Rể Vô Song - Tập 1 - (Chương 1 - 20) | Truyện Ngôn Tình Hay Nhất của Akuradio', time: dnt, time_sub: dnts },
    { id: 'nVAAzuJsGrA', title: 'Chàng Rể Vô Song - Tập 2 - (Chương 21 - 40) | Truyện Ngôn Tình Hay Nhất của Akuradio', time: dnt, time_sub: dnts },
    { id: 'FIyS5QZb0iI', title: 'Chàng Rể Vô Song - Tập 3 - (Chương 41 - 60) | Truyện Ngôn Tình Hay Nhất của Akuradio', time: dnt, time_sub: dnts },
    { id: 'LzwXqwjo0_M', title: 'Chàng Rể Vô Song - Tập 4 - (Chương 61 - 80) | Truyện Ngôn Tình Hay Nhất của Akuradio', time: dnt, time_sub: dnts },
    { id: 'J_cZIg665G4', title: 'Chàng Rể Vô Song - Tập 5 - (Chương 81 - 100) | Truyện Ngôn Tình Hay Nhất của Akuradio', time: dnt, time_sub: dnts },
    { id: 'fb_imS5U4wE', title: 'Chàng Rể Vô Song - Tập 6 - (Chương 101 - 120) | Truyện Ngôn Tình Hay Nhất của Akuradio', time: dnt, time_sub: dnts },
    { id: 'M-sjiJiq364', title: 'Chàng Rể Vô Song - Tập 7 - (Chương 121 - 140) | Truyện Ngôn Tình Hay Nhất của Akuradio', time: dnt, time_sub: dnts },
    { id: 'wF9Q1h-I2NA', title: 'Chàng Rể Vô Song - Tập 8 - (Chương 141 - 160) | Truyện Ngôn Tình Hay Nhất của Akuradio', time: dnt, time_sub: dnts },
    { id: 'nVAAzuJsGrA', title: 'Chàng Rể Vô Song - Tập 9 - (Chương 161 - 180) | Truyện Ngôn Tình Hay Nhất của Akuradio', time: dnt, time_sub: dnts },
    { id: 'bzvw5yboGZE', title: 'Chàng Rể Vô Song - Tập 10 - (Chương 181 - 200) | Truyện Ngôn Tình Hay Nhất của Akuradio', time: dnt, time_sub: dnts },
    { id: 'IMKx_heOQfA', title: 'Chàng Rể Vô Song - Tập 11 - (Chương 201 - 220) | Truyện Ngôn Tình Hay Nhất của Akuradio', time: dnt, time_sub: dnts },
    { id: 'Zeot9-uUucs', title: 'Chàng Rể Vô Song - Tập 12 - (Chương 221 - 240) | Truyện Ngôn Tình Hay Nhất của Akuradio', time: dnt, time_sub: dnts },
    { id: 'KC8nkk5FPGQ', title: '[FULL] Anh Là Của Nợ Của Em |  Truyện ngôn tình ngược - (Siêu Phẩm) của Akuradio', time: dnt, time_sub: dnts },
    { id: 'z32CQdQvVdg', title: 'Chồng Phản Bội | tâm sự đau đớn của người vợ khi chồng phản bội + Akuradio', time: dnt, time_sub: dnts },
    { id: 'wLdibDT2tTc', title: 'Truyện Mất Rồi Xin Đừng Tìm - Tập 1 | Truyện Ngôn Tình Hay Nhất Năm 2021 của Akuradio', time: dnt, time_sub: dnts },
    { id: 'XzOIx-L7Jm4', title: 'Truyện Mất Rồi Xin Đừng Tìm - Tập 2 | Truyện Ngôn Tình Hay Nhất Năm 2021 của Akuradio', time: dnt, time_sub: dnts },
    { id: 'u4uSILq26TI', title: 'Truyện Mất Rồi Xin Đừng Tìm - Tập 3 | Truyện Ngôn Tình Hay Nhất Năm 2021 của Akuradio', time: dnt, time_sub: dnts },
    { id: 'mIP8kXcMudk', title: 'Truyện Mất Rồi Xin Đừng Tìm - Tập 4 | Truyện Ngôn Tình Hay Nhất Năm 2021 của Akuradio', time: dnt, time_sub: dnts },
    { id: 'k2t3z6GQO9w', title: 'Truyện Vợ Anh Là Mẹ Đơn Thân - Tập 1 | Truyện Ngôn Tình của Akuradio', time: dnt, time_sub: dnts },
    { id: 'm30REL-B8ds', title: 'Truyện Vợ Anh Là Mẹ Đơn Thân - Tập 2 | Truyện Ngôn Tình của Akuradio', time: dnt, time_sub: dnts },
    { id: 'mFy4S6WAtqk', title: 'Truyện Vợ Anh Là Mẹ Đơn Thân - Tập 3 | Truyện Ngôn Tình của Akuradio', time: dnt, time_sub: dnts },
    { id: 'zikqVk4XiU8', title: 'Truyện Vợ Anh Là Mẹ Đơn Thân - Tập 4 | Truyện Ngôn Tình của Akuradio', time: dnt, time_sub: dnts },
    { id: 'UdEAv9wD3lQ', title: 'Truyện Vợ Anh Là Mẹ Đơn Thân - Tập 5 | Truyện Ngôn Tình của Akuradio', time: dnt, time_sub: dnts },
    { id: '-zMZLJqckTY', title: 'Truyện Vợ Anh Là Mẹ Đơn Thân - Tập 6 | Truyện Ngôn Tình của Akuradio', time: dnt, time_sub: dnts },
    { id: 'm3kvdrR-3dU', title: 'Mua Mạng Vợ Nhỏ - Tập 1 | Truyện Ngôn Tình của Akuradio', time: dnt, time_sub: dnts },
    { id: 'sIZNvq2QdW8', title: 'Mua Mạng Vợ Nhỏ - Tập 2 | Truyện Ngôn Tình của Akuradio', time: dnt, time_sub: dnts },
    { id: 'yPstrxy7FLA', title: 'Mua Mạng Vợ Nhỏ - Tập 3 | Truyện Ngôn Tình của Akuradio', time: dnt, time_sub: dnts },
    { id: '6AzlINPJlzE', title: 'Mua Mạng Vợ Nhỏ - Tập 4 | Truyện Ngôn Tình của Akuradio', time: dnt, time_sub: dnts },
    { id: 'DM0FyhsQOxg', title: 'Mua Mạng Vợ Nhỏ - Tập 5 | Truyện Ngôn Tình của Akuradio', time: dnt, time_sub: dnts },
    { id: 'oFSont4gEzI', title: 'Mua Mạng Vợ Nhỏ - Tập 6 | Truyện Ngôn Tình của Akuradio', time: dnt, time_sub: dnts },
    { id: 'YMkP_Bzdyqg', title: 'Mua Mạng Vợ Nhỏ - Tập 7 | Truyện Ngôn Tình của Akuradio', time: dnt, time_sub: dnts },
    { id: 'Mf4bvqzcHpY', title: 'Mua Mạng Vợ Nhỏ - Tập 8 | Truyện Ngôn Tình của Akuradio', time: dnt, time_sub: dnts },
    { id: 'NZLXMzVF2go', title: 'Thần Cấp Ở Rể - Tập 1 - (Chương 1 - 20) | Siêu Phẩm Truyện Ngôn Tình Huyền Huyễn Hay Nhất của Akuradio', time: dnt, time_sub: dnts },
    { id: 'HAEHlr_bP1Y', title: 'Thần Cấp Ở Rể - Tập 2 - (Chương 21 - 40) | Siêu Phẩm Truyện Ngôn Tình Huyền Huyễn Hay Nhất của Akuradio', time: dnt, time_sub: dnts },
];

let videosTest = [
    { id: 'OzkPzOhjP_8', title: 'Chống dịch - chung mục tiêu, riêng giải pháp | VTV24', time: dnt, time_sub: dnts },
    { id: '58-OTKS7ouc', title: 'Tiêu Điểm: Những hiểu lầm về tiêm vắc xin COVID-19 | VTV24', time: dnt, time_sub: dnts },
    { id: '1MQAXg5FFYc', title: 'Tiêu Điểm Quốc khánh 2/9: Việt Nam - Đoàn kết là sức mạnh | VTV24', time: dnt, time_sub: dnts },
]

let comments = [
    "Cảm ơn b", "Hay lắm", "truyện hay", "thanks ad", "nghe ok", "Cảm ơn b nhé", "Giọng hay lắm ad", "đã xem", "like", "yêu rồi nha", "tạm dc",
    "đã thích", "thích phết", "like", "cảm ơ nhé", "thích phết", "THANKS A! A ĐỌC HAY LÉM", "Tập mới đâu rồi bạn", "Hay", "Ra tiếp anh ơi", "Ủng hộ Tùng",
    "xíu em đi like máy tập củ cho ah", "Nghe rồi giờ nghe lại vẫn hay", "Ủng hộ anh", "Giọng nhanh , rõ ràng, cảm xúc ", "Thaks nhìu",
    "Mình nghe nhiều người đọc chuyện rồi mà nghe anh này đọc cảm thấy tiết tấu quá tuyệt vời.", "Giọng khá hay, đọc rõ",
    "Nghe lại thấy dọng a vẫn hay phết..a mà kể thêm truyện ma thì hay biết mấy", "A đọc truyện kiểu giống nhất niệm vĩnh hằng đi a..vừa vui vữa đã",
    "Nghe rồi giờ nghe lại...vẫn hay", "Giờ nghe lại ủng hộ bác ha", "Nếu ko chắc nửa tháng mới được nghe 1 tập của bác mất",
    "Nghe lại vẫn hay", "Bây h nghe lại thì ký ức những ngày vui vẻ của thất công tử", "Giọng MC hay", "Hay quá bạn ơi", "mong bạn ra nhiều truyện",
    "Thật sự cảm động vì tình cảm của từng nhân vật", "Truyện hay thật", "truyện rất hay. cảm ơn MC. rất mong MC đọc", "a đọc vẫn hay nhất",
    "Giọng đọc to,rõ và truyền cảm.", "Bạn đọc hay lắm nhưng chèn nhạc nhỏ thôi nhé. Thanks", "Bộ này mà đc chuyển thể lên phim thì tuyệt vời",
    "nghe đi nghe lại vẫn thấy hay", "Ta lại ngược dòng hỗn độn trường hà quay lại sang sinh kiếp kỷ thứ nhất đây", "Nghe lại cho máu", "truyện hay lắm AD ơi",
    "Nghe tới đoạn này là ưng truyện luôn rồi", "Cậu đọc rất tuyệt", "Giọng hay lắm a", "nghe lại thấy thật hoài niệm", "Nghe lại vẫn hay bác",
    "Nữa đi snh đợi lâu quá rồi", "Nghe mỗn mục thần là hay nhất", "Giọng đọc hay quá", "hay wa a oi", "Giọng đọc kia hay hơn a ơi", "giọng nghe chất quá anh à :D",
    "Hình như Ad thu lại đúng ko ạ! Nghe hơi # ngày xưa!", "Nghiện truyện nghiện luôn nhạc rồi anh ơi", "Bạn nên chia clip ra thành những phần ngắn hơn, ",
    "khoàng trên dưới 60 phút một thì tiện hơn cho người nghe. Cin cảm ơn bân", "Anh đọc truyện solo leveling đi anh", "Nghe truyen co nhac rat nhuc dau",
    "Hay", "Truyền hay", "Hay lm ạ", "Nghe lại hơn chục lần rồi mà quên like xin lỗi anh", "6:00:00", "GIỌNG ANH HAY QUÁ", "đọc tiên hiệp ik b", "tình cảm đúng",
    "vẩn mệt tình cảm", "Giọng dễ nge quá anh ơi ...idol mới của em ..", "Giật quá a ạ", "Bộ này full chưa nhỉ anh ơi", "Giọng truyền cảm lắm ad ơi..",
    "Truyện mới đầu đã thấy lộn xộn phết", "Đoc rât la hay   câu truyên cung hay"
];

let websNews = [
    'https://dantri.com.vn/',
    'https://vnexpress.net/',
    'https://vietnamnet.vn/',
    'https://laodong.vn/',
    'https://baomoi.com/',
    'https://vtvgo.vn/',
    'https://vtvgo.vn/xem-truc-tuyen-kenh-vtv1-1.html',
    'https://vtvgo.vn/xem-truc-tuyen-kenh-vtv2-2.html',
    'https://vtvgo.vn/xem-truc-tuyen-kenh-vtv5-5.html',
    'https://vtvgo.vn/xem-truc-tuyen-kenh-vtv7-27.html',
    'https://cafebiz.vn/',
    'https://cafebiz.vn/vi-mo.chn',
    'https://cafebiz.vn/cau-chuyen-kinh-doanh.chn',
    'https://cafebiz.vn/cong-nghe.chn',
    'https://cafebiz.vn/song.chn',
    'https://ncov.moh.gov.vn/',
    'https://ncov.moh.gov.vn/vi/web/guest/dong-thoi-gian',
    'https://ncov.moh.gov.vn/vi/web/guest/tin-tuc',
    'https://ncov.moh.gov.vn/vi/web/guest/video',
    'https://ncov.moh.gov.vn/vi/web/guest/-ieu-can-biet',
    'https://ncov.moh.gov.vn/vi/web/guest/khuyen-cao',
    'https://www.24h.com.vn/',
    'https://www.24h.com.vn/bong-da-c48.html',
    'https://www.24h.com.vn/lich-thi-dau-bong-da-c287.html',
    'https://www.24h.com.vn/video-ban-thang-c297.html',
    'https://www.24h.com.vn/bong-da/lich-thi-dau-bong-da-hom-nay-moi-nhat-c48a364371.html',
    'https://www.24h.com.vn/bang-xep-hang-bong-da-c295.html',
    'https://www.24h.com.vn/video-highlight-c953.html',
    'https://www.24h.com.vn/bong-da-ngoai-hang-anh-c149.html',
    'https://www.24h.com.vn/tin-tuc-o-to-c332.html',
    'https://laodong.vn/thoi-su/',
    'https://laodong.vn/cong-doan/',
    'https://laodong.vn/the-gioi/',
    'https://laodong.vn/phap-luat/',
    'https://laodong.vn/kinh-te/',
    'https://laodong.vn/tien-te-dau-tu/',
    'https://laodong.vn/van-hoa-giai-tri/',
    'https://laodong.vn/bat-dong-san/',
    'https://laodong.vn/xe/',
    'https://laodong.vn/tam-long-vang/',
    'https://thanhnien.vn/thoi-su/',
    'https://thanhnien.vn/thoi-su/chinh-tri/',
    'https://thanhnien.vn/thoi-su/phap-luat/',
    'https://thanhnien.vn/thoi-su/dan-sinh/',
    'https://thanhnien.vn/thoi-su/lao-dong-viec-lam/',
    'https://thanhnien.vn/thoi-su/quyen-duoc-biet/',
    'https://thanhnien.vn/thoi-su/phong-su-dieu-tra/',
    'https://thanhnien.vn/thoi-su/quoc-phong/',
    'https://thanhnien.vn/thoi-su/vuot-qua-covid-19/',
    'https://baoquocte.vn/',
    'https://baoquocte.vn/bien-dong-247',
    'https://baoquocte.vn/kinh-te',
    'https://baoquocte.vn/nguoi-viet',
    'https://baoquocte.vn/van-hoa',
    'https://baoquocte.vn/xa-hoi',
    'https://baoquocte.vn/giai-tri'
];

let websites = [
    'https://www.youtube.com/',
    'https://www.youtube.com/',
    'https://www.youtube.com/',
    'https://www.google.com/',
    'https://www.google.com/',
    'https://www.bing.com/',
    'https://www.bing.com/',
]

websNews = random_arr(websNews, 20);
websites = websites.concat(websNews);
comments = random_arr(comments, 20);

var initConfigDefine = {
    'start': 'yes',
    'auto_like': 'yes',
    'auto_subscribe': 'yes',
    'data': [],
    'keyapi': 'youtube_b17ed4461a38b6ddf4d5d4c2878e24df',
    'ipserver': '',
    'views': 1,
    'pause': 'yes',
    'autoremovecache': 'yes',
    'timechangeemail': 120,
    'search_bing': 'yes',
    'search_google': 'yes',
    'account': window.dfAccounts,
    'time_view': dnt,
    'time_sub': dnts,
    'websites': websites,
    'videos': videosTest,
    'comments': comments
};

//lấy random 1 phần tử từ mảng
function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}

//lấy 1 mảng con n phần tử random từ mảng lớn
function random_arr(arr, n) {
    var newArr = [];
    if (n > arr.length)
        n = arr.length
    for (let i = 0; i < arr.length; i++) {
        let item = arr[Math.floor(Math.random() * arr.length)];
        if (!newArr.includes(item))
            newArr.push(item);
        if (newArr.length == n)
            return newArr;
    }
    return newArr;
}