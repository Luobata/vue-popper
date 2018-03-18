import pop from './popper.vue';
export default {
    name: 'popper',
    components: {
        pop,
    },
    props: {
        placement: {
            type: String,
            default: 'top',
        },
        offset: {
            type: String,
            default: '0px',
        },
        content: {
            type: String,
            default: '',
        },
        trigger: {
            type: String,
            default: 'hover',
        },
        width: {
            type: String,
        },
    },
    data() {
        return {
            show: false,
            reference: '',
        };
    },
    methods: {
        hoverEnter() {
            this.show = true;
        },
        hoverLeave() {
            this.show = false;
        },
    },
    watch: {
        show(val) {
            this.$nextTick(() => {
                if (val) {
                    this.$refs['popper'].update();
                }
            });
        },
    },
    mounted() {
        this.reference = this.$slots.reference[0].elm;

        if (this.trigger === 'hover') {
            this.reference.addEventListener('mouseenter', this.hoverEnter);
            this.reference.addEventListener('mouseleave', this.hoverLeave);
        }
    },
    destroy() {
        if (this.trigger === 'hover') {
            this.reference.removeEventListener('mouseenter', this.hoverEnter);
            this.reference.removeEventListener('mouseleave', this.hoverLeave);
        }
    },
};