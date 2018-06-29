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
            } else if (typeof this.show === 'string') {
                return this.computedString();
            }
        },
        judgeLength() {
            const rect = this.lengthElm.getBoundingClientRect();
            console.log(rect);

            return rect.width > this.show;
        },
        computedString() {
            // 运算符+ - * /
            // 表达式 (number)% (number)px
            const refRec = this.reference.getBoundingClientRect();
            const lenRec = this.lengthElm.getBoundingClientRect();
            const width = refRec.width;
            const str = this.show.replace(/px/g, '').replace(/(\d+)%/g, val => {
                return (parseFloat(val) * width) / 100;
            });
            const maxWidth = new Function(`return ${str}`)();
            console.log(maxWidth);

            return lenRec.width > maxWidth;
        },
        findSlot(ref, key) {
            const next = [];
            if (ref.children && ref.children.length) {
                for (let i = 0; i < ref.children.length; i++) {
                    const item = ref.children[i];
                    if (item.data && item.data.slot === key) {
                        return item;
                    } else if (item.children && item.children.length) {
                        next.push(item);
                    }
                }
                for (let i = 0; i < next.length; i++) {
                    const tmp = this.findSlot(next[i], key);
                    if (tmp) {
                        return tmp;
                    }
                }
            }

            return null;
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

        if (typeof this.show === 'number' || typeof this.show === 'string') {
            // const length = this.reference.querySelector('.length');
            const length = this.findSlot(this.$slots.reference[0], 'length');
            if (length) {
                console.log(length);
                this.lengthElm = length.elm;
            } else {
                this.lengthElm = this.reference;
            }

            // this.lengthEve = throttle(50, () => {
            //     // get length to judge if show
            //     // this.judgeLength();
            // });

            // addResizeListener(this.lengthElm, this.lengthEve);
        }
    },
    destroy() {
        if (this.trigger === 'hover') {
            this.reference.removeEventListener('mouseenter', this.hoverEnter);
            this.reference.removeEventListener('mouseleave', this.hoverLeave);
        }
        // if (this.lengthEve) {
        //     removeEventListener(this.lengthElm, this.lengthEve);
        // }
    },
};
