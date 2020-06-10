<template>
    <div class="registryMainContainer">
        <div class="registryWindow">
            <div class="registryTopNav">
                注册
            </div>
            <div class="registryContent">
                <el-input class="elementInput" v-model="account" placeholder="请输入账号"></el-input>
                <el-input class="elementInput" v-model="psd" placeholder="请输入密码" show-password></el-input>
                <el-input class="elementInput" v-model="repsd" placeholder="请再次输入密码" show-password></el-input>
                <el-button class="elementregistry" type="primary" @click="registryBtnClick">注册</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    mounted() {
        
    },
    data() {
        return {
            account:'',
            psd:'',
            repsd:''
        }
    },
    methods: {
        async registryBtnClick(){
            console.log(this.account)
            if(this.account.length < 6){
                this.$notify({
                    title: '提示',
                    message: '请输入账号',
                    duration: 1500
                });
                return
            }
            if(this.psd.length < 6){
                this.$notify({
                    title: '提示',
                    message: '请输入密码',
                    duration: 1500
                });
                return;
            }
            if(this.psd !== this.repsd){
                this.$notify({
                    title: '提示',
                    message: '请保证两次密码一致',
                    duration: 1500
                });
                return
            }
            const randName = 'qcp'+Math.floor(Math.random()*1000000);
            let data = {"mobile":this.account,"password":this.psd,"realName":randName};
            axios.post('http://localhost:7001/api/createUser',data).then(result=>{
                console.log(result)
                const d = result.data
                console.log(d)
                if(d.code === 0){
                    const target = d.data
                    console.log(target)
                    // 获取到token，存储本地
                    if(target){
                        console.log('token')
                        console.log(target.token)
                        localStorage.setItem("token", target.token);
                        localStorage.setItem("userinfo", target.userinfo);
                        console.log('userinfo')
                        console.log(target.userinfo)
                        
                        this.$notify({
                            title: '提示',
                            message: '注册成功',
                            duration: 2000
                        });
                        this.$router.push('/login')
                    }
                }else{
                    const msg = d.error;
                    this.$notify({
                        title: '提示',
                        message: msg,
                        duration: 2000
                    });
                }
            })
        }
    },
}
</script>

<style scolped>
    .registryMainContainer{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    .registryWindow{
        width: 428px;
        height: 430px;
        background-color: rgb(250, 250, 250);
        margin-top: 10vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        border-radius: 12px;
    }
    .registryWindow .registryTopNav{
        height: 117px;
        width: 100%;
        background-color:rgb(89, 93, 172);
        line-height: 117px;
        font-size: 30px;
        color: seashell;
        display: flex;
        flex-direction: row;
        justify-content: center;
        border-radius: 12px 12px 0px 0px;
    }
    .registryContent{
        padding: 20px;
        box-sizing: border-box;
    }
    .elementInput{
        margin-top: 20px;
    }
    .elementregistry{
        width: 100%;
        margin-top: 40px;
    }
    .registryDiv{
        padding: 20px;
        padding-top: 0px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
</style>