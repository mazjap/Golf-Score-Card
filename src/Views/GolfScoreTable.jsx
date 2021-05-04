import React, { Component, useState } from "react";
import Player from "../Models/Player"
import GolfController from "../Controllers/GolfController.js";

export default function GolfScoreTable(props) {
    let golfController = props.golfController

    golfController.addPlayer("Jordan", [1, 5, 3])

    let headers = [<th className="tg-0lax">{"Name"}</th>];

    for (let i=1; i<=golfController.holeCount; i++) {
        headers.push(<th className="tg-0lax">{i ? "Hole #" + i : ""}</th>)
    }

    headers.push(<th className="tg-0lax">{"Total"}</th>)

    let scoresRow = []
    let playerScores = golfController.players.map(player => {
        scoresRow.push([<td>{player.displayName}</td>, ...player.scores.map((score, index) => <td key={index + (score != undefined ? " " + score : "")}>{score != undefined ? score : ""}</td>)])

        let items = [];
        for (let i=0; i<golfController.corse?.holes.length ?? i; i++) {
            items.push(<td>{player.scores[i] ?? ""}</td>)
        }

        return <tr>{items}</tr>
    })
    
    return (
        <table className="tg">
            <thead>
                <tr>
                    { headers }
                </tr>
            </thead>
            <tbody>
                { playerScores }
            </tbody>
        </table>
    )
}

// export default class GolfScoreTable extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             players: [<Player displayName={"Jordan C."} holeCount={9} />],
//         }
//         this.game = new GolfController(this.state.players);
//     }

//     render() {
//         let headers = [<th className={"tg-0lax"}>{"Name"}</th>];

//         console.log(this.state);
//         for (let i=1; i<=this.game.holeCount; i++) {
//             headers.push(<th className={"tg-0lax"}>{i ? "Hole #" + i : ""}</th>);
//         }

//         headers.push(<th className={"tg-0lax"}>{"Total"}</th>)

//         return (
//             <table class="tg">
//                 <thead>
//                     <tr>
//                         {headers}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {this.state.players}
//                 </tbody>
//             </table>
//         );
//     }
// }