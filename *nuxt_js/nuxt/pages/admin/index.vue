<template>
    <div class="homeOutContainer">
        <div class="homeCenterBlock">
            <div class="leftBlock">
            </div>

            <div class="rightBlock">
                <nuxt-child />
            </div>
        </div>
    </div>
</template>


<script>
</script>

<style scoped>

.homeOutContainer{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.homeCenterBlock{
    width: 1170px;
    height: 100vh;
    background-color:darkcyan;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
}

.leftBlock{
    background-color: darkgoldenrod;
    width: 300px;
}

</style>