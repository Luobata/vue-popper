import pop from './popper.vue';
import Canvas from 'canvas-text-layout';
import { addResizeListener, removeResizeListener } from './resize-event';
import throttle from 'throttle-debounce/throttle';

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
        show: {
            type: Boolean | Function | Number,
            default: true,
        },
    },
    data() {
        return {
            display: false,
            showover: false,
            reference: '',
            lengthElm: '',
            lengthEve: '',
        };
    },
    methods: {
        hoverEnter() {
            this.display = true;
        },
        hoverLeave() {
            this.display = false;
        },
        canShow() {
            if (typeof this.show === 'boolean') {
                return this.show;
            } else if (typeof this.show === 'function') {
                return this.show();
            } else if (typeof this.show === 'number') {
                // number 需要判断长度
                return this.judgeLength();
            }
        },
        judgeLength() {
            const rect = this.lengthElm.getBoundingClientRect();
            console.log(rect);

            return rect.width > this.show;
        },
    },
    watch: {
        display(val) {
            this.$nextTick(() => {
                const useCanvas = ['canvas', 'dom'];
                if (val && this.canShow()) {
                    this.showover = true;
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
                        this.$nextTick(() => {
                            const dialog = this.$refs['dialog'];
                            dialog.appendChild(content[this.type]);
                            this.$refs['popper'].update();
                        });
                    } else {
                        this.$nextTick(() => {
                            this.$refs['popper'].update();
                        });
                    }
                } else {
                    this.showover = false;
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

        if (typeof this.show === 'number') {
            const length = this.$slots.length;
            if (length) {
                this.lengthElm = this.$slots.length[0].elm;
            } else {
                this.lengthElm = this.reference;
            }

            this.lengthEve = throttle(50, () => {
                // get length to judge if show
                // this.judgeLength();
            });

            addResizeListener(this.lengthElm, this.lengthEve);
        }
    },
    destroy() {
        if (this.trigger === 'hover') {
            this.reference.removeEventListener('mouseenter', this.hoverEnter);
            this.reference.removeEventListener('mouseleave', this.hoverLeave);
        }
        if (this.lengthEve) {
            removeEventListener(this.lengthElm, this.lengthEve);
        }
    },
};
