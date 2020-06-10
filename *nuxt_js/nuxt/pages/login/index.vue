<template>
    <div>
    </div>
</template>

<script>
export default {
    mounted() {
        const token = localStorage.getItem("token")
        console.log(token)
        if(token.length > 0){
            console.log('登录成功啦')
            this.$router.push('/admin/home');
        }else{
            this.$router.push('/login/mainlogin');
        }
    },
}
</script>