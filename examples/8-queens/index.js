let Algorithm = require('../..');
let Solution = require('./solution');

let Challenge8Queens = new Algorithm({

    random (run) {
        return new Solution(Math.floor(Math.random() * 2**(49-1)).toString(2).padStart(48, '0'));
    },

    fitness (solution) {
        let score = 1;
        let failure_score = 1/54;

        for(let i=0;i<8;i++) {
            let { row, col } = solution[i];

            for(let j=0;j<8;j++) {
                if(j === i) continue;
                let { row: _row, col: _col } = solution[j];

                if(row === _row && col === _col) return 0;

                if(
                    row === _row ||
                    col === _col ||
                    (row - col) === (_row - _col) ||
                    (row + col) === (_row + _col)
                ) score -= failure_score; 
            }
        }
        if(score < 0) score = 0;
        
        return score ** 2;
    },

    breed (a, b, run) {
        let gen_a = a.encode();
        let gen_b = b.encode();
        let gen_c = "";
        
        for(let i=0;i<48;i++) {
            let g = Math.random() > .5? gen_a[i] : gen_b[i];
            
            if(Math.random() < run.mutation_rate) g = +g? 0 : 1;
    
            gen_c += g;
        }
    
        return new Solution(gen_c, run.mutation_rate);
    }

});

let run = Challenge8Queens.run({
    mutation_rate: 0.01,
    population_size: 100
});

console.log(Solution.render(run.start(), Challenge8Queens.fitness));