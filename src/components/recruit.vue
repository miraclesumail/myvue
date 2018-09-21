<template>
    <div>
        <div>
            <input type="text" placeholder="type position" @input="debounceInput" :value="search">
        </div>

        <ul v-if="list.length">
            <li v-color="getDetailJob" v-for="(item, index) in list" :key="index" :index="index" :title="item.title">{{item.title}} {{item.position}}</li>
        </ul>

        <ul v-if="jobs.length">
            <li v-for="(item, index) in jobs" :key="index">{{item.name}} {{item.salary}}</li>
        </ul>
    </div>
</template>

<script>
    import * as _ from 'lodash'
    import {getPosition,getJobs} from '../getData/dataService'
    export default{
           name: 'recruit',
           data(){
               return {
                   list:[],
                   search:"",
                   jobs:[]
               }
           },

           methods: {
                debounceInput: _.debounce(function(e) {
                    if(e.target.value == this.search)
                       return
                    this.search  = e.target.value  
                    getPosition(e.target.value).then((res) => {
                        this.list = res
                        this.jobs = []
                    })
                }, 2000),

                async getDetailJob(des){
                    this.list = []
                    this.search = des
                    this.jobs = await getJobs(des)
                }
           }
    }
</script>
