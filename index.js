class Algorithm {

    constructor (options) {
        for(let i in options)
            this[i] = options[i];
    }

    run (params) {
        return new Run(this, params);
    }

}

class Run {

    constructor (algorithm, params) {
        let { population_size, mutation_rate } = params;
        
        this.algorithm = algorithm;
        this.population_size = population_size || 100;
        this.mutation_rate = mutation_rate || 0.01;
        this.generation = params.generation || [];

        this.run = 0;

        this.initialize();
    }

    initialize () {
        let { generation, population_size, algorithm } = this;

        if(!generation.length)
            for(let i=0;i<population_size;i++)
                generation.push(algorithm.random(this));
    }

    start () {
        let solution = this.round();

        if(!solution) return this.start();

        return solution;
    }

    round () {
        let { mutation_rate, population_size, generation, algorithm } = this;
        let fitness = [];
        let total_fitness = 0;
        let next_generation = [];

        for(let i=0, sol;sol=generation[i++];) {
            let fit = algorithm.fitness(sol, this);
            fitness.push(fit);
            total_fitness += fit;

            if(fit === 1) return sol;
        }


        for(let i=0;i<population_size;i++) {

            let male = null;
            let female = null;

            let male_gap = Math.random() * total_fitness;
            let female_gap = Math.random() * total_fitness;

            // Choose male and female
            while(!male || !female) {
                
                if(male_gap > 0) {
                    let pos;
                    do {
                        pos = Math.floor(Math.random() * population_size);
                    } while(generation[pos] === female);

                    let fit = fitness[pos];
                    male_gap -= fit;

                    if(male_gap <= 0) male = generation[pos];
                }

                if(female_gap > 0) {
                    let pos;
                    do {
                        pos = Math.floor(Math.random() * population_size);
                    } while(generation[pos] === male);

                    let fit = fitness[pos];
                    female_gap -= fit;

                    if(female_gap <= 0) female = generation[pos];
                }

            }

            next_generation.push(algorithm.breed(male, female, this));
        }

        this.generation = next_generation;
    }
}

module.exports = Algorithm;