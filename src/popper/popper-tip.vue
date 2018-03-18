<template lang="pug">
.popover(ref="dialog-wrap")
    .content(ref="icon")
        slot(name="reference")
    //transition(name="el-fade-in-linear")
    transition(name="fade")
        pop(v-if="show" :placement="placement" ref="popper" :reference="$refs.icon" :width="width" :offset="offset")
            .tip-dialog(:class="placement" ref="dialog") {{ content }}
</template>
<style src="./tip.styl" lang="stylus" scoped></style>
<script src="./tip.js"></script>
