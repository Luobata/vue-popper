<template lang="pug">
    .test
        popper.over(
            placement="top"
            trigger="hover"
            offset="0, 5px"
            width="110px"
            content="接通率=（未回应+已回应的线索量）÷（未接通+未回应+已回应的>线索量)")
            div.test-rectangular(slot="reference")
</template>
<style scoped lang="stylus">
    .test
        margin 100px
    .test-rectangular
        width 100px
        height 100px
        background red
        cursor pointer
</style>
<script>
    export default {
        methods: {
        }
    };
</script>
