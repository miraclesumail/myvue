<template>
     <div class="game_list"> 
          <slot> 
              <div>this is slot</div>
          </slot>

          <slot name="slota"> 
              <div>this is slot a</div>
          </slot>

          <slot name="slotb"> 
              <div>this is slot b</div>
          </slot>

          
     </div>   
</template>
<script>
    export default {
        name: 'game_list',
      
    }
</script>

<style scoped>
 


</style>