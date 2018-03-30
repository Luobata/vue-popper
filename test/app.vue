<template lang="pug">
    .test
        popper.over(
            placement="top"
            trigger="hover"
            offset="0, 5px"
            width="110px"
            content="接通率=（未回应+已回应的线索量）÷（未接通+未回应+已回应的>线索量)")
            div.test-rectangular(slot="reference") 通过canvas来绘制
        popper.over(
            placement="top"
            trigger="hover"
            offset="0, 5px"
            width="110px"
            type="css"
            content="接通率=（未回应+已回应的线索量）÷（未接通+未回应+已回应的>线索量)")
            div.test-rectangular(slot="reference") 通过css属性
        popper.over(
            placement="top"
            trigger="hover"
            offset="0, 5px"
            width="110px"
            type="dom"
            content="接通率=（未回应+已回应的线索量）÷（未接通+未回应+已回应的>线索量)")
            div.test-rectangular(slot="reference") 通过dom计算
</template>
<style scoped lang="stylus">
    .test
        margin 200px
    .test-rectangular
        display inline-block
        margin 0 20px
        padding 20px
        background black
        color white
        cursor pointer
</style>
<script>
    export default {
        methods: {
        }
    };
</script>
