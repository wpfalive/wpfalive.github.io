!function(){
    var duration = 50
    $('.actions').on('click', 'button', function(e) {
        let $button = $(e.currentTarget)
        let speed = $button.attr('data-speed')
        console.log(speed)
        $button.addClass('active')
            .siblings('.active').removeClass('active')
        switch(speed) {
            case 'slow':
                duration = 100
                break
            case 'normal':
                duration = 20
                break
            case 'fast':
                duration = 10
                break
        }
    })
    function writeCode(prefix, code, fn) {
        let container = document.querySelector("#code")
        let styleTag = document.querySelector("#styleTag")
        let n = 0
        setTimeout(function run(){
            n += 1
            container.innerHTML = code.substring(0, n)
            container.scrollTop = container.scrollHeight
            styleTag.innerHTML = code.substring(0, n)
            if(n < code.length) {
                setTimeout(run, duration)
            } else {
                fn && fn.call()
            }
        }, duration)
    }
    let code = `
/*
 * 首先，需要准备皮卡丘的皮
 */
.preview {
    height: 100%;
    border: 1px solid green;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FDE348;
}
.wrapper {
    width: 100%;
    height: 165px;
    position: relative;
}
.wrapper > :not(:last-child) {
    z-index: 1;
}
/*
 * 接下来，画皮卡丘的鼻子
 */
.nose {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 12px;
    border-color: black transparent transparent;
    border-radius: 11px;
    position: absolute;
    left: 50%;
    top: 28px;
    margin-left: -12px;
}
/*
 * 接下来，画皮卡丘的眼睛
 */
.eye {
    width: 49px;
    height: 49px;
    background: #2E2E2E;
    position: absolute;
    border-radius: 50%;
    border: 2px solid #000000;
}
/*
 * 画眼珠子
 */
.eye::before {
    position: absolute;
    top: -1px;
    left: 6px;
    content: "";
    display: block;
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    border: 2px solid #000;
}
/*
 * 左眼在左边(废话)
 */
.eye.left {
    right: 50%;
    margin-right: 90px;
    
}
/*
 * 右眼在右边(废话)
 */
.eye.right {
    left: 50%;
    margin-left: 90px;
}
/*
 * 然后画皮卡丘的脸
 */
.face {
    position: absolute;
    top: 85px;
    width: 68px;
    height: 68px;
    background: #FC0D1C;
    border: 2px solid black;
    border-radius: 50%;
}
/*
 * 将脸放到正确的位置
 */
.face.left {
    right: 50%;
    margin-right: 116px;
}
.face.right {
    left: 50%;
    margin-left: 116px;
}
/*
 * 上嘴唇
 */
.upperLip {
    height: 25px;
    width: 80px;
    border: 2px solid black;
    border-top: none;
    position: absolute;
    top: 50px;
    background: #FDE348;
}
.upperLip.left {
    right: 50%;
    border-bottom-left-radius: 40px 25px;
    transform: rotate(-20deg);
    border-right: none;
}
.upperLip.right {
    left: 50%;
    transform: rotate(20deg);
    border-bottom-right-radius: 40px 25px;
    border-left: none;
    border-left: none;
}
/*
 * 下嘴唇
 */
.lowerLip-wrapper {
    bottom: 0;
    position: absolute;
    left: 50%;
    margin-left: -150px;
    height: 110px;
    width: 300px;
    overflow: hidden;
}
.lowerLip {
    width: 300px;
    height: 3500px;
    background: #990513;
    border-radius: 200px/2000px;
    border: 2px solid black;
    position: absolute;
    bottom: 0;
    overflow: hidden;
}
/*
 * 小舌头
 */
.lowerLip::after {
    content: "";
    position: absolute;
    bottom: -20px;
    width: 100px;
    height: 100px;
    background: #FC4A62;
    left: 50%;
    margin-left: -50px;
    border-radius: 50px;
}
/*
 * 好了，这只皮卡丘送给柠檬女孩
 */
`
/*所有的setInterval都可以改写成setTimeout*/
    writeCode("", code)

}.call()
