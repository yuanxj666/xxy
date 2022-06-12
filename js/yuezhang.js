$(function () {


    // 歌曲播放功能
    function musicPlay() {
        // 获得到当前的audio标签，而不是一个jquery对象
        var audio = $("#audio")[0];
        // 如果在暂停状态就播放，如果在播放状态就暂停
        if (audio.paused) {
            audio.play();
            $("#playImg").attr("src", "./images/pause.png")
        } else {
            audio.pause();
            $("#playImg").attr("src", "./images/play-btn_03.png")
        }


        // 播放时间与总时间的显示
        // 定时器控制器
        var playTimer = null;
        playTimer = setInterval(function () {
            console.log(1111);
            if (audio.paused) {
                clearInterval(playTimer)
            }
            // 获得当前正在播放的时间
            var playTime_s = audio.currentTime;
            // 获取播放时间的分
            var mTime = parseInt(playTime_s / 60);
            // 获取播放时间的秒
            var sTime = parseInt(playTime_s % 60);

            // 获取音乐总时长
            var totalTime_s = audio.duration;
            // 获取总时长的分
            var mTime_total = parseInt(totalTime_s / 60);
            // 获取总时长的秒
            var sTime_total = parseInt(totalTime_s % 60);

            function checkTime(m, s) {
                if (m < 10) {
                    m = "0" + m;
                } else {
                    m += ""
                }

                if (s < 10) {
                    s = "0" + s
                } else {
                    s += ""
                }

                return m + ":" + s
            }

            var pagePassTime = checkTime(mTime, sTime);
            var pageTotalTime = checkTime(mTime_total, sTime_total);

            $("#passTime").html(pagePassTime);
            $("#totalTime").html(pageTotalTime);

            // 播放音乐的进度条
            // 播放进度的百分比
            var playedTimePercent = playTime_s / totalTime_s;
            if (totalTime_s - playTime_s > 0) {
                // 还有时间播放
                $(".progress-bar-passed").width(playedTimePercent * 100 + "%");
            } else {
                // 已经播放完了
                $(".progress-bar-passed").width(0 + "%");
            }

        }, 1000)
    }

    $("#playBtn").on("click", function () {
        musicPlay()
    })


    // 获取文章内容
    $.ajax({
        type: "get",
        url: "http://localhost/blueberrypai_serve/page_yuezhang.php",
        success: function (data) {
            data = JSON.parse(data)
            $(".artical-title-h3").html(data.artical.artical_title)
            $(".blog-details-content").html(decodeURI(data.artical.artical_cont))
        }
    })


    // 获取乐章页面的相关阅读数据
    $.ajax({
        type: "get",
        url: "http://localhost/blueberrypai_serve/page_yuezhang_read.php",
        success: function (data) {
            data = JSON.parse(data);
            $(data.readList).map(function(index,item){
                $(".related-read-content").append(" \
                    <div class='related-read-content-show'> \
                        <a href='#'> \
                            <img class='related-read-pic' src='"+ item.img +"' alt=''> \
                            <p class='relate-read-summary'>"+item.title+"</p> \
                        </a> \
                    </div> \
                ")
            })
        }
    })

})