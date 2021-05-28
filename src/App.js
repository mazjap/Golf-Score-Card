import React, { useState } from "react"
import { useQuery } from "react-query"

import GolfScoreTable from "./Views/GolfScoreTable"
import CourseSelector from "./Views/CourseSelector"
import * as constants from "./GlobalConstants"

import './App.css'
import Player from "./Models/Player"

function App() {
  const [ players, setPlayersAction ] = useState([])
  const [ selectedTeeBox, setSelectedTeeBox ] = useState(0)
  const [ selectedCourse, setSelectedCourseAction ] = useState(null)

  const addNewPlayer = () => {
    setPlayersAction([...players, new Player(
      null,
      [],
      null
    )])
  }

  const setPlayerName = function(id, name) {
    if (!id || !name) return

    const index = players.findIndex(player => player.id.toString() === id.toString())
    if (index === -1) return

    players[index].displayName = name

    setPlayersAction(players)
  }

  const setPlayerScores = function(id, scores) {
    console.log(id)
    console.log(scores)
    console.log(scores.length)

    if (!id || !scores || !scores.length) return

    const index = players.findIndex(player => player.id.toString() === id.toString())

    console.log(index)

    if (index === -1) return

    players[index].scores = scores

    console.log(players[index].scores)

    setPlayersAction(players)
  }


  function setSelectedCourse(id) {
    if (!id) return

    fetch(constants.baseUrl + constants.APIPaths.courses + "/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      res.json().then(obj => {
        console.log(obj.data)
        setSelectedCourseAction(obj.data)
      })
    })
  }

  const { isLoading, data } = useQuery("fetchCourses", () => {
    return fetch(constants.baseUrl + constants.APIPaths.courses, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
  })

  const courses = data?.courses ?? []

  return isLoading ? "Loading..." : (
    <div className="App">
      <CourseSelector
        courses={ courses }
        selectedCourse={ selectedCourse }
        setSelectedCourse={ setSelectedCourse }
      />
      <TeeBoxSelection 
        selectedCourse={ selectedCourse }
        selectedTeeBox={ selectedTeeBox }
        setSelectedTeeBox={ setSelectedTeeBox }
      />
      <GolfScoreTable
        players={ players }
        setPlayers={ setPlayersAction }
        setPlayerName={ setPlayerName }
        setPlayerScores={ setPlayerScores }
        addNewPlayer={ addNewPlayer }
        selectedCourse={ selectedCourse }
        selectedTeeBox={ selectedTeeBox }
      />
    </div>
  )
}

function TeeBoxSelection(props) {
  const { selectedCourse, selectedTeeBox, setSelectedTeeBox } = props

  const setTeeBoxWithId = id => {
    
  }

  return (
  <div>
  {
    !selectedCourse ? "Please select a course" : (
      <select>
      {
        selectedCourse.holes[0].teeBoxes.map((teeBox, index) => {
          let yardage = 0
          for (const hole of selectedCourse.holes) {
            yardage += hole.teeBoxes[index].yards
          }

          return (
            <option key={ index } value={ index }>
              {
                teeBox.teeType.toUpperCase() + ", " + yardage + " yards"
              }
            </option>
          )
        })
      }
      </select>
    )
  }
  </div>
  )
}

export default App