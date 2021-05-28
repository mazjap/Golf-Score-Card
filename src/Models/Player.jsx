// import { Component } from "react"
import { createUUID } from "../GlobalConstants"

class Player {
    constructor(displayName = null, scores = [], id = null) {
        this.scores = scores
        this.id = id ?? createUUID()
        this.displayName = displayName ?? Player.generateName()
    }

    static firstNames = ["Steve", "Dave", "Austin", "Josh", "Tyler"]
    static lastNames = ["AwesomeDude", "Jefferson", "Washington", "Timinson", "GolfGuy"]

    static generateName() {
        const firstNamesLength = Player.firstNames.length
        const lastNamesLength = Player.lastNames.length
        
        const firstname = Player.firstNames[Math.floor(Math.random() * firstNamesLength)]
        const lastname = Player.lastNames[Math.floor(Math.random() * lastNamesLength)]

        return firstname + " " + lastname
    }
}

export default Player