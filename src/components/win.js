const Vue = require('vue');
const store = require('../store/store');

module.exports = Vue.component('win', {
    name: 'win',

    data() {
        return store.state
    },

    template: `
        <div class="win">
            <h2 v-show="wins">{{winner}} Wins</h2>
            <h2 v-show="draw">It's a Draw</h2>
            <button @click="clickHandler">Play again</button>
        </div>
    `,

    props: {
        clickHandler: {
            type: Function,
            default: null
        }
    },

    computed: {
        winner() {
            return this.myTurn ? 'P1' : 'P2';
        }
    }
})