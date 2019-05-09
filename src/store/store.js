const _ = require('lodash')
const computer = require('../ai/computer')

module.exports = {
    debug: false,
    state: {
        grid: _.map(_.range(0, 9), (index) => {
            return {
                index,
                figure: -1
            }
        }),
        myTurn: false,
        tilesLeft: 9,
        wins: false,
        draw: false,
    },
    resetAction() {
        if(this.debug) {
            console.log("resetStateAction triggered");
        }
        this.state.grid = _.map(_.range(0, 9), (index) => {
            return {
                index,
                figure: -1
            }
        });
        this.state.myTurn = false;
        this.state.tilesLeft = 9;
        this.state.wins = false;
        this.state.draw = false;
    },

    selectAction(index) {
        this.state.grid[index].figure = this.state.myTurn ? 1 : 0
        this.state.myTurn = !this.state.myTurn
        this.state.tilesLeft--;
    },

    checkWinnerAction() {
        if(this.debug) {
            console.log("checkWinnerAction triggered");
        }

        const wins = ['012', '036', '345', '147', '258', '678', '048', '246']
        const player = this.state.myTurn ? 0 : 1

        const moves = _.reduce(this.state.grid, (result, value, index) => {
            if (value.figure === player) {
                result.push(index)
            }

            return result
        }, [])

        this.state.wins = !!_.find(wins, win => {
            const combination = _.map(win.split(''), n => parseInt(n));

            return _.difference(combination, moves).length === 0;
        })
        this.state.draw = (!this.state.wins && this.state.tilesLeft <= 0)

        return this.state.wins || this.state.draw
    },

    doComputerMoveAction() {
        const cs = computer.nextSelect(this.state.grid)
        this.selectAction(cs)
        this.checkWinnerAction()
    }
}