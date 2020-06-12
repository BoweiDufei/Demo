<template>
    <div class="topBgContainer">
        <div class="headerBack">
            <!--1, 顶部区域 -->
            <div class="pcHeader">

            <!-- 1.1店标 -->
            <div class="shopIcon" @click="iconTapMethod">
                <img src="http://www.hiphopcn.com.cn/static/img/Hip-hop-logo.png" alt="">
            </div>
            <!-- 1.2中间内容 -->
            <div class="middleBlock">

                <ul class="middle-items-block">
                    <li class="element-item" :class="{elementItemSelected: selectedNumber==0}"><a href="#" @click="itemClick(0)">首页</a></li>
                    <li class="element-item" :class="{elementItemSelected: selectedNumber==1}"><a href="#" @click="itemClick(1)">视频</a></li>
                    <li class="element-item" :class="{elementItemSelected: selectedNumber==2}"><a href="#" @click="itemClick(2)">咨询</a></li>
                    <li class="element-item" :class="{elementItemSelected: selectedNumber==3}"><a href="#" @click="itemClick(3)">赛事</a></li>
                    <li class="element-item" :class="{elementItemSelected: selectedNumber==4}"><a href="#" @click="itemClick(4)">关于青春派</a></li>
                </ul>

            </div>

            <!-- 1.3右侧内容 -->
            <div class="rightBlock">
                <div class="login" @click="loginBtnClick" v-if="!loginFlag">
                    登录
                </div>
                <div class="manager"  @click="managerBtnClick" v-if="loginFlag">管理</div>
            </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        const token = localStorage.getItem("token");
        if (token != null && token.length> 0){
            // 登录成功
            this.loginFlag = true
        }else{
            this.loginFlag = false
        }
    },
    name:'TopNav',
    data() {
        return {
            selectedNumber: 0,
            loginFlag : false,
        }
    },
    props:{
        topElementClick:Function
    },
    methods: {
        itemClick(index){
            this.selectedNumber = index;
            this.topElementClick(this.selectedNumber);
        },
        iconTapMethod(){
            this.selectedNumber = 0;
            this.topElementClick(this.selectedNumber);
        },
        loginBtnClick(){
            this.$router.push('/login/mainlogin')
        },
        managerBtnClick(){
            this.$router.push('/admin/home')
        }
    },
}
</script>

<style scoped>

.topBgContainer{
    width: 100%;
    height: 53px;
    background-color:rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.headerBack{
  width: 100%;
  height: 53px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.pcHeader{
  width: 1170px;
  height: 53px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.pcHeader .shopIcon{
  width: 114px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.pcHeader .shopIcon img{
  width: 100px;
  height: 40px;
}
.pcHeader .middleBlock{
  flex: 1;
  height: 53px;
  box-sizing: border-box;
  padding: 0px 200px;
}

.pcHeader .rightBlock{
  width: 100px;
  height: 53px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.rightBlock .login, .manager{
  width: 85px;
  height: 35px;
  border-radius: 17.5px;
  line-height: 35px;
  border: brown 1px solid;
  color: brown;
  cursor: pointer;
}


/* 元素布局 */
.middle-items-block{
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.element-item{
    line-height: 53px;
    color: white;
}
.element-item a {
    display: block;
    min-width: 80px;
    height: 53px;
    color: white;
    text-decoration-line: none;
}
.elementItemSelected a{
    color: red;
}
.element-item a:hover{
    color: red;
}

    
</style>