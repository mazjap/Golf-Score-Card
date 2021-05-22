import React, { useState } from "react"
import { useQuery } from "react-query"

import GolfScoreTable from "./Views/GolfScoreTable"
import CourseSelector from "./Views/CourseSelector"
import * as constants from "./GlobalConstants"

import './App.css'
import Player from "./Models/Player"

function App() {
  const [ players, setPlayersAction ] = useState([])
  const [ selectedCourse, setSelectedCourseAction ] = useState(null)

  const setPlayerName = function(id, name) {
    if (!id || !name) return
    
    let playersCopy = [...players]
    const index = playersCopy.firstIndexWhere(player => player.id.toString() === id.toString())

    if (!index) return

    playersCopy[index].name = name

    setPlayersAction(playersCopy)
  }

  const setPlayerScores = function(id, scores) {
    if (!id || !scores) return
    
    let playersCopy = [...players]
    const index = playersCopy.firstIndexWhere(player => player.id.toString() === id.toString())

    if (!index) return

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
        setSelectedCourseAction(obj.data)
      })
    })
  }

  function addNewPlayer() {
    let playersCopy = [...players]
    playersCopy.push(new Player(
      null,
      [],
      null
    ))

    setPlayersAction(playersCopy)
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
      <GolfScoreTable
        players={ players }
        setPlayers={ setPlayersAction }
        setPlayerName={ setPlayerName }
        setPlayerScores={ setPlayerScores }
        addNewPlayer={ addNewPlayer }
        courses={ courses }
        selectedCourse={ selectedCourse }
      />
    </div>
  )
}

Array.prototype.firstEnumerationWhere = function(callback) {
  for (let i = 0; i < this.length; i++) {
    const elem = this[i]
    if (callback(elem)) {
      return [i, elem]
    }
  }
}

Array.prototype.firstWhere = function(callback) {
  const enumeration = this.firstEnumerationWhere(callback)
  if (enumeration) {
    return enumeration[1]
  }
}

Array.prototype.firstIndexWhere = function(callback) {
  const enumeration = this.firstEnumerationWhere(callback)
  if (enumeration) {
    return enumeration[0]
  }
}

export default App