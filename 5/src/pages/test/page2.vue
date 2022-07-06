<template>
   <div>page2</div>
   <button @click="openindialog">在打开一个</button>
</template>

<script>
import { proxy } from 'epii-xx-admin'
import page2 from './page2'
export default {
   methods: {
      openindialog(){
         proxy.dialog.show(page2,{},{title:"test2",width:300});
      }
   },
}
</script>

<style>

</style>