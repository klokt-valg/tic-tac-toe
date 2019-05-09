
function simulateSelect(index, myTurn, cgrid) {
    const wins = ['012', '036', '345', '147', '258', '678', '048', '246']
    const player = myTurn ? 0 : 1
    const grid = _.cloneDeep(cgrid)
    grid[index].figure = myTurn ? 0 : 1

    const moves = _.reduce(grid, (result, value, index) => {
        if (value.figure === player) {
            result.push(index)
        }
        return result
    }, [])

    // find possible winning pattern
    var score = _.max(
        wins.map(win => {
            return _.map(win.split(''), n => parseInt(n))
        }).filter(wincomb => {
            return wincomb.indexOf(index) >= 0
        }).map(wincomb => {
            const diff = _.difference(wincomb, moves);
            const invalid = diff.find(d => grid[d] >= 0);
            return invalid ? 0 : 3 - diff.length;
        })
    )
    return score
}

module.exports = {
    myTurn: true,
    debug: false,

    nextSelect(grid) {
        /**
         * Return the next select index 0~8
         */
         // find out where we can select next
        var ss = grid.filter(function(v) {
            return v.figure < 0;
        }).map(function(v) {
            var myScore = simulateSelect(v.index, this.myTurn, grid)
            var enemyScore = simulateSelect(v.index, !this.myTurn, grid)
            if(this.debug) {
                console.log('simulateSelect myTurn', v.index, myScore)
                console.log('simulateSelect enemyTurn', v.index, enemyScore)
            }
            var score
            if(myScore == 3)
                score = 100
            else if(enemyScore == 3)
                score = 4
            else
                score = myScore

            return {
                index: v.index,
                score: score,
            };
        });

        // select with max score
        var max_s = _.maxBy(ss, s => s.score);

        // return max scored select
        if(max_s != null)
            return max_s.index;
        else
            return -1;
    }
    
}