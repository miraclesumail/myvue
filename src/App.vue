<template>
  <div id="app">
    <router-view class="view two" name="a"></router-view>
    <router-view class="view three" name="b"></router-view>
   	<transition name="router-fade" mode="out-in">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    </transition>

    <!-- 使用out-in实现过度 -->
    <transition name="router-fade" mode="out-in">
			 <router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>

    
  </div>
</template>

<script>
import 'flex.css'

export default {
  name: 'App',

  created(){
      this.$ajax.get('http://localhost:8000/animals/getCount').then(res => {
           const types = res.data.map(item => item.type)
           this.$store.commit('setType', types)
      })
  },
  beforeRouteEnter (to, from, next) {
      console.log(to)
  },

  beforeRouteLeave (to, from, next) {
      console.log(to) 
  } 
}
</script>
   
<style lang="scss">
@import 'assets/index.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.router-fade-enter-active, .router-fade-leave-active {
	    transition: all .3s ease;
	}
	.router-fade-enter, .router-fade-leave-active {
      opacity: 0;
      transform: translateX(100%)
	}
</style>
