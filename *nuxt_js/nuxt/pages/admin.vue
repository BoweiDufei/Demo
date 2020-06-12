<template>
    <div class="adminOutContainer">
        <AdminNav class="adminNav" />
        <div class="adminMain">

            <div class="adminCenterBlock">

                <div class="leftBlock">
                    <div @click="leftItemClick(index)" class="leftItem" v-for="(item,index) in leftList" :key="index" :class="{leftSelectedItem:index===selectNumber}">
                        {{item.title}}
                    </div>
                </div>

                <nuxt-child class="rightBlock"/>
            </div>

        </div>
    </div>
</template>

<script>
import AdminNav from '../components/AdminNav'

export default {
    components:{
        AdminNav
    },
    data() {
        return {
            tmpLeftList:['图片轮播','首页设置','文章管理','文章创作'],
            selectNumber:0,
        }
    },
    computed: {
        leftList(){
            var list = []
            for (let index = 0; index < this.tmpLeftList.length; index++) {
                const element = this.tmpLeftList[index];
                var item = {}
                item.title = element;
                item.selected = this.selectNumber==0;
                list.push(item)
            }
            return list;
        }
    },
    methods:{
        leftItemClick(value){
            this.selectNumber = value
            switch (this.selectNumber) {
                case 0: // 图片轮播图
                    {
                        this.$router.push('/admin/carousel')
                    }
                    break;
                case 1: // 首页设置
                    {
                        this.$router.push('/admin/adHome')
                    }
                    break;
                case 2: // 文章管理
                    {
                        this.$router.push('/admin/articaleManager')
                    }
                    break;
                case 3: // 文章创作
                    {
                        this.$router.push('/admin/createArticale')
                    }
                    break;
                default:
                    break;
            }
        }
    }
}
</script>

<style scoped>

.adminOutContainer{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.adminMain{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.adminCenterBlock{
    width: 1170px;
    height: 100%;
    background-color: skyblue;
    display: flex;
    font-display: row;
    justify-content: flex-start;
}

.leftBlock{
    width: 200px;
    height: 100vh;
    background-color: saddlebrown;
}
    
.leftItem{
    height: 53px;
    background-color: darkorange;
    line-height: 53px;
    text-align: center;
    cursor: pointer;
}

.leftSelectedItem{
    background-color: darkmagenta;
    color: white;
}


.rightBlock{
    background-color: darkgreen;
    width: 100%;
}


</style>