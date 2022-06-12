function waterFlowComponent(url,tag) {

    waterFlow()
    // 瀑布流
    function waterFlow() {
        // 获取页面所有的子元素
        var allChild = $(".ts-card");
        // 知道一行可以摆放几个元素
        var rowsNum = 4;
        // 存储每一列的高度
        var colsHeightArr = [];
        allChild.map(function (index, element) {
            // 遍历前四个元素的时候，是符合判断条件的:前四个正好是第一行的元素
            if (index < rowsNum) { // 4 < 0 1 2 3 
                // 获取当前四个元素的高度，并放入到数组中
                colsHeightArr.push($(element).height());
            } else {
                // 第二行的第一个元素应该放在那个位置
                // 获取数组中最小的值，也就是第一行高度最小的那个元素
                var minHeightOfCols = Math.min.apply(null, colsHeightArr);
                // 获取最小值的下标
                var minHeightOfIndex = colsHeightArr.indexOf(minHeightOfCols);
                // 第二行第一个如何摆放
                allChild[index].style.position = "absolute";
                allChild[index].style.top = minHeightOfCols + 10 + "px";
                allChild[index].style.left = allChild.eq(minHeightOfIndex).position().left + "px";
                // 合并高度
                colsHeightArr[minHeightOfIndex] = colsHeightArr[minHeightOfIndex] + allChild[index].offsetHeight + 10;
                $(".ts-container").height(Math.max.apply(null, colsHeightArr));
            }
        })

    }

    // 我们服务器在本地，速度块，所有延时时间比较短
    window.onscroll = debounce(checkReachBottom, 300);

    // 防抖:定时器
    // 在一定的延时时间内，如果多次触发，就清除掉前面的触发，只触发最后一次
    function debounce(fn, delay) {
        var timer = null;
        return function () {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(fn, delay)
        }
    }

    // 触底判断
    function checkReachBottom() {
        // 获取页面滚动高度和视口高度
        var scrollTop = $(window).scrollTop();
        var winHeight = $(window).height();
        // 获取最后一个元素距离顶部的高度
        var allChild = $(".ts-card");
        var lastBoxTop = allChild.eq(allChild.length - 1).offset().top + 240;
        if (lastBoxTop < scrollTop + winHeight) {

            // 加载网络数据
            $.ajax({
                type: "get",
                url: url,
                success: function (data) {
                    data = JSON.parse(data)
                    // 加载数据
                    adapter(data)
                    // 循环加载完数据之后，再次调用瀑布流的布局方案
                    waterFlow();
                }
            })
        }
    }

    function adapter(data){
        if(tag === 'ts'){
            for (var i = 0; i < data.data.length; i++) {
                $(".ts-container").append(
                    "<div class='ts-card'> \
                <div class='ts-card-head'> \
                    <img class='ts-card-icon' src='"+ data.data[i].icon + "' alt=''> \
                    <span class='ts-card-name'> \
                        <p>"+ data.data[i].title + "</p> \
                        <em>"+ data.data[i].name + "</em> \
                    </span> \
                    <i class='tag-ts'>"+ data.data[i].tag + "</i> \
                </div> \
                <img src='"+ data.data[i].img + "' alt=''> \
                <div class='ts-card-foot'> \
                    <p>"+ data.data[i].desc + "</p> \
                    <span class='ts-cardfoot-icon'> \
                        <b class='ts-card-icon-1'></b><i>"+ data.data[i].zan + "</i> \
                        <b class='ts-card-icon-2'></b><i>"+ data.data[i].wechat + "</i> \
                    </span> \
                </div> \
            </div>"
                )
            }
        }
        if(tag === "chat"){
            for (var i = 0; i < data.data.length; i++) {
                $(".ts-container").append(
                    "<div class='ts-card'> \
                <div class='ts-card-head'> \
                    <img class='ts-card-icon' src='"+ data.data[i].icon + "' alt=''> \
                    <span class='ts-card-name'> \
                        <p>"+ data.data[i].title + "</p> \
                        <em>"+ data.data[i].name + "</em> \
                    </span> \
                    <i class='tag-ts'>"+ data.data[i].tag + "</i> \
                </div> \
                <p class='ts-content'>"+ data.data[i].content +"</p> \
                <div class='ts-card-foot'> \
                    <p>"+ data.data[i].desc + "</p> \
                    <span class='ts-cardfoot-icon'> \
                        <b class='ts-card-icon-1'></b><i>"+ data.data[i].zan + "</i> \
                        <b class='ts-card-icon-2'></b><i>"+ data.data[i].wechat + "</i> \
                    </span> \
                </div> \
            </div>"
                )
            }
        }
    }
}