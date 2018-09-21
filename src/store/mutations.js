export default {
    addTodo(state, todo){
        state.todos.push(todo)
        // setTimeout(() => {
        //    this.toggle(state)
        // }, 1000)
    },

    toggle(state){
        state.showLoading = !state.showLoading
    },

    setUser(state, user){
        console.log('seruser')
        console.log(user)
        state.user = user
    },

    setType(state, types){
        state.types = types
    }
}