<template>
    <div>
         {{message}}
         <button v-on:click="show = !show">
            Toggle
         </button>
          <ul>
             <li v-for="(item,index) in persons" :key="index">{{item.name}} {{item.age}} {{item.gender}}</li>
          </ul>
         <transition name="fade">
           <div v-if="show" class="biaodan">
                <input type="text" ref="name">
                <input type="text" ref="age">

                <input type="submit" @click="submit" value="提交">
           </div>  
         </transition>      
         <button @click="test">test</button>   
    </div>
</template>

<script>
  export default {
    name: 'Child',
    props:['message','persons'],

    data(){
        return  {
           show: true
        }
    },
    created(){
        console.log(this.message)
    },

    watch:{
        message(old,news){
            console.log(old,news)
        }
    },

    methods:{
        submit(){
            let name = this.$refs.name.value
            let age = this.$refs.age.value

            console.log(name, age)
            this.$emit('passData', {name, age:+age, gender:'female'})
            this.show = !this.show
        },

        test(){
             this.$eventBus.$emit('wtf', 'ffff');
        }
    }

  }  
  
</script>

<style scoped lang="scss">
    .biaodan{
        position: fixed; left:calc(50vw - 50px); top:calc(40vh - 50px);background: pink;width:100px;height:100px ;

        input{width:50px}
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>