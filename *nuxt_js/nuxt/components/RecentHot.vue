<template>
    <div>
        <div  class="recentHotContainer">
            <div class="hotLeft">
                <!-- 近期热点 -->
                <h3 class="hotLeftTitle">近期热点</h3>
                <p class="hotLeftContent">2019-2020中国街舞联赛(揭幕站)将于2019年12月21日至22日在厦门市思明区钢宇体育馆举行。本次比赛由国家体育总局社会体育指导中心、中国体育舞蹈联合会（CDSF）主办，厦门市体育舞蹈运动协会承办，福建省体育舞蹈运动协会支持,南京思迪飞灵体育文化有限公司、咪咕动漫有限公司运营，是2019-2020中国街舞联赛的第一站。</p>
                <p class="hotLeftContent">2019-2020中国街舞联赛(揭幕站)比赛将分为霹雳舞（Breaking）男、女组（14岁以上）、霹雳舞（Breaking）U14组（14岁以下，含14岁，2005年1月1日以后出生）、Freestyle三个项目，每个项目比赛前三名将获得丰厚的奖金。</p>
                <p class="hotLeftContent">2019-2020中国街舞联赛，届时顶级舞者组成的专业裁判组，将与大家共同见证这场高手间的巅峰对决。想要和全国各地的街舞精英同台PK，竞技比拼、切磋交流，那就快来报名挑战自我吧！</p>

            </div>

            <div class="hotRight">
                <img class="rightImg" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2550227348,24176815&fm=15&gp=0.jpg" alt="">
            </div>
        </div>

    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

.recentHotContainer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}

.hotLeft{
    flex: 1;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}
.hotLeft .hotLeftTitle {
    font-size: 30px;
    color: white;
    align-self: flex-start;
    margin-bottom: 25px;
}

.hotLeftContent{
    font-size: 20px;
    color: white;
    margin-bottom: 15px;
    text-indent: 2em;
    text-align: left;
}

.hotRight{
    flex: 1;
    margin-left: 10px;
    height: 410px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px;
    padding-right: 0px;
    box-sizing: border-box;
}

.hotRight img{
    width: 100%;
    height: 100%;
}

    
</style>