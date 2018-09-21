<template>
    <div class="ewe">
         <!-- <div v-for="(item,index) in navs" :key="index">
             <img v-lazy="item.src" alt="" width="260" height="200">
         </div> -->

         <!-- <div v-lazyload="'aaa'">qqq</div>
         <div v-lazyload="'bba'">www</div>
         <div v-lazyload="'bbb'">fff</div>
          <div v-lazyload="'ccb'">qqq</div>
         <div v-lazyload="'eee'">www</div>
         <div v-lazyload="'vfd'">fff</div> -->

         <span>{{balance}}</span>
         <button @click="withdraw">取200块钱</button>
    </div>
</template>
<script>
    import {withdraw, getbalance} from '../getData/dataService'
    export default {
    name: 'lobby',
    data () {
        return {
            navs:[
                {name: "真人", icon: "icon_live",displayName:'_video',src:"https://jiaboftp.sendicq.com/images/cpms/7205b7fb-682d-4540-b992-25730ea2d1b4.png"},
                {name: "真人", icon: "icon_live",displayName:'_video',src:"https://jiaboftp.sendicq.com/images/cpms/7205b7fb-682d-4540-b992-25730ea2d1b4.png"},            
            ],

            balance:null,
        }
       },

       mounted(){
            getbalance('miracle').then(res => {
                console.log(res)
                this.balance = res[0].balance
            })
        //    this.$Lazyload.$on('loaded', function ({ el, src }) {
        //        console.log(el, src)
        //    })
       },

       methods:{
           withdraw(){
               withdraw('miracle', 200).then(res => {
                    this.balance = res[0].balance
               })
           }
       }
    } 
</script>

<style scoped>
   img{display: block;width:260px; height: 200px;}

   /* div{width: 300px;height: 300px; margin-bottom: 20px;background: chocolate} */
</style>
