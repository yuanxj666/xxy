$("#pager").zPager({
    totalData: 55
});

function currentPage(currentPage){
    /*
        触发页码数位置： Page/js/jquery.z-pager.js 64行
    */
   $(".bj-cards").html("");
    $.ajax({
        type:"get",
        url:"http://localhost/blueberrypai_serve/page_blueberryjam.php",
        data:{
            page:currentPage
        },
        success:function(data){
            data = JSON.parse(data)
            for(var i = 0;i<data.jam.length;i++){
                $(".bj-cards").append(
                    "<a href='#' class='bj-card'> \
                        <img src='"+ data.jam[i].img +"' alt=''> \
                        <i>"+ data.jam[i].tag +"</i> \
                    </a>"
                )
            }
        }
    })
}