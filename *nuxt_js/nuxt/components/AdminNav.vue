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
                </div>

                <!-- 1.3右侧内容 -->
                <div class="rightBlock">
                    <div class="logOut" @click="logOutBtnClick">
                        退出
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        const token = localStorage.getItem("token");
    },
    data() {
        return {

        }
    },
    methods: {
        logOutBtnClick(){
            this.$confirm('您是否确定退出当前系统?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                localStorage.setItem("token","")
                this.$router.push('/home')
            }).catch(() => {

            });
        },
        iconTapMethod(){
            this.$router.push('/home')
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
  background-color: red;
}

.pcHeader .rightBlock{
  width: 100px;
  height: 53px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.rightBlock .logOut{
  width: 85px;
  height: 35px;
  border-radius: 17.5px;
  line-height: 35px;
  border: brown 1px solid;
  color: brown;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
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