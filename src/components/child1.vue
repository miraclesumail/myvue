<template>
    <div> 
        child1
    </div>
</template>

<script>
    export default {
        name:"child1",
        mounted () {
            this.$eventBus.$on('wtf', function (payLoad) {
                console.log(payLoad)
            });
        },

      
    }
</script>