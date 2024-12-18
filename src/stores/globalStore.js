import {defineStore} from "pinia";

export const useGlobalStore = defineStore("counter", {
    state: () => ({
        refs: {
            flipAudio: null,
            drumAudio: null,
        },
        spin: {
            running: false,
        },
        category: "",
        pick: {
            index: 0
        },
        words: [],
        items: {
            style: {
                marginTop: 0
            }
        },
        frame: {
            style: {
                display: "none",
                top: 0,
                left: 0,
                width: 0,
                height: 0,
            }
        }
    }),
    actions: {
        setWords(words) {
            this.words = words;
        },
        setCategory(category) {
            this.category = category;
        },
        setPickIndex(idx) {
            this.pick.index = idx;
        },
        setFrameStyle(style) {
            this.frame.style = style;
        },
        reset() {
            this.items.style.marginTop = 0;
            this.spin.running = false;
            this.stopFlipAudio();
            this.stopDrumAudio();
        },
        setFlipAudioRef(ref) {
            this.refs.flipAudio = ref;
        },
        setDrumAudioRef(ref) {
            this.refs.drumAudio = ref;
        },
        playFlipAudio() {
            if (!this.refs.flipAudio) {
                return;
            }

            this.refs.flipAudio.play().catch();
        },
        stopFlipAudio() {
            if (!this.refs.flipAudio) {
                return;
            }

            this.refs.flipAudio.pause();
            this.refs.flipAudio.currentTime = 0;
        },
        playDrumAudio() {
            if (!this.refs.drumAudio) {
                return;
            }

            this.refs.drumAudio.play().catch();
        },
        stopDrumAudio() {
            if (!this.refs.drumAudio) {
                return;
            }

            this.refs.drumAudio.pause();
            this.refs.drumAudio.currentTime = 0;
        },
        async run() {
            const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

            const random = (min, max) => {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };

            const speed = {
                spin: 7,
                resistance: 0,
            };

            const stopCount = this.words.length + random(0, this.words.length - 1); // 멈출 숫자(+랜덤)

            const toNumber = (value) => {
                return Number.parseFloat(value.toString().replace("px", ""));
            };

            const transition = async (target) => {
                return new Promise((resolve) => {
                    const animate = async () => {
                        const sumValue = Math.max(speed.spin - speed.resistance, 1);
                        const marginTop = toNumber(this.items.style.marginTop) + sumValue;
                        this.items.style.marginTop = marginTop + "px";

                        if (marginTop < target) {
                            setTimeout(animate); // DOM 반영을 위한 처리
                        } else {
                            this.items.style.marginTop = target + "px";
                            resolve("");
                        }
                    };

                    this.spin.running && requestAnimationFrame(animate);
                });
            };

            const execute = async () => {
                await transition(toNumber(this.frame.style.height));
                this.items.style.marginTop = 0;
                this.words.unshift(this.words.pop());
            };

            this.spin.running = true;

            for (let i = 0; i < stopCount; i++) {
                speed.resistance = Math.floor(speed.spin * (i + 1) / stopCount) - 1;

                this.playFlipAudio();
                await execute();

                if (i === stopCount - 1) {
                    this.playDrumAudio();
                } else {
                    this.stopFlipAudio();
                }
            }

            this.spin.running = false;
        }
    },
});