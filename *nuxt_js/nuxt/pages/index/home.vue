<template>
    <div>
       <div class="tmpPadding"></div>
       <Swapper/>
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
    components:{
        Swapper,
        RecentHot,
        GamePice
    }
}
</script>

<style scoped>
.tmpPadding{
    height: 40px;
}
</style>