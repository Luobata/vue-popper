<template lang="pug">
    .poper(:style="{'width':width}")
        slot
</template>
<style lang="stylus" scoped>
    .crm-poper
        z-index 10000
</style>
<script>
    import Popper from 'popper.js';
    export default {
        name: 'pop',
        props: {
            width: {
                type: String,
            },
            reference: {
            },
            placement: {
                type: String,
                default: 'bottom-start',
            },
            offset: {
                type: String,
                default: '0px',
            },
        },
        data() {
            return {
                popper: null,
            };
        },
        methods: {
            update() {
                if (this.popper) {
                    this.popper.update();
                } else {
                    this.popper = new Popper(
                        this.reference,
                        this.$el,
                        {
                            placement: this.placement,
                            modifiers: {
                                offset: {
                                    enabled: true,
                                    offset: this.offset,
                                },
                                computeStyle: {
                                    gpuAcceleration: false,
                                },
                                preventOverflow: {
                                    padding: 0,
                                    boundariesElement: 'viewport',
                                },
                            },
                        }
                    );
                }
            },
            destroy() {
                if (this.popper) {
                    this.popper.destroy();
                    this.popper = null;
                }
            },
        },
        mounted() {
            // 将popper append到body上
            document.body.appendChild(this.$el);
        },
        beforeDestroy() {
            if (this.popper) {
                this.popper.destroy();
            }
            this.$el.remove();
        },
    };
</script>
