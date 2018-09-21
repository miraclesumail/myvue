import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Qwe from '@/components/qwe'
import Login from '@/components/login'
import Triangle from '@/components/triangle'
import Movies from '@/components/movies'
import sidebar from '@/components/sidebar'
import maincontent from '@/components/maincontent'
import crud from '@/components/crud'
import testscroll from '@/components/test_scroll'
import recruit from '@/components/recruit'

Vue.use(Router)

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Baz = { template: '<div>baz</div>' }

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/helloworld',
      name: 'HelloWorld',
      components: {
         default:HelloWorld,
         a: Foo,
        
      }
    },
    {
      path: '/',
      name: 'triangle',
      component: Triangle,
      //meta:{keepAlive:true}  //该组件不会被销毁
    },
    {
      path: '/test',
      name: 'test',
      component: testscroll,
    },

    {
      path: '/recruit',
      name: 'recruit',
      component: recruit,
    },
    {
      path: '/crud',
      name: 'crud',
      component: crud,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/qwe',
      name: 'Qwe',
      component: Qwe,
      meta:{
          requireAuth:true
      }
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/movies/:id',
      name: 'movies',
      component: Movies
    },

  
  ]
})

