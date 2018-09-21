import axios from 'axios';
import * as $ from 'jquery'

const baseUrl = "http://localhost:8000/"

export const signIn = () => {
     return new Promise((resolve, reject) => {
    //     $.ajax({
    //         url: `${baseUrl}signin`,
    //         dataType : 'json',
    //         type: 'POST',
    //         data: {name:'miracle', password:'tjsb1991'},
    //         success:function(response) {
    //              console.log(response);
    //         }
    //    });
        axios.post(`${baseUrl}signin`, {name:'miracle', password:'tjsb1991'}).then(res => resolve(res.data), error => reject(error));
     })  
}

export const withdraw = (username, amount) => {
    return new Promise((resolve, reject) => {
            axios.post(`${baseUrl}withdraw`, {username,amount}).then(res => resolve(res.data), error => reject(error));
     })  
}

export const getbalance = (username) => {
    return new Promise((resolve, reject) => {
            axios.get(`${baseUrl}getbalance/${username}`).then(res => resolve(res.data), error => reject(error));
     })  
}

export const getPosition = (title) => {
     return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}getPosition/${title}`).then(res => resolve(res.data), error => reject(error));
     })
}

export const getJobs = (search) => {
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}getJobs/${search}`).then(res => resolve(res.data), error => reject(error));
     })
}

export const getTypeCount = () => {
     return new Promise((resolve, reject) => {
        axios.get(baseUrl + 'animals/getCount').then(res => resolve(res.data), error => reject(error));
     })
}

export const getAnimalByType = (type, count=3, page=1) => {
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}animals/${type}/${count}/${page}`).then(res => resolve(res.data), error => reject(error));
    })
}

export const getMovies = () => {
     return new Promise((resolve, reject) => {
         axios.get(baseUrl + 'players').then(res => resolve(res.data), error => reject(error));
     })
}

export const getMovie = (id) => {
    return new Promise((resolve, reject) => {
        //axios.get(baseUrl + 'players').then(res => resolve(res.data), error => reject(error));
        axios.get(`${baseUrl}players/${id}`).then(res => resolve(res.data), error => reject(error));
    })
}

export const addPlayer = () => {
    return new Promise((resolve, reject) => {
        // axios.get(baseUrl + 'players').then(res => resolve(res.data), error => reject(error));
        // axios.post(`${baseUrl}players`, {name:'axiba', age:13, gender:'male'}, {
        //     headers: {
        //         'X-CSRF-TOKEN':'E5CKLuJCC2jM3X7sQ1dsA7ruf4ZyxNhCwdjv7nFi',
        //        // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers'
        //         //'Content-Type': 'application/json'
        //        // "Access-Control-Allow-Headers": "Content-Type, Authorizations"
        //     }
        // }).then(res => resolve(res.data), error => reject(error));

        $.ajax({
            url: `${baseUrl}players`,
            dataType : 'json',
            type: 'POST',
            data: {name:'axiba', age:13, gender:'male'},
            success:function(response) {
                 console.log(response);
            }
       });
    })
}

export const upload = (formData) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${baseUrl}upload`,
            type: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false,
            success:function(response) {
                 console.log(response);
            }
       });
    })
}




export const test = () => {
    axios.get('/apis')
}

export const combine = () => {
    axios.all([players(), player()]).then(
        axios.spread(function(acct, perms) {
             // acct perms 分别是2个请求的data
             console.log(acct)
             console.log(perms)
        })
    )
}

const players = () => axios.get('http://localhost:8000/players')

const player = () => axios.get('http://localhost:8000/players/3')

