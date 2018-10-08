
var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);

var index = 0;
var songList;
function bindEvent() {
    $scope.on('click', '.prev-btn', function () {
        // console.log('fsdf');
        // if (index == 0) {
        //     index = songList.length - 1;
        // }else {
        //     index --;
        // }
        var index = control.prev();
        root.rander(songList[index]);
    });
    $scope.on('click', '.next-btn', function () {
        // if (index == songList.length - 1) {
        //     index = 0;
        // }else {
        //     index ++;
        // }
        var index = control.next();
        root.rander(songList[index]);
    });
}
bindEvent();

function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            // console.log(data);
            songList = data;
            control = new root.control(data.length);
            root.rander(data[0]);
        },
        error: function () {
            console.log('error');
        }
    })
}

getData("../mock/data.json");