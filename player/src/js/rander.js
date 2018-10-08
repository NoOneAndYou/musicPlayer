
// 渲染歌曲及信息
// 通过window.player暴露函数

(function ($, root) {
    var $scope = $(document.body);
    // 歌曲信息
    function randerInfo(info) {
        var str = '';
        str = '<div class="song-name">'+ info.song +'</div>' +
'            <div class="singer-name">'+ info.singer +'</div>' +
'            <div class="album-name">'+ info.album +'</div>'
        $scope.find('.song-info').html(str);
    }

    // 歌曲图片
    function randerImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            root.blurImg(img, $scope);
            $scope.find('.song-img img').attr('src', src);
        }
    }

    // 喜欢按钮
    function randerIslike(isLike) {

        if (isLike) {
            $scope.find('.btn-wrapper').addClass('liking');
        }else {
            $scope.find('.btn-wrapper').removeClass('liking');
        }

    }

    root.rander = function (data) {
        randerInfo(data);
        randerImg(data.image);
        randerIslike(data.isLike);
    }
}(window.Zepto, window.player || (window.player = {})))
