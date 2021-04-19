class GolfController {
    constructor(players = []) {
        this.players = players;
    }

    // Create
    addPlayer(player) {
        this.players.player.push(player);
    }

    // Read
    playerForId(id) {
        if (id) {
            return this.players.find(player => player.id === id);
        }
    }

    // Update
    setScore(id, holeNumber, score) {
        const player = this.playerForId(id);
        if (player) {
            player.setScore(holeNumber, score)
        } else {
            console.log("Unable to set players score: Player was null");
        }
    }

    // Delete
    removePlayer(id) {
        if (id) {
            this.players = this.players.filter((value) => value.id != id);
        } else {
            console.log("Unable to remove player from table: ID was null");
        }
    }
}