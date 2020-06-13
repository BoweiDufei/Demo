<template>
    <div class="loginContainer">
        <nuxt-child />
    </div>
</template>

<script>
export default {
    mounted() {
        const token = localStorage.getItem("token")
        console.log(`token = ${token}`)
        if(token != null && token.length > 0){
            console.log('登录成功啦')
            this.$router.push('/admin/carousel');
        }else{
            this.$router.push('/login/mainlogin');
        }
    },
}
</script>

<style scoped>

.loginContainer{
    width: 100%;
    height: 100%;
}
    
</style>