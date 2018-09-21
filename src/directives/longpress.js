function handler(){
    console.log("你长按了我");
}

export default {
    bind(el, binding, vnode){
       console.log('bind')
       console.log(binding)
       console.log(vnode.data)
       //let timer, oldtime

    //    el.addEventListener("click",function(){
    //       if(new Date().getTime() - 1500*1000 < oldtime && oldtime)
    //          clearTimeout(timer)
    //       oldtime = new Date().getTime()
    //       timer = setTimeout(handler,1500);
    //    })
        
    //    el.addEventListener("mouseup",function(){
    //       clearTimeout(timer);
    //    })
    },
    inserted(el, bingding, vnode){
       console.log('inserted')
       console.log(vnode.data)
    },
    update(el, bingding, vnode, oldVnode) {
       // 通过vnode获取指令挂载所在组件的data
       console.log('updated')
       console.log(oldVnode.context.msg)
    }
}