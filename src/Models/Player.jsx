// import { Component } from "react"
import { createUUID } from "../GlobalConstants"

class Player {
    constructor(displayName = null, scores = [], id = null) {
        this.scores = scores
        this.id = id ?? createUUID()
        this.displayName = displayName ?? Player.generateName()
    }

    static firstNames = ["Liam", "Noah", "Oliver", "Elijah", "William", "James", "Benjamin", "Lucas", "Steve", "Dave", "Austin", "Josh", "Tyler", "Sam", "Tony", "Phil", "Jessica"]
    static lastNames = ["AwesomeDude", "Jefferson", "Washington", "Timinson", "GolfGuy", "Smith", "Chase"]

    static generateName() {
        const firstNamesLength = Player.firstNames.length
        const lastNamesLength = Player.lastNames.length
        
        const firstname = Player.firstNames[Math.floor(Math.random() * firstNamesLength)]
        const lastname = Player.lastNames[Math.floor(Math.random() * lastNamesLength)]

        return firstname + " " + lastname
    }
}

export default Player