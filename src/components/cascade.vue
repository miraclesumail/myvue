<template>
    <div class="main">
        <div class="container">
            <div class="arrow" @click="toggleShow()"> toggle show</div>
            <ul v-if="data && data.length && toggle" >

                <li v-for="(item,index) in data" :key="index" @click="handlerChoose(item, index)"  :class="{'active': index == activeIndex}">
                    {{item.name}}
                </li>
            </ul>
        </div>
       
        <cascade v-if="sublist && sublist.length" :data.sync="sublist" ref="child" @passName = "getName"> </cascade>
    </div>
</template>

<script>
    export default {
         name: 'cascade',
         props: {
            data: {
                type: Array,
                default () {
                    return [];
                }
            },
            // sublist: {
            //     type: Array,
            //     default () {
            //         return [];
            //     }
            // },       
        },
        data(){
            return {
                sublist:[],
                activeIndex:null,
                toggle:false
            }
        },

        methods:{
           handlerChoose(item, index){
               // 获取父组件的名字  $parent是获取父组件的引用

               console.log(this.$parent.$options.name)
               console.log(this.$parent.$emit)
               console.log(this.$parent.$on)

               this.$parent.$emit('from-child', 'wwwww')

               if(item.children){ 
                    this.sublist = item.children
                    
                    if(this.activeIndex != null && index != this.activeIndex && this.$refs.child.toggle){
                            console.log('toggle')
                            this.$refs.child.toggleShow()     
                    }
               }      
               this.activeIndex = index    
           },

           toggleShow(){
               this.toggle = !this.toggle
            //    if(!this.toggle){
            //        this.activeIndex = null
                //    if(this.sublist && this.sublist.length){
                //         //this.childToggle()
                //         this.sublist = []
                //    }   
               //}        
           },
           childToggle(){
                console.log(this.$refs.child)
                this.$refs.child.toggleShow()
           },

           getName(name){
                this.$emit('passName', this.data[this.activeIndex].name + name)  
           }
        },

         watch: {
            data () {
                this.sublist = [];
            },
            toggle (a,b){
                if(!a){
                   this.sublist = []
                   this.activeIndex = null
                   this.$emit('passName', '')
                }        
            },
            activeIndex (a,b){
                if(a != null)
                   this.$emit('passName', this.data[a].name)
            }
        }
    }

</script>

<style scoped lang="scss">
   .main{display: flex; margin:0 20px}
   li.active{color:chocolate}
   .container{display: flex; flex-direction: column}
</style>