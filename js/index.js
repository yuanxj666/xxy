$(function () {
    var mySwiper = new Swiper('.swiper', {
        loop: true, // 循环模式选项
        pagination: {
            el: '.swiper-pagination',
        },
    })

    // 网络请求
    // 轮播图数据接口地址：http://localhost/blueberrypai_serve/

    $.ajax({
        type:"get",
        url:"http://localhost/blueberrypai_serve/",
        success:function(data){
            data = JSON.parse(data)
            $(".s1 h3").html(data.banner[0].title)
            $(".s2 h3").html(data.banner[1].title)
            $(".s3 h3").html(data.banner[2].title)
            $(".s1 p").html(data.banner[0].content)
            $(".s2 p").html(data.banner[1].content)
            $(".s3 p").html(data.banner[2].content)
        },
        error:function(error){
            console.log(error);
        }
    })

    // 获取首页乐章内容
    $.ajax({
        type:"get",
        url:"http://localhost/blueberrypai_serve/index_yuezhang.php",
        success:function(data){
            data = JSON.parse(data)
            for(var i = 0;i<data.yuezhang.length;i++){
                $(".d-list").append(" \
                    <li class='d-item'> \
                        <div class='item-img'> \
                            <a href='#'> \
                                <img src='"+ data.yuezhang[i].user_img +"' alt=''> \
                            </a> \
                        </div> \
                        <div class='item-text'> \
                            <a href='#' class='text-title'>"+ data.yuezhang[i].title +"</a> \
                            <a href='#' class='text-author'>"+ data.yuezhang[i].username +"</a> \
                            <p class='text-content'>"+ data.yuezhang[i].desc +"</p>\
                            <div class='comment'> \
                                <i class='zan-num'>"+ data.yuezhang[i].zan +"</i> \
                                <i class='zan-icon'></i> \
                                <i class='comment-num'>"+ data.yuezhang[i].comment +"</i> \
                                <i class='comment-icon'></i> \
                            </div> \
                        </div> \
                    </li> \
                ")
            }
        }
    })

    // 游记
    $.ajax({
        type:"get",
        url:"http://localhost/blueberrypai_serve/index_youji.php",
        success:function(data){
            data = JSON.parse(data)
            for(var i = 0;i<data.youji.length;i++){
                $(".note-list").append(" \
                    <li class='note'> \
                        <a href='#'> \
                            <img src='"+ data.youji[i].img +"' alt=''> \
                            <p class='note-title'>"+ data.youji[i].title +"</p> \
                            <p class='note-author'>"+ data.youji[i].author +"</p> \
                            <div class='note-desc'> \
                                <p class='note-desc-content'>"+ data.youji[i].desc +"</p> \
                            </div> \
                        </a> \
                    </li> \
                ")
            }
        }
    })

    // 判断用户是否登录
    var username = localStorage.getItem("username");
    if(username){
        $(".login-register").html("<a href='#' class='login'>"+ username +"</a><a href='#' id='logout' class='login'>退出</a>");
    }

    $("#logout").click(function(){
        localStorage.removeItem("username");
        window.location.href = "index.html"
    })
})