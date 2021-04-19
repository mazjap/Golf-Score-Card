class Player extends Identifiable {
    constructor(displayName, scores = [], holeCount = 9, id = null) {
        super(id);
        this.displayName = displayName;
        
        // Pad scores to make array length equal to holeCount
        // Array contains a static `from` method which accepts any iterable type (Set, string, map, etc.)
        // Using an object we can specify an array and the desired length. `Array.from` does the rest.
        // {...[5, 10], length: 5} => [5, 10, undefined, undefined, undefined]
        this.scores = Array.from({
            ...scores, 
            length: holeCount
        });
    }

    setScore(holeNumber, score) {
        if (holeNumber < this.scores.length) {
            this.scores[holeNumber] = score;
        } else {
            console.log(`Unable to set score (${score}) for hole number ${holeNumber}. The defined range is 0...${this.scores.length} inclusive. Anything outside of this range is an error.`)
        }
    }

    getTotal() {
        return this.scores.reduce(acc => acc);
    }
}