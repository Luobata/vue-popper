<template lang="pug">
.popover(ref="dialog-wrap")
    .content(ref="icon")
        slot(name="reference")
    transition(name="fade")
        pop(v-if="show" :placement="placement" ref="popper" :reference="$refs.icon" :width="type !== 'canvas' ? width : 'auto'" :offset="offset")
            .tip-dialog(:class="placement" ref="dialog" v-if="type === 'canvas'")
            .tip-dialog(:class="[placement, {'css-align': type === 'css'}]" v-else ref="dialog") {{content}}
</template>
<style src="./tip.styl" lang="stylus" scoped></style>
<script src="./tip.js"></script>
