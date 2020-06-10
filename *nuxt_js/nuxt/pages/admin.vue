<template>
    <div>
        <AdminNav />
        <nuxt-child />
    </div>
</template>

<script>
import AdminNav from '../components/AdminNav'
export default {
    mounted() {

    },
    components:{
        AdminNav
    }
}
</script>

<style scoped>
    
</style>