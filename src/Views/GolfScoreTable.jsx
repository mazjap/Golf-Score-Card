export default function GolfScoreTable(props) {
    const { 
        players, 
        setPlayers, 
        addNewPlayer, 
        setPlayerName, 
        setPlayerScores, 
        courses, 
        selectedCourse 
    } = props

    if (!selectedCourse) {
        return "Please select a course"
    }

    let items = []

    let headers = [<td key={ 0 } className="tg-0lax">{ "Name" }</td>]

    for (let i = 0; i < selectedCourse.holeCount; i++) {
        headers.push(<td key={ i + 1 } className="tg-0lax">{ "Hole #" + (i + 1) }</td>)
    }

    headers.push(<td key={ selectedCourse.holeCount + 1 } className="tg-0lax">{ "Total" }</td>)

    console.log(headers.length)

    items.push(<thead key={ "header" }><tr>{ headers }</tr></thead>)

    const PlayerComponent = props => {
        const { player } = props
        const { displayName, id, scores} = player

        let components = [
            <td key={ -1 }>
                <input 
                type="text" 
                name="Name" 
                onBlur={
                    event => {
                        const newName = event.target.value
                        if (newName) {
                            console.log(newName)
                            setPlayerName(id, newName)
                        }
                    }
                } 
                defaultValue={ displayName }
                />
            </td>
        ]

        for (let i=0; i<selectedCourse.holeCount; i++) {
            components.push(
                <td key={ i }>
                    <input
                    type="text"
                    name={ "Hole #" + (i + 1) }
                    onBlur={
                        event => {
                            console.log("Hit hole value change")
                            const newValue = Number(event.target.value)
                            if (newValue) {
                                let scoresCopy = [...scores]
                                scoresCopy[i] = newValue
                                setPlayerScores(id, scoresCopy)
                            }
                        }
                    }
                    defaultValue={ scores[i] ?? 0 }
                    />
                </td>
            )
        }

        components.push(<td key={ selectedCourse.holeCount }>{ player.getTotal() }</td>)

        return <tr key={ id }>{ components }</tr>
    }

    const playerComponents = players.map(player => <PlayerComponent key={ player.id } player={ player } />)
    items.push(<tbody key="body">{ playerComponents }</tbody>)
    
    return (
        <div>
            <table className="course-table">
                { items }
            </table>

            <button onClick={ addNewPlayer } >Add New Player</button>
        </div>
    )
}