<template>
    <div>
         <!-- <tabNav :list="types" v-model="active">  </tabNav>
         <div flex="box:mean" @click="down = !down">order by age <span v-html="down ? 'desc' : 'asc'"></span></div>
         <ul v-if="list && list.length">
             <li v-for="(item, index) in list" :key="index">{{item.name}} ===== {{item.age}}</li>
         </ul>

         <pagition :current="current" :total="total" @changeCurrent="setCurrent"></pagition>  -->

         <scroll :data="games">  
             <div>
                  <!-- <div class="game_list"> 
                        <div class="item" v-for="(item, index) in games" :key="index"> 
                            <div>{{item.title}}</div>
                            <div>{{item.content}}</div>
                        </div>
                  </div>    -->
                  <gamelist :games='games'>
                  </gamelist>    
             </div>
            
         </scroll>  
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {getAnimalByType, signIn} from '../getData/dataService'
import tabNav from './custom/tabNav'
import pagition from './custom/pagition'
import gamelist from './custom/gamelist'

    export default {
        name:'crud',
        components:{tabNav, pagition, gamelist},
        data(){
            return {
                active:'',
                list:[],
                down:false,
                current:1,
                total:[],
                games:[
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                    {title:'sssss', content:'qqqqqq'},
                   
                ]
            }
        },
        computed:{
            ...mapState(['types']),
            // active(){
            //     return this.types[0]
            // }
        },

        mounted(){
            signIn().then(res => console.log(res))
        },

        methods:{
           setCurrent(index){
               this.current = index
           }
        },
        watch:{
           active(newVal, oldVal){
              //getAnimalByType(newVal).then(res => this.list = res.sort((a,b) => a.age - b.age))
              getAnimalByType(newVal).then(res => {
                  this.list = res.data
                  this.current = res.current
                  this.total = Array.apply(null, Array(res.total)).map((v,i) => i+1)
                  console.log(res.total)
              })
           },
           down(newVal, oldVal){
              this.list.reverse()
           },

           current(newVal, oldVal){
              console.log(newVal)
              
              getAnimalByType(this.active, 3, newVal).then(res => {
                this.list = res.data
                this.current = res.current
                this.total = Array.apply(null, Array(res.total)).map((v,i) => i+1)
                console.log(res.total)
              })
           }
        }
    }
</script>
<style scoped>
    .game_list{ padding: 0.25rem 0.4rem;
    overflow: auto;}

    .item{width: 1.5rem;
        height: 2rem;
        text-align: center;
        float: left;
        margin-right: 0.23rem;
        font-size: 0.24rem;}

    .game_list .item:nth-child(4n){margin-right: 0}    


</style>