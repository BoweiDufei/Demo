<template>
    <div class="loginContainer">
        <nuxt-child />
    </div>
</template>

<script>
export default {
    mounted() {
        this.$router.push('/login/mainlogin')
    },
}
</script>

<style scoped>

.loginContainer{
    width: 100%;
    height: 100%;
}
    
</style>