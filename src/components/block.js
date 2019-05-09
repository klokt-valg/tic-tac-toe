const Vue = require('vue');
const TweenMax = require('gsap').TweenMax;
const Elastic = require('gsap').Elastic;

module.exports = Vue.component('block', {
    name: 'block',

    template: `
        <div class="block">
            <transition v-on:enter="enter" v-bind:css="false">
                <span v-show="figure > -1">{{ fig }}</span>
            </transition>
        </div>
    `,

    props: {
        figure: {
            type: Number,
            default: -1
        }
    },

    computed: {
        fig() {
            return this.figure === 0 ? 'O' : 'X'
        }
    },

    data() {
        return {
            selected: false
        }
    },

    methods: {
        enter(el, done) {
            TweenMax.from(el, 1, {
                autoAlpha: 0,
                scale: 0,
                ease: Elastic.easeOut.config(1.25, 0.5),
                onComplete: done
            })
        }
    }
})