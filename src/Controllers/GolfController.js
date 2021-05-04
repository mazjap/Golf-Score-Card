import Player from "../Models/Player"
import * as constants from "../GlobalConstants"

export default class GolfController {
    constructor(players, setPlayersAction, courseOptions, setCourseOptionsAction, course, setCourseAction) {
        this.players = players
        this.setPlayers = setPlayersAction
        this.courseOptions = courseOptions
        this.setCourseOptionsAction = setCourseOptionsAction
        this.course = course
        this.setCourseAction = setCourseAction
    }

    getMaps() {
        return this.courseOptions ?? []
    }
    
    // Create
    addPlayer(name, scores) {
        let newPlayers = this.players
        newPlayers.push(new Player(name, scores))

        this.setPlayers(newPlayers)
    }

    // Read
    playerForId(id) {
        return (id ? this.players.find(player => player.id === id) : null)
    }

    _playerIndexFor(id) {
        for (let i=0; i<(this.players ?? []).length; i++) {
            const player = this.players[i];
            if (player.id === id) {
                return i
            }
        }

        return null
    }

    // Update
    setScore(id, holeNumber, score) {
        const playerIndex = this._playerIndexFor(id)
        if (playerIndex) {
            // Copy player array & get player at playerIndex
            let modifiedPlayers = this.players
            const player = modifiedPlayers[playerIndex]

            // Copy scores and & set score at holeNumber to score parameter
            let modifiedScores = player.scores
            modifiedScores[holeNumber] = score
            
            modifiedPlayers[playerIndex] = new Player(player.displayName, player.scores, player.id)

            this.setPlayers(modifiedPlayers)
        } else {
            console.log("Unable to set players score: Player was null")
        }
    }

    // Delete
    removePlayer(id) {
        if (id) {
            this.players = this.players.filter(value => value.id !== id)
        } else {
            console.log("Unable to remove player from table: ID was null")
        }
    }

    holeCount() {
        return this.course.holeCount
    }
}