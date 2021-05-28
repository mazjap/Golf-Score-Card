export default function GolfScoreTable(props) {
    const { 
        players,
        addNewPlayer, 
        setPlayerName, 
        setPlayerScores,
        selectedCourse,
        selectedTeeBox
    } = props

    const setPlayerScoreAtIndex = (scoreIndex, id, score) => {
        if (isNaN(scoreIndex) || scoreIndex < 0 || !id || !score) return

        const index = players.findIndex(player => player.id.toString() === id.toString())

        if (index === -1) return

        let tempScores = [...players[index].scores]
        tempScores[scoreIndex] = score

        setPlayerScores(id, tempScores)
    }

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
        let headers = [<td key={ 0 } className="tg-0lax">{ "Name" }</td>]

        for (let i = 0; i < holeCountHalf; i++) {
            const holeNumber = i + 1

            let holeMessage = "Hole #" + holeNumber

            if (i !== holeCountHalf - 1 || selectedCourse.holeCount % 2 === 0) {
                holeMessage +=  " & " + (holeNumber + holeCountHalf)
            }

            headers.push(<td key={ holeNumber } className="tg-0lax">{ holeMessage }</td>)
        }

        headers.push(<td key={ selectedCourse.holeCount }>{ "In & Out" }</td>)

        headers.push(<td key={ selectedCourse.holeCount + 1 } className="tg-0lax">{ "Total" }</td>)

        return <thead key={ "header" }><tr>{ headers }</tr></thead>
    }

    const Yardage = () => {
        let yardage = [<td key="title">Yardage</td>]
        let inCount = 0
        let outCount = 0

        for (let i = 0; i < holeCountHalf; i++) {
            const hole = selectedCourse.holes[i]
            const doubledHole = selectedCourse.holes[i + holeCountHalf]
            const holesYards =  hole.teeBoxes[selectedTeeBox].yards
            let message = "" + holesYards
            inCount += holesYards

            if (i !== holeCountHalf || selectedCourse.holeCount % 2 === 0) {
                const doubledHolesYards = doubledHole.teeBoxes[selectedTeeBox].yards
                message += " & " + doubledHolesYards
                outCount += doubledHolesYards
            }

            yardage.push(
                <td key={ hole.courseHoleId }>{ message }</td>
            )
        }

        yardage.push(<td key="inout">{ "" + inCount + " & " + outCount }</td>)
        yardage.push(<td key="total">{ inCount + outCount }</td>)

        return <tr key="yardage">{ yardage }</tr>
    }

    const Par = () => {
        let par = [<td key="title">Par</td>]
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
                message += " & " + doubledHolesPar
                outCount += doubledHolesPar
            }

            par.push(
                <td key={ hole.courseHoleId }>{ message }</td>
            )
        }

        par.push(<td key="inout">{ "" + inCount + " & " + outCount }</td>)
        par.push(<td key="total">{ inCount + outCount }</td>)

        return <tr key="par">{ par }</tr>
    }

    const Handicap = () => {
        let handicap = [<td key="title">Handicap</td>]
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
                message += " & " + doubledHolesHcp
                outCount += doubledHolesHcp
            }

            handicap.push(
                <td key={ hole.courseHoleId }>{ message }</td>
            )
        }

        handicap.push(<td key="inout">{ "" + inCount + " & " + outCount }</td>)
        handicap.push(<td key="total">{ inCount + outCount }</td>)

        return <tr key="handicap">{ handicap }</tr>
    }

    const PlayerComponent = props => {
        const { player } = props
        const { displayName, id, scores} = player

        let firstRowComponents = [
            <td key={ -1 } rowSpan="2">
                <input 
                type="text" 
                name="Name"
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
                    <td key={ i }>
                        <input
                        type="text"
                        name={ "Hole #" + holeNumber }
                        onBlur={ handleEvent }
                        defaultValue={ (!defVal || isNaN(defVal)) ? 0 : defVal }
                        />
                    </td>
                )
            } else {
                secondRowComponents.push(
                    <td key={ i }>
                        <input
                        type="text"
                        name={ "Hole #" + holeNumber }
                        onBlur={ handleEvent }
                        defaultValue={ scores[i] ?? 0 }
                        />
                    </td>
                )
            }
        }

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

        firstRowComponents.push(<td key={ selectedCourse.holeCount }>{ inCount }</td>)

        secondRowComponents.push(<td key={ selectedCourse.holeCount + 1 }>{ outCount }</td>)

        firstRowComponents.push(<td key={ selectedCourse.holeCount + 2 } rowSpan="2" >{ inCount + outCount }</td>)

        return (
            <>
                <tr key={ id }>{ firstRowComponents }</tr>
                <tr key={ id + "1" }>{ secondRowComponents }</tr>
            </>
        )
    }
    
    return (
        <div>
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

            <button onClick={ addNewPlayer } >Add New Player</button>
        </div>
    )
}