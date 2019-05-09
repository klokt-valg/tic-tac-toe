const Vue = require('vue')
const _ = require('lodash')
const Elastic = require('gsap').Elastic

const store = require('./store/store')
const block = require('./components/block')
const computer = require('./ai/computer')

module.exports = new Vue({
    name: 'app',

    el: '#app',

    data() {
        return store.state
    },

    components: {
        block
    },

    computed: {
        ended() {
            return this.wins || this.draw;
        }
    },

    methods: {
        select(index) {
            const {
                figure
            } = this.grid[index]

            if (figure > -1) {
                return;
            }

            store.selectAction(index);
            if(!store.checkWinnerAction()) {
                if(this.myTurn == computer.myTurn) {
                    setTimeout(() => {
                        store.doComputerMoveAction();
                    }, 10);
                }
            }
        },

        restart() {
            store.resetAction();
        },

        enter(el, done) {
            TweenMax.from(el, 1, {
                autoAlpha: 0,
                scale: 0,
                ease: Elastic.easeOut.config(1.25, 0.5)
            })
        },

        enterWin(el) {
            TweenMax.from(el, 1, {
                autoAlpha: 0,
                scale: 0,
                ease: Elastic.easeOut.config(1.25, 0.5)
            })
        }
    }
})