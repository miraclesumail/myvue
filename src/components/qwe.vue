<template>
  <div class="hello">
       <!-- <vue-shape></vue-shape> -->
   {{msg}}  
       <div>
          <ul>
             <li v-for="(item,index) in menus" :key="index" @click="choose(item)">{{item}}</li>
          </ul>
          <!-- <child :message="item" :persons="persons" @passData="add"></child> 
          <child1></child1> -->
       </div>
       
       <p>FullName: {{fullName}}</p>
       <p>FirstName: <input type="text" v-model="firstName"></p>

       <p>obj.a: {{obj.a}}</p>
       <p>obj.a: <input type="text" v-model="obj.a"></p>

       <div>你选择的位置 是 {{place}}</div>
       <child1></child1>
       <cascade :data="places"  @passName = "getName"></cascade>   
  </div>
</template>

<script>
import child from './child'
import child1 from './child1'
import cascade from './cascade'

export default {
  name: 'Qwe',
  components:{
     child,child1,cascade
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      menus:['aa','bb','cc'],
      item:'aa',
      place:'',
      firstName: 'Dawei',
      lastName: 'Lou',
      fullName: '',
      obj:{},
      // obj: {
      //   a: 123
      // },
      persons:[
        {name:'qqqq', age:18, gender:'male'},
        {name:'wwww', age:18, gender:'male'},
        {name:'eeee', age:18, gender:'female'}
      ],

      places:[
         {name:'湖北', children:[
           {name:'武汉', children:[{name:'洪山'},{name:'武昌'},{name:'汉口'}]
           },
            {name:'宜昌', children:[{name:'大道'},{name:'嘎嘎嘎'},{name:'大道'}]
           },
            {name:'黄冈', children:[{name:'yangluo3'},{name:'yangluo'},{name:'yangluo'}]
           }]
          },
         {name:'hubei1', children:[
           {name:'wuhan2', children:[{name:'yangluo4'},{name:'yangluo'},{name:'yangluo'}]
           },
            {name:'wuhan2', children:[{name:'yangluo5'},{name:'yangluo'},{name:'yangluo'}]
           },
            {name:'wuhan1', children:[{name:'yangluo6'},{name:'yangluo'},{name:'yangluo'}]
           }]
          },
        {name:'hubei2', children:[
           {name:'wuhan12', children:[{name:'yangluo7'},{name:'yangluo'},{name:'yangluo'}]
           },
            {name:'wuhan12', children:[{name:'yangluo8'},{name:'yangluo'},{name:'yangluo'}]
           },
            {name:'wuhan12', children:[{name:'yangluo9'},{name:'yangluo'},{name:'yangluo'}]
           }]
          },
         {name:'hubei3', children:[
           {name:'wuhan3', children:[{name:'yangluo11'},{name:'yangluo'},{name:'yangluo'}]
           },
            {name:'wuhan3', children:[{name:'yangluo12'},{name:'yangluo'},{name:'yangluo'}]
           },
            {name:'wuhan1', children:[{name:'yangluo13'},{name:'yangluo'},{name:'yangluo'}]
           }]
          },
      ]

    }
  },
  created(){
      this.$progress.start()

      this.$on('from-child', (params) => {
          console.log(params)
      })
  },

  mounted(){
    this.obj = {
      a: '456'
    }
  },
  methods:{
      choose(item){
          this.item = item
      },
      add(data){
          this.persons.push(data)
      },
      getName(name){
          this.place = name
      }
  },

   watch: {
    firstName:{
       handler(newName, oldName) {
         this.fullName = newName + ' ' + this.lastName;
       },
       immediate:true
    },

     obj: {
      handler(newName, oldName) {
         console.log('obj.a changed');
      },
      immediate: true,
      deep: true
    }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}

ul{
  li{display: inline-block}
}
</style>
