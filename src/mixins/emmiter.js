function broadcast(component_name, event_name, params){
    this.$children.forEach(child => {
         if(child.$options.name == component_name){
             child.$emit.apply(child, event_name.concat(params))
         }else{
             broadcast.apply(child, [componentName, eventName].concat([params]));
         }
    })
}

export default {
    methods:{
        dispatch(component_name, event_name, params){
            let parent = this.$parent || this.$root
            let name = parent.$options.name

            while(parent && (!name || component_name != name)){
                  parent = parent.$parent
                  name = parent.$options.name
            }

            parent.$emit.apply(parent, [event_name].concat(params))
        },

        broadcast(component_name, event_name, params){
            broadcast.call(this, component_name, event_name, params)
        }
    }

}