<template>
  <div>menu</div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive, computed, watch, toRefs, unref } from 'vue'
export default {
  name: '',
  setup() {
    
    const data = reactive({})
    onMounted(() => {
      
    })
    return {
      ...toRefs(data),
    }
  },
}

</script>

<style scoped lang='scss'>
</style>