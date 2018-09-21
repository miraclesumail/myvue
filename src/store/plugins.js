const localStoragePlugin = store => {
    store.subscribe((mutation, { todos }) => {
      console.log(mutation)
      console.log(todos)
      window.localStorage.setItem('todos', JSON.stringify(todos))
    })
  }
  
  export default process.env.NODE_ENV !== 'production'
    ? [localStoragePlugin]
    : [localStoragePlugin]