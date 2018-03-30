import pop from './popper.vue';
import Canvas from 'canvas-text-layout';

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
        type: {
            typs: String,
            default: 'canvas',
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
                const useCanvas = ['canvas', 'dom'];
                if (val) {
                    if (useCanvas.indexOf(this.type) !== -1) {
                        const content = new Canvas({
                            text: this.content,
                            width: this.width,
                            type: this.type,
                            fontSize: '15px',
                            lineHeight: '20px',
                            color: 'white',
                            fontFamily: 'mocrosoft yahei',
                            padding: '0px',
                            type: this.type,
                        });
                        const dialog = this.$refs['dialog'];
                        dialog.appendChild(content[this.type]);
                    }
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
