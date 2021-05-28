import React, { useState, useEffect, useRef } from "react"
import { useQuery } from "react-query"

import GolfScoreTable from "./Views/GolfScoreTable"
import CourseSelector from "./Views/CourseSelector"
import * as constants from "./GlobalConstants"

import './App.css'
import Player from "./Models/Player"

function useOutsideTapAlert(ref, action) {
  useEffect(() => {
      function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
              action()
          }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
          document.removeEventListener("mousedown", handleClickOutside)
      }
  }, [ref])
}

function OutsideAlerter(props) {
  const { action, customId } = props
  const wrapperRef = useRef(null)
  useOutsideTapAlert(wrapperRef, action)

  return <div id={ customId } ref={wrapperRef}>{props.children}</div>
}

function App() {
  const [ modalMessage, setModalMessage ] = useState(null)
  const [ players, setPlayersAction ] = useState([])
  const [ selectedTeeBox, setSelectedTeeBox ] = useState(0)
  const [ selectedCourse, setSelectedCourseAction ] = useState(null)
  const wrapperRef = useRef(null)

  const { isLoading, data } = useQuery("fetchCourses", () => {
    return fetch(constants.baseUrl + constants.APIPaths.courses, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
  })

  const displayMessageModally = message => setModalMessage(message)
  const hideModal = () => setModalMessage(null)

  useOutsideTapAlert(wrapperRef, hideModal)

  if (isLoading) return "Loading..."

  const addNewPlayer = () => {
    setPlayersAction([...players, new Player(
      null,
      [],//[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      null
    )])
  }

  const removePlayer = (id) => {
    if (!id) {
      setPlayersAction([])
      return
    }

    let playersCopy = [...players]

    const index = playersCopy.findIndex(player => player.id.toString() === id.toString())

    if (index === -1) return

    playersCopy.splice(index, 1)

    setPlayersAction(playersCopy)
  }

  const setPlayerName = function(id, name) {
    console.log(includes(players, player => player.name === name))
    if (!id || !name || includes(players, player => player.displayName === name)) return

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


  const setSelectedCourse = id => {
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

  console.log("Modal Message: " + modalMessage)
  return (
    <div id="container">
      <CourseSelector
        courses={ data?.courses ?? [] }
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
        removePlayerWithId= { removePlayer }
        selectedCourse={ selectedCourse }
        selectedTeeBox={ selectedTeeBox }
        modalMessage={ modalMessage }
        displayMessageModally={ displayMessageModally }
        hideModal={ hideModal }
      />
      {
        !modalMessage ? "" : (
          <ModalMessage message={ modalMessage } hideModal={ hideModal } />
        )
      }
    </div>
  )
}

function ModalMessage(props) {
  const { message, hideModal } = props

  return (
    <div id="modal-container">
      <OutsideAlerter action={ hideModal } customId="modal-outer-tap-listener">
        <div id="modal-content">
          { message }
        </div>
      </OutsideAlerter>
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

function includes(array, callback) {
  for (const elem of array) {
    if (callback(elem)) {
      return true
    }
  }

  return false
}