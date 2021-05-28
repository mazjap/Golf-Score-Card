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

    let playersCopy = [...players]

    const index = playersCopy.findIndex(player => player.id.toString() === id.toString())
    if (index === -1) return

    playersCopy[index].displayName = name

    setPlayersAction(playersCopy)
  }

  const setPlayerScores = function(id, scores) {
    if (!id || !scores || !scores.length) return

    let playersCopy = [...players]

    const index = playersCopy.findIndex(player => player.id.toString() === id.toString())
    if (index === -1) return

    playersCopy[index].scores = scores

    setPlayersAction(playersCopy)
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
        setSelectedTeeBox(0)
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
    <div id="container">
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

  return (
  <div>
  {
    !selectedCourse ? "Please select a course" : (
      <select 
      onChange={ 
        event => {
          setSelectedTeeBox(event.target.value)
        }
      }>
      {
        selectedCourse.holes[0].teeBoxes.map((teeBox, index) => {
          let yardage = 0
          for (const hole of selectedCourse.holes) {
            yardage += hole.teeBoxes[index].yards
          }

          return (
            <option 
              key={ index } 
              value={ index } 
              defaultValue={ index === selectedTeeBox }>
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