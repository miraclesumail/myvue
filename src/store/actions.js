export default {
    async addTodo({dispatch, commit}, text){
        // return dispatch('toggleShow').then(() => {
        //     commit('addTodo', {
        //         text,
        //         time:new Date().getTime(),
        //         done:false
        //     })
        // }).then(() => {
        //     setTimeout(() => {
        //         dispatch('toggleShow')
        //     }, 1000)       
        // })

        await dispatch('toggleShow')
        // await new Promise((resolve, reject) => {resolve()}).then(() => {  console.log('wdfff')
        // commit('addTodo', {
        //     text,
        //     time:new Date().getTime(),
        //     done:false
        //    })
        // })
        await Promise.resolve({}).then(() => {
           
                commit('addTodo', {
                    text,
                    time:new Date().getTime(),
                    done:false
                })
           
        })

        setTimeout(async () => { await dispatch('toggleShow')} ,1000)
       
       // toggleShow({commit})    
    },

    
    toggleShow({commit}){
        commit('toggle')
    }  
}


const addTodo = ({dispatch, commit}) => {
     console.log('addTodo')
}

const editTodo = ({dispatch, commit}) => {
    console.log('editTodo')
}

const deleteTodo = ({dispatch, commit}) => {
    console.log('deleteTodo')
}

let obj = {addTodo, editTodo, deleteTodo}

for (const [key, value] of Object.entries(obj)) {
    obj[key] = ({dispatch, commit}) => {
        console.log('begin')
        value({dispatch, commit})
        console.log('end')
    }
}

//export default obj

