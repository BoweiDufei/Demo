<template>
    <div>
        login-home
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
    
</style>