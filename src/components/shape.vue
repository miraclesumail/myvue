<template>
    <div :style="style">
        vdfregreg
    </div>
</template>

<script>
const inBrowser = typeof window !== 'undefined'

export default {
    name:'Shape',
    computed:{
        style(){
            let options = window.VueProgressBarEventBus.RADON_LOADING_BAR.options
            let style = {}
            style.width = options.width + 'px'
            style.height = options.height + 'px'
            style.background = options.background
            return style
        }
    }
}
</script>