class Solution extends Array {

    constructor (gen) {
        super();
        this.gen = gen;
        let solutions = this.decode(gen);

        solutions.forEach((sol) => this.push(sol));
    }

    decode (gen) {
        let sols = [];
        for(let i=0;i<8*6;i+=6) {
            let place = parseInt(gen.substring(i, i + 6), 2);
            sols.push({
                row:  place & 0b000111,
                col: (place & 0b111000) >> 3
            });
        }
        
        return sols;
    }

    encode () {
        return this.gen;
    }
    
}

Solution.render = function render (sol, evaluator) {
    let str = '| | | | | | | | |';
    let lines = [str, str, str, str, str, str, str, str];

    sol.forEach(({ row, col }) => {
        row = 7 - row;
        let l = lines[row];

        lines[row] = l.substring(0, col*2 + 1) + "Q" + l.substring(col*2 + 2);
    });

    return ` - - - - - - - -\n Fitness: ${evaluator(sol).toString().substring(0, 4)}\n - - - - - - - -\n${lines.join('\n')}\n - - - - - - - -`;
}

module.exports = Solution;