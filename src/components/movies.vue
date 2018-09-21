<template>
    <div>
        movies
        <ul>
            <li v-for="(movie,index) in movies" :key="index">
                <!-- <router-link :to="'/movies/' + movie.id ">{{movie.name}}</router-link> -->
                <!-- 命名路由 -->
                <router-link :to="{name:'movies', params:{id:movie.id}}">{{movie.name}}</router-link>
            </li>
        </ul>

        <div v-if="movie">{{movie.name}} -- {{movie.id}}</div>
        <button @click="add">add</button>
    </div>
</template>

<script>
     import {getMovies, getMovie, combine, test, addPlayer} from '../getData/dataService'
     
     export default {
         name:"movies",
         data(){
             return {
                 movies:'',
                 movie:null
             }
         },

         created(){
             console.log('created')
             test()
             addPlayer()
             
             this.initData()
             combine()
         },

         methods:{
             async initData(){
                 this.movies = await getMovies()
                 console.log(this.movies)
             },

             add(){
                addPlayer()
             }
         },

         watch: {
            async $route(to, from) {
                console.log(to.params)
                this.movie = await getMovie(to.params.id)
            }
        }
     }

</script>
