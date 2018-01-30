(function() {
    /* 支持：
        1. 元素拖动
        2. 磁贴功能
        3. 不可超越边界
        4. 单击(1500ms)锁定
     * 
     */
    //这个代码有两个问题
    //1. 即使鼠标没有点击div, 只要鼠标经过div，回调函数始终会运行。
    //2. 鼠标拖动速度太快的话，元素就跟不上鼠标移动的速度了。因为浏览器的刷新频率太低
    var log = console.log
    var movingEL
    //鼠标的点击位置
    var mouseStartX
    var mouseStartY
    //原始的起始位置
    var elStartX
    var elStartY
    var maxZ = 101
    var startTime
    var last
    var div = document.querySelector(".move")
    function start() {
        startTime = new Date()
    }

    function end() {
        var now = new Date()
        last = now - startTime
    }

    addEventListener("contextmenu", function(event) {
        log("right click")
        event.preventDefault()
    })

    document.addEventListener("mousedown", function(event) {
        if(!event.target.matches('[data-movable="true"]')) {
            return
        }
        movingEL = event.target
        movingEL.style.zIndex = maxZ++
        mouseStartX = event.clientX
        mouseStartY = event.clientY
        //从内联属性上读出
        //读出来是字符串，无法参与运算
        elStartX = parseInt(movingEL.style.left)
        elStartY = parseInt(movingEL.style.top)
        start()
        log("start:", startTime)

        function move(event) {
            if (movingEL) {
                var diffX = event.clientX - mouseStartX
                var diffY = event.clientY - mouseStartY
                var targetX = elStartX + diffX
                var targetY = elStartY + diffY
                if(targetX < 50) {
                    targetX = 0
                }
                if(targetX > innerWidth - movingEL.offsetWidth - 50) {
                    targetX = innerWidth - movingEL.offsetWidth
                }
                if(targetY < 50) {
                    targetY = 0
                }
                if(targetY > innerHeight - movingEL.offsetHeight - 50) {
                    targetY = innerHeight - movingEL.offsetHeight
                }

                //注意不要忘记加px
                movingEL.style.left = targetX + 'px'
                movingEL.style.top = targetY + 'px'
                // event.target.style.left = elStartX + diffX + 'px'
                // event.target.style.top = elStartY + diffY + 'px'
                //原来的写法是
                //event.target.style.left
                // 一旦鼠标移出div范围，那么target就
                //不再是div了(冒泡到window上)，因此div的位置就不再变化了
                //应该在鼠标按下那一刻就记住我是在哪个元素上按的，而不是依靠target这个属性
            }
        }

        addEventListener("mousemove", move)

        addEventListener("mouseup", function up(event) {

            end()
            log("end:", last)
            if(last < 1500) {
               movingEL = null
               removeEventListener("mousemove", move)
               removeEventListener("mouseup", up) 
            } else {
                event.preventDefault()
            }
            
        })
    })
})()