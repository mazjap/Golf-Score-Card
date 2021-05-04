// import { Component } from "react"
import { createUUID } from "../GlobalConstants"

class Player{
    constructor(displayName, scores, id) {
        // displayName = Player.generateName(), scores = [], holeCount = 9, id = null
        this.displayName = displayName ?? Player.generateName();
        this.id = id ?? createUUID()
        this.scores = scores
    }

    getTotal() {
        return this.scores.reduce((acc, val) => { 
            if (val) { 
                return acc + val 
            }
        });
    }

    static firstNames = ["Steve", "Dave", "Austin", "Josh", "Tyler"];
    static lastNames = ["AwesomeDude", "Jefferson", "Washington", "Timinson", "CoolGuy"];

    static generateName() {
        const firstNamesLength = Player.firstNames.length;
        const lastNamesLength = Player.lastNames.length;

        const firstname = Player.firstNames[Math.floor(Math.random) * firstNamesLength];
        const lastname = Player.lastNames[Math.floor(Math.random) * lastNamesLength];

        return firstname + " " + lastname;
    }
}

export default Player;