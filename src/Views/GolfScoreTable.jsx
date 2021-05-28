export default function GolfScoreTable(props) {
    const { 
        players,
        addNewPlayer, 
        setPlayerName, 
        setPlayerScores,
        removePlayerWithId,
        selectedCourse,
        selectedTeeBox,
        displayMessageModally
    } = props

    if (!selectedCourse) {
        return ""
    }

    // If it is an even number:
    // 18 + 1 // add one
    // Floor(19) = 9 // floor divide
    // same result as original number
    // But if its an odd number, ie:
    // 13 + 1 // add one
    // Floor(14) = 7 // floor divide
    // ^ = Floor(13) + 1. Used to make room for the extra hole number in the table
    const holeCountHalf = Math.floor((selectedCourse.holeCount + 1) / 2)

    const Header = () => {
        let headers = [<td key={ 0 } className="wider-cell cell">{ "Name" }</td>]

        for (let i = 0; i < holeCountHalf; i++) {
            const holeNumber = i + 1
            let holeMessage = "Hole #" + holeNumber

            if (i !== holeCountHalf - 1 || selectedCourse.holeCount % 2 === 0) {
                holeMessage +=  " / #" + (holeNumber + holeCountHalf)
            }

            headers.push(<td key={ holeNumber } className="cell">{ holeMessage }</td>)
        }

        headers.push(<td key="inout" className="cell">{ "In / Out" }</td>)
        headers.push(<td key="total" className="wide-cell cell">{ "Total" }</td>)
        headers.push(<td key="delete" className="cell">{ "Remove Player" }</td>)

        return <thead key={ "header" }><tr>{ headers }</tr></thead>
    }

    const Yardage = () => {
        let yardage = [<td key="title" className="wider-cell cell">Yardage</td>]
        let inCount = 0
        let outCount = 0

        for (let i = 0; i < holeCountHalf; i++) {
            const hole = selectedCourse.holes[i]
            const doubledHole = selectedCourse.holes[i + holeCountHalf]
            const holesYards =  hole.teeBoxes[selectedTeeBox]?.yards ?? 0
            let message = "" + holesYards
            inCount += holesYards

            if (i !== holeCountHalf || selectedCourse.holeCount % 2 === 0) {
                const doubledHolesYards = doubledHole.teeBoxes[selectedTeeBox].yards
                message += " / " + doubledHolesYards
                outCount += doubledHolesYards
            }

            yardage.push(
                <td key={ hole.courseHoleId } className="cell">{ message }</td>
            )
        }

        yardage.push(<td key="inout" className="cell">{ "" + inCount + " / " + outCount }</td>)
        yardage.push(<td key="total" className="wide-cell cell">{ inCount + outCount }</td>)
        yardage.push(<td key="delete" className="cell"></td>)

        return <tr key="yardage">{ yardage }</tr>
    }

    const parTotal = (() => {
        let total = 0

        for (let i = 0; i < selectedCourse.holeCount; i++) {
            const num = selectedCourse.holes[i].teeBoxes[selectedTeeBox].par
            total += num ?? 0
        }

        return total
    })()

    const Par = () => {
        let par = [<td key="title" className="wide-cell cell">Par</td>]
        let inCount = 0
        let outCount = 0

        for (let i = 0; i < holeCountHalf; i++) {
            const hole = selectedCourse.holes[i]
            const doubledHole = selectedCourse.holes[i + holeCountHalf]
            const holesPar =  hole.teeBoxes[selectedTeeBox].par
            let message = "" + holesPar
            inCount += holesPar

            if (i !== holeCountHalf || selectedCourse.holeCount % 2 === 0) {
                const doubledHolesPar = doubledHole.teeBoxes[selectedTeeBox].par
                message += " / " + doubledHolesPar
                outCount += doubledHolesPar
            }

            par.push(
                <td key={ hole.courseHoleId } className="cell">{ message }</td>
            )
        }

        par.push(<td key="inout" className="cell">{ "" + inCount + " / " + outCount }</td>)
        par.push(<td key="total" className="wide-cell cell">{ inCount + outCount }</td>)
        par.push(<td key="delete" className="cell"></td>)

        return <tr key="par">{ par }</tr>
    }

    const Handicap = () => {
        let handicap = [<td key="title" className="wide-cell cell">Handicap</td>]
        let inCount = 0
        let outCount = 0

        for (let i = 0; i < holeCountHalf; i++) {
            const hole = selectedCourse.holes[i]
            const doubledHole = selectedCourse.holes[i + holeCountHalf]
            const holesHcp =  hole.teeBoxes[selectedTeeBox].hcp
            let message = "" + holesHcp
            inCount += holesHcp

            if (i !== holeCountHalf || selectedCourse.holeCount % 2 === 0) {
                const doubledHolesHcp = doubledHole.teeBoxes[selectedTeeBox].hcp
                message += " / " + doubledHolesHcp
                outCount += doubledHolesHcp
            }

            handicap.push(
                <td key={ hole.courseHoleId } className="cell">{ message }</td>
            )
        }

        handicap.push(<td key="inout" className="cell">{ "" + inCount + " / " + outCount }</td>)
        handicap.push(<td key="total" className="wide-cell cell">{ (inCount + outCount) ?? parTotal }</td>)
        handicap.push(<td key="delete" className="cell"></td>)

        return <tr key="handicap">{ handicap }</tr>
    }

    const PlayerComponent = props => {
        const { player } = props
        const { displayName, id, scores} = player

        let hash = 0
        for (let i = 0; i < player.displayName.length; i++) {
            hash = player.displayName.charCodeAt(i) + ((hash << 5) - hash)
        }

        const c = (hash & 0x00FFFFFF).toString(16).toUpperCase()
        const color = "00000".substring(0, 6 - c.length) + c

        const style = {
            backgroundColor: "#" + color
        }

        let firstRowComponents = [
            <td key={ -1 } rowSpan="2" className="wide-cell cell">
                <input 
                type="text" 
                name="Name"
                style={ style }
                onBlur={
                    event => {
                        const newName = event.target.value
                        if (newName) {
                            setPlayerName(id, newName)
                        }
                    }
                } 
                defaultValue={ displayName }
                />
            </td>
        ]

        let secondRowComponents = []

        const inOutTotal = (scores) => {
            let inCount = 0

            for (let i = 0; i < holeCountHalf; i++) {
                const num = Number(player.scores[i])
                inCount += num && !isNaN(num) ? num : 0
            }

            let outCount = 0

            for (let i = holeCountHalf; i < selectedCourse.holeCount; i++) {
                const num = player.scores[i]
                outCount += num && !isNaN(num) ? num : 0
            }

            const total = inCount + outCount

            return [inCount, outCount, total]
        }

        const [inCount, outCount] = inOutTotal()

        const setPlayerScoreAtIndex = (scoreIndex, id, score) => {
            if (isNaN(scoreIndex) || scoreIndex < 0 || !id || !score) return
            const index = players.findIndex(player => player.id.toString() === id.toString())
    
            if (index === -1) return
    
            let tempScores = [...players[index].scores]
            tempScores[scoreIndex] = score

            let containsZeroOrNull = false

            console.log(parTotal)

            let total = 0
            
            for (let i = 0; i < selectedCourse.holeCount; i++) {
                const elem = tempScores[i]

                if (!elem) {
                    containsZeroOrNull = true
                } else {
                    total += elem
                }
            }

            if (tempScores.length === selectedCourse.holeCount && !containsZeroOrNull) {
                let message;

                if (total <= parTotal) {
                    message = "Great job, " + player.displayName + "!"
                } else {
                    message = "Better luck next time, " + player.displayName + "."
                }
                
                displayMessageModally(message)
            }
    
            setPlayerScores(id, tempScores)
        }

        const removePlayer = () => removePlayerWithId(player.id)

        for (let i = 0; i < selectedCourse.holeCount; i++) {
            const handleEvent = event => {
                const newValue = Number(event.target.value)
                console.log(newValue)
                if (newValue) setPlayerScoreAtIndex(i, id, newValue)
            }

            const holeNumber = i + 1

            if (i < holeCountHalf) {
                const defVal = scores[i]
                firstRowComponents.push(
                    <td key={ i } className="cell">
                        <input
                        type="text"
                        name={ "Hole #" + holeNumber }
                        onBlur={ handleEvent }
                        style={ style }
                        defaultValue={ (!defVal || isNaN(defVal)) ? 0 : defVal }
                        />
                    </td>
                )
            } else {
                secondRowComponents.push(
                    <td key={ i } className="cell">
                        <input
                            type="text"
                            name={ "Hole #" + holeNumber }
                            onBlur={ handleEvent }
                            style={ style }
                            defaultValue={ scores[i] ?? 0 }
                        />
                    </td>
                )
            }
        }

        firstRowComponents.push(<td key="in" className="cell" style={ style }> { inCount }</td>)
        secondRowComponents.push(<td key="out" className="cell" style={ style }>{ outCount }</td>)

        firstRowComponents.push(<td key="total" rowSpan="2" className="wide-cell cell" style={ style }>{ inCount + outCount }</td>)
        firstRowComponents.push(
            <td key="delete" rowSpan="2" className="cell" style={ style }>
                <button onClick={ removePlayer } style={ 
                    {
                        color: "white", 
                        backgroundColor: "red",
                        border: "none",
                        width: "100%",
                        height: "100%"
                    } 
                }>-</button>
            </td>
        )


        return (
            <>
                <tr key={ id }>{ firstRowComponents }</tr>
                <tr className="person" key={ id + "1" }>{ secondRowComponents }</tr>
            </>
        )
    }
    
    return (
        <div id="table-container">
            <table className="course-table">
                { 
                    [
                        Header(),
                        (
                            <tbody key="body">
                                { 
                                    [
                                        Yardage(), 
                                        Par(), 
                                        Handicap(), 
                                        ...players.map(player => <PlayerComponent key={ player.id } player={ player } />)
                                    ] 
                                }
                            </tbody>
                        )
                    ] 
                }
            </table>

            { players.length < 4 ? <button onClick={ addNewPlayer } id="new-player-button">Add New Player</button> : "" }
        </div>
    )
}