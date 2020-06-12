<template>
    <div>
        <button @click="clickMeMethod">点我</button>
    </div>
</template>


<script>
export default {
    methods:{
        clickMeMethod(){
            console.log('--- clickMeMethod --- ');
            var paramObj = {}
            this.$server.exam(paramObj).then(data => {
                console.log(data)
            }).catch(err)
        }
    }
}
</script>

<style scoped>
    
</style>