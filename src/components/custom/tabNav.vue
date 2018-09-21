<template>
      <ul class="tab_navs" flex="box:mean">
        <li class="item" flex="main:center cross:center dir:top"
            @click="$emit('input',item)"
            :class="{active:item==value}"
            v-for="(item,index) in list"
            :key="index">
            <!-- <div class="box" flex="main:center cross:center">
                <div :class="item.icon"></div>
            </div> -->
            <span>{{item}}</span>
        </li>
    </ul>
</template>

<script>
   export default{
       name:'tabNav',
       props:{list:Array,value:String}
   } 
</script>

<style scoped lang="scss">
.active{background:pink}
</style>