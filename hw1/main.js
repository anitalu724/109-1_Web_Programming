let album = ['https://i.epochtimes.com/assets/uploads/2018/12/357248-600x400.jpg',
    'https://img.epochtimes.com.tw/upload/images/2018/12/05/357251_medium.jpg',
    'https://img.epochtimes.com.tw/upload/images/2018/12/06/357376_medium.jpg',
    'https://img.epochtimes.com.tw/upload/images/2018/12/06/357377_medium.jpg',
    'https://img.epochtimes.com.tw/upload/images/2018/12/06/357378_medium.jpg',
    'https://www.tom-archer.com/wp-content/uploads/2018/06/most-photographic-spots-in-new-zealand-4.jpg',
    'https://www.tom-archer.com/wp-content/uploads/2018/06/lake-pukaki-most-photographic-spots-in-new-zealand-.jpg',
    'https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg',
    'https://photographycourse.net/wp-content/uploads/2014/11/landscape-1-teryani-riggs-1.jpg',
    'https://www.tom-archer.com/wp-content/uploads/2018/06/most-photographic-spots-in-new-zealand-8.jpg',
    'https://www.tom-archer.com/wp-content/uploads/2018/06/milford-sound-night-fine-art-photography-new-zealand.jpg',
    'https://www.tom-archer.com/wp-content/uploads/2018/06/milford-sound-new-zealand-most-photographic-spot.jpg',
    'https://image.cache.storm.mg/styles/smg-800x533-fp/s3/media/image/2018/01/26/20180126-053849_U7418_M374298_e2a0.GIF?itok=Qyx2BMZ0'
]
let back = function() {
    if (pic_id === 0) {
        var back_btn = document.getElementById("BACK");
        back_btn.disabled = true;
    } else {
        pic_id -= 1;
        document.getElementById("display").src = album[pic_id];
        document.getElementById("source").href = album[pic_id];
        document.getElementById("source").innerHTML = album[pic_id];
        var next_btn = document.getElementById("NEXT");
        if (next_btn.disabled) {
            next_btn.disabled = false;
        }
        if (pic_id === 0) {
            var back_btn = document.getElementById("BACK");
            back_btn.disabled = true;
        }
    }
}

let next = function() {

    if (pic_id === album.length - 1) {
        var next_btn = document.getElementById("NEXT");
        next_btn.disabled = true;
    } else {
        pic_id += 1;
        document.getElementById("display").src = album[pic_id];
        loaded = (document.getElementById("display")).complete
        console.log(loaded)
        if (!loaded) {
            document.getElementById("display").src = "images/loading.gif"
        }
        document.getElementById("display").src = album[pic_id];
        document.getElementById("source").href = album[pic_id];
        document.getElementById("source").innerHTML = album[pic_id];
        var back_btn = document.getElementById("BACK");
        if (back_btn.disabled) {
            back_btn.disabled = false;
        }
        if (pic_id === album.length - 1) {
            var next_btn = document.getElementById("NEXT");
            next_btn.disabled = true;
        }
    }
}

let pic_id = 0;
let loaded = (document.getElementById("display")).complete
console.log(loaded)
if (!loaded) {
    document.getElementById("display").src = "images/loading.gif"
}
document.getElementById("display").src = album[pic_id];
document.getElementById("source").href = album[pic_id];
document.getElementById("source").innerHTML = album[pic_id];