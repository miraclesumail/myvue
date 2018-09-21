<template>
    <div class="login-container">
         <input type="text" ref="username" placeholder="enter username">
         <input type="password" ref="password" placeholder="enter password">
         <button @click="confirm">confirm</button>
    </div>
</template>

<script>
   import {mapState} from 'vuex'

   export default {
      name:"login",
      data () {
          return {
              
          }
      },

      computed:mapState['user'],
      beforeRouteEnter (to, from, next) {
          console.log(to)
          next()
      },
      methods:{
          confirm(){
             console.log(this.user)

             
             this.$store.commit('setUser', this.$refs.user.value)
             this.$router.push({path:this.$route.query.redirect})
          }
      }  
   }

</script>
