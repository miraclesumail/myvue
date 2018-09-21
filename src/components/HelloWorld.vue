<template>
  <div class="hello">
    <!-- <vue-shape></vue-shape> -->
    <router-link to="/qwe"> <a>go qwe</a> </router-link>   

    <div ref="msg" v-longpress v-test>{{msg}}</div>
    <button @click="changeMsg">changeMsg</button>
    <Button type="warning">Warning</Button>
    <Button type="success" ghost>success</Button>
    <Button type="primary">Primary</Button>

     <!-- <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1"><Icon type="ios-paper"/> <span>内容管理</span> </MenuItem>
        <MenuItem name="2">
            <Icon type="ios-people"/>
            用户管理
        </MenuItem>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-stats"/>
                统计分析
            </template>
            <MenuGroup title="使用">
                <MenuItem name="3-1">新增和启动</MenuItem>
                <MenuItem name="3-2">活跃分析</MenuItem>
                <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
                <MenuItem name="3-4">用户留存</MenuItem>
                <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem name="4">
            <Icon type="ios-construct" />
            综合设置
        </MenuItem>
    </Menu> -->
    <!-- <p>Change theme</p>
    <RadioGroup v-model="theme1">
        <Radio label="light"></Radio>
        <Radio label="dark"></Radio>
        <Radio label="primary"></Radio>
    </RadioGroup> -->

    <my-custom></my-custom>
    <p>{{str | getRepeatCount}}</p>
    <Spin fix v-if="showLoading">
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
    </Spin>

    <div class="container">
      <ul class="menus">
          <li v-for="(item,index) in menus" :key="index" @click="scroll(index)" class="choice" :class="{active:index == activeIndex}">
              {{item.type}}
          </li>
      </ul>

      <ul class="content">
         <li v-for="(item,index) in menus" :key="index" class="list-wrapper">
             <div class="title">{{item.type}}</div>            
             <ul class="detail">
                <li v-for="(item,index) in item.list" :key="index">{{item}}</li>
             </ul>
         </li>
      </ul>

      <ul class="todo-list">
        <li
          v-for="(todo, index) in todos" :key="index">
            {{todo.text}} --- {{todo.time}}
        </li>
      </ul>

        <div>
            <input type="text" ref="name">
            <input type="submit" @click="addTodo" value="提交">
        </div>  
    </div>  
  </div>
</template>

<script>
import longpress from '../directives/longpress'
import test from '../directives/test'
export default {
  name: 'HelloWorld',
  directives:{longpress, test},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      theme1:'light',
      menus:[
           {type:"drink", list:["coco","coco","coco","coco","coco","coco","coco","coco","coco","coco"]},
           {type:"food", list:["coco","coco","coco","coco","coco","coco","coco","coco",]},
           {type:"music", list:["coco1","coco","coco","coco","coco","coco","coco","coco","coco",]},
           {type:"movie", list:["coco2","coco","coco","coco","coco","coco"]},
           {type:"axiba", list:["coco3","coco","coco","coco","coco","coco","coco"]},
           {type:"qwe", list:["coco4","coco","coco","coco","coco","coco","coco"]},
           {type:"asd", list:["coco4","coco","coco","coco","coco","coco","coco"]},
           {type:"zxc", list:["coco4","coco","coco","coco","coco","coco","coco"]},
           {type:"fre", list:["coco4","coco","coco","coco","coco","coco","coco"]},
      ],
      str:'aa vgre  bbfgd asasd fffdd',
      scrollDis:[],
      activeIndex:null,
    }
  },
  /*   */
  created(){
     console.log('create')
     console.log(this.$router.history.current)
     console.log(document.querySelectorAll('.list-wrapper'))
    //   this.$router.beforeEach((to, from, next) => {
    //       console.log(to)
    //  })
     this.$ajax.get('/static/test.json').then(res => console.log(res.data))

     //this.$ajax.get('http://localhost:8000/student').then(res => console.log(res.data))
  },
  mounted(){
    console.log(document.querySelectorAll('.list-wrapper'));
    [].slice.call(document.querySelectorAll('.list-wrapper')).forEach(element => {
         console.log(element.offsetTop)
         this.scrollDis.push(element.offsetTop)
    });
    this.$progress.start()
    /*最后一个小于  最大的滚动距离    */

    let self = this, singleHeight = document.querySelector('.choice').offsetHeight
    document.querySelector('.content').onscroll = function(){
      console.log('scroll')
      let top = document.querySelector('.content').scrollTop
      self.activeIndex = self.scrollDis.findIndex(ele => ele > top) - 1

      if(self.activeIndex<=2){
         document.querySelector('.menus').scrollTop = 0
      }else if(2<self.activeIndex<6){
         document.querySelector('.menus').scrollTop = (self.activeIndex - 2)*singleHeight
      }else{

      }
    }
  },
  
  computed:{
      todos(){
          return this.$store.state.todos
      },
      showLoading(){
          return this.$store.state.showLoading
      }
  },

  methods:{
     scroll(index){
         console.log(index)
         console.log(this.scrollDis)
         console.log(this.$('content'))
         this.$('.content').animate({scrollTop: this.scrollDis[index]+'px'}, 300)
         //document.querySelector('.content').scrollTop = this.scroll'is[index]
     },
     addTodo(){
         this.$store.dispatch('addTodo', this.$refs.name.value)
     },

     changeMsg(){
         this.msg= 'wgwgwgwg'
        // console.log(this.$refs.msg.innerHTML) 
         this.$nextTick(() => {console.log(this.$refs.msg.innerHTML)})
     }
  },

//   events:{
//       onClear(){
//           console.log('onClear')
//       }
//   }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0
}

ul.menus{margin-left: 50px;height: 195px;position:relative;overflow:hidden;}

.menus li{padding:10px;background: pink;border-bottom: 1px solid #666666}

.menus li.active{background: orange}

a {
  color: #42b983;
}

.container{
  display: flex
}

ul.content{margin-left: 50px;height: 350px;position:relative;overflow-y:scroll;}

.title{background: #f5d300;color: chocolate;}

.detail li{padding: 8px;background: olive;border-bottom: 1px solid grey}

.ivu-spin-fix{background: lightpink}
</style>
