import Shape from '../components/shape.vue'

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

function install (Vue, options = {}) {
    const inBrowser = typeof window !== 'undefined'

    const DEFAULT_OPTION = {
         width:100,
         height:100,
         timeX:3000,
         timeY:4000,
         background:'pink',
    }

    let Progress = {
        $vm: null,
        state: {
            timer: null,
            color:['yellow','orange','green','blue']
        },
        init (vm) {
            this.$vm = vm
        },
        start (time) {
            if (!this.$vm) return
            if (!time) time = 1000
            let  total = 0
            clearInterval(this.state.timer)
            this.state.timer = setInterval(() => {
                this.increase(parseInt(Math.random()*5))
                this.$vm.RADON_LOADING_BAR.options.background = this.state.color[parseInt(Math.random()*4)]
                // if (this.$vm.RADON_LOADING_BAR.percent > 95 && this.$vm.RADON_LOADING_BAR.options.autoFinish) {
                //     this.finish()
                // }
                // total += 100
                // if( total> 1000) clearInterval(this.state.timer)
                console.log('ddd')
            }, 100)
        },
        get () {
            return Math.floor(this.$vm.RADON_LOADING_BAR.percent)
        },
        increase (num) {
            this.$vm.RADON_LOADING_BAR.options.width += num
            this.$vm.RADON_LOADING_BAR.options.height += num
        },
        finish () {
            if (!this.$vm) return
            this.$vm.RADON_LOADING_BAR.percent = 100
            this.hide()
        },
        fail () {
            this.$vm.RADON_LOADING_BAR.options.canSuccess = false
            this.$vm.RADON_LOADING_BAR.percent = 100
            this.hide()
        },
        setFailColor (color) {
            this.$vm.RADON_LOADING_BAR.options.failedColor = color
        },
        setColor (color) {
            this.$vm.RADON_LOADING_BAR.options.color = color
        },
    }

    const progressOptions = assign(DEFAULT_OPTION, options)

    const VueProgressBarEventBus = new Vue({
        data: {
            RADON_LOADING_BAR: {
                percent:0,
                options: progressOptions
            }
        }
    })

    if (inBrowser) {
        window.VueProgressBarEventBus = VueProgressBarEventBus
        Progress.init(VueProgressBarEventBus)
    }

    Vue.component('vue-shape', Shape)
    Vue.prototype.$progress = Progress
}

export default {
    install
}