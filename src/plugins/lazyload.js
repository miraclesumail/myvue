function throtle(func, time){
    var times = new Date().getTime(), timer
 　　return function(){
        var now = new Date().getTime()
        if(now - times >= time){
           times = now
           timer = null
        }else{
           if(timer) return 
           timer = setTimeout(function(){
             func()
           }, time)
 
        }
     }　　
}

function assign (target, source) { // eslint-disable-line no-unused-vars
    for (var index = 1, key, src; index < arguments.length; ++index) {
        src = arguments[index];

        for (key in src) {
            if (Object.prototype.hasOwnProperty.call(src, key)) {
                target[key] = src[key];
            }
        }
    }
    return target
}

export default function(Vue, options = {}){
    let defaults = {
        preload:0.8,
    }, doms = [], winheight = document.documentElement.clientHeight;

    console.log(winheight)   

    Vue.directive('lazyload', {
        bind:function(el, binding){
             //window.scroll = throtle(() => {}, 300)
             observe({el, binding})
        }
    })

    function observe(dom){
       doms.push(dom) 
       console.log(doms)
    }

    window.onscroll = throtle(() => {
        console.log('scroll')
        let top = document.documentElement.scrollTop; 
        console.log(top)
        doms.forEach(dom => {
            console.log(dom.el.offsetTop)
            if(dom.el.offsetTop > winheight && (dom.el.offsetTop - top) <= defaults.preload*winheight){
                console.log('memme')          
                //dom.el.setAttribute('ddd', dom.binding.value)
                dom.el.textContent = dom.binding.value
            }              
        })
    }, 200)
}


 