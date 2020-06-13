<template>
    <div>
       <div class="tmpPadding"></div>
       <Swapper :list="pics" />
       <div class="tmpPadding"></div>
       <RecentHot/>
       <div class="tmpPadding"></div>
       <GamePice/>
    </div>
</template>

<script>
import Swapper from '../../components/Swapper'
import RecentHot from '../../components/RecentHot'
import GamePice from '../../components/GamePice'
export default {
    data() {
        return {
            pics:[]
        }
    },
    components:{
        Swapper,
        RecentHot,
        GamePice
    },
    async mounted() {
        const result = await this.$server.getCarousels()
        this.pics = result.data
        console.log(`data = ${this.pics}`)
    },
}
</script>

<style scoped>
.tmpPadding{
    height: 40px;
}
</style>