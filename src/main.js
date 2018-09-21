// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as $ from 'jquery'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
Vue.config.productionTip = false

import store from './store'
import shape from './plugins/cicle'
import lazy from './plugins/lazyload'
import iView from 'iview';
import axios from 'axios';
import 'iview/dist/styles/iview.css';
import './assets/global.css';
import filters from './filters';
import VueLazyload from 'vue-lazyload'
import Scroll from './components/custom/scroll';
import Echo from 'laravel-echo';
window.io = require('socket.io-client');
 
window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
});

window.Echo.channel('news').listen('MessagePushed', (e) => {
  console.log('wwww')
  console.log(e);
});

//import '../mytheme/index.less'
Vue.use(shape, {width:280,height:50})
Vue.use(iView)

/*  设置REM(100PX=>1REM) */
;(function () {
	var docEl = document.documentElement;
	var resize = 'orientationchange' in window ? 'orientationchange' : 'resize';
	var setRem = function () {
		var screenWidth = docEl.clientWidth || window.screen.width || 360;
		var screenHeight = docEl.clientHeight || window.screen.Height || 360;
		var remWidth = screenWidth<screenHeight ? screenWidth :screenHeight;
	
		docEl.style.fontSize = (100 * screenWidth / 750) + 'px';
	};
	window.addEventListener('resize', setRem, false);
	document.addEventListener('DOMContentLoaded', setRem, false);
	setRem();
})();

/**            全局组件     */
Vue.component('scroll', Scroll)

/*    lay-load    */
Vue.use(VueLazyload, {
  preLoad: 1,
  attempt: 1,
})

Vue.use(lazy)

//axios拦截器
axios.interceptors.request.use((config) => {
     //config.headers['wtf'] = 'XMLHttpRequest'
     //config.headers['Access-Control-Allow-Origin'] = '*'
     //config.crossdomain = true
     return config
})

//添加响应
axios.interceptors.response.use((response) => {
     console.log(response)
     //response.data.extra = "wtf"
     return response
})

//http://sumail@git.neweb.me/hank/template-fpms-jsh-moblie.git

router.beforeEach((to, from, next) => {
     console.log(to)
     console.log(store)
     
     if(to.meta.requireAuth){
        if(!store.state.user){
           next({
            path: '/login',
            query: {redirect: to.fullPath}
           })
        }else{
            next()
        }
     }else{
        next()
     }  
})

Vue.prototype.$=$
Vue.prototype.$ajax=axios

/*  设置REM(100PX=>1REM) */
;(function () {
	var docEl = document.documentElement;
	var resize = 'orientationchange' in window ? 'orientationchange' : 'resize';
	var setRem = function () {
		var screenWidth = docEl.clientWidth || window.screen.width || 360;
		var screenHeight = docEl.clientHeight || window.screen.Height || 360;

		docEl.style.fontSize = (100 * screenWidth / 750) + 'px';
	};
	window.addEventListener('resize', setRem, false);
	document.addEventListener('DOMContentLoaded', setRem, false);
	setRem();
})();

// 实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

Vue.component('my-custom', {
    render:function(h){
      return h('h1',
         {attrs:{name:'wtf'}},
         [h('div', 'fff')]
       )
    }
})

Vue.directive('color', {
  bind: function (el, binding) {
      console.log(el)
      el.addEventListener('mouseover', () => {
           +el.getAttribute('index')%2 == 0 ? el.style.background = 'yellow' : el.style.background = 'pink'
         
      },false)

      el.addEventListener('mouseout', () => {
           el.style.background = 'none'
      },false)

      el.addEventListener('click', () => {
           let title = el.getAttribute('title')
           binding.value(title)
      }, false)
     // console.log(binding.value) 
  }
})

Vue.prototype.$eventBus = new Vue()
/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App)
})
