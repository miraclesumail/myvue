<template>
    <div>
        <ul flex="box:mean">
            <li v-for="(item,index) in total" :key="index" :class="{active:current == item}" @click="emitCurrent(item)"> {{item}} </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:'pagition',
        data(){
            return {}
        },
        props:{current:Number, total:Array},

        methods:{
            emitCurrent(val){
                this.$emit('changeCurrent', val)
            }
        }
    }
</script>

<style scoped lang="scss">
.active{background:pink}
</style>