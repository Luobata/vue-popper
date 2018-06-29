<template lang="pug">
.test-wrap
    .test
        popper.over(
            placement="top"
            trigger="hover"
            offset="0, 5px"
            width="110px"
            :show="false"
            content="接通率=（未回应+已回应的线索量）÷（未接通+未回应+已回应的>线索量)")
            div.test-rectangular(slot="reference") 通过canvas来绘制
        popper.over(
            placement="top"
            trigger="hover"
            offset="0, 5px"
            width="110px"
            type="css"
            :show="canshow"
            content="接通率=（未回应+已回应的线索量）÷（未接通+未回应+已回应的>线索量)")
            div.test-rectangular(slot="reference") 通过css属性
        popper.over(
            placement="top"
            trigger="hover"
            offset="0, 5px"
            width="110px"
            type="dom"
            :show="100"
            content="接通率=（未回应+已回应的线索量）÷（未接通+未回应+已回应的>线索量)")
            div.test-rectangular(slot="reference") 通过dom计算
    .test
        popper.over(
            placement="top"
            trigger="hover"
            offset="0, 5px"
            width="110px"
            type="dom"
            :show="60"
            content="接通率=（未回应+已回应的线索量）÷（未接通+未回应+已回应的>线索量)")
            div.test-rectangular.number(slot="reference")
                .text(slot="length") 测试number
                // .text(slot="length") 测
        popper.over(
            placement="top"
            trigger="hover"
            offset="0, 5px"
            width="110px"
            type="dom"
            show="20% + 5% - 10px + 20px"
            content="接通率=（未回应+已回应的线索量）÷（未接通+未回应+已回应的>线索量)")
            .test-rectangular.number(slot="reference")
                .text(slot="length") 测试number
                // .text.length() 测
</template>
<style scoped lang="stylus">
.ellipsis
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
.test
    margin 200px 0 0 100px
.test-rectangular
    display inline-block
    margin 0 20px
    padding 20px
    background black
    color white
    cursor pointer
    &.number
        box-sizing border-box
        .text
            @extend .ellipsis
            max-width 60px
            // max-width calc(100% - 40px)
</style>
<script>
let a = 1;
export default {
    methods: {
        canshow() {
            return a++ % 2 === 0;
        },
    },
};
</script>
