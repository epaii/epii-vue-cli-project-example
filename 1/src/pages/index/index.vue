<template>
    <div>
        
        <button @click="submit"> alert</button>
        <br>
        <a href="/#/index.html/a">show a1</a>  
       <router-view />
    </div>
</template>

<script>
	export default {
		data() {
			return {
				 
			}
		},
		onLoad() {
		 
			
		},
		methods: {
			submit(){
				 alert("alert")
			}
		}
	}
</script>
 
