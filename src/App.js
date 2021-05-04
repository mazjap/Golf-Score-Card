import React, { useState, useReducer, useCallback, useEffect } from "react"
import GolfScoreTable from "./Views/GolfScoreTable"
import CourseSelector from "./Views/CourseSelector"
import GolfController from './Controllers/GolfController.js'
import * as constants from "./GlobalConstants"

import './App.css';

const GolfControllerReducerActionTypes = Object.freeze({
  refetch: 1,
  set: 2
})

function golfControllerReducer(state, action) {
  const payload = action.payload

  switch (action.type) {
    case GolfControllerReducerActionTypes.reset:
      return {
        courses: []
      }
      break
      case GolfControllerReducerActionTypes.set:
        return {
          ...state,
          courses: [...payload]
        }
        break
  }
}

async function fetchCourses() {
  try {
    let response = await fetch(constants.baseUrl + constants.APIPaths.courses, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      throw new Error("Status code was not 200! Status: " + response.status)
    }

    const val = await response.json()
    return val
  } catch(e) {
    console.log(e)
    // alert(e)
  }
}

function App() {
  const [players, setPlayersAction] = useState([])
  const [selectedCourse, setSelectedCourseAction] = useState(null)
  const [courses, setCoursesAction] = useReducer(golfControllerReducer, [])

  const onReloadNeeded = useCallback(async () => {
    const jsonData = await fetchCourses();
    console.log(jsonData.courses)
    setCoursesAction({
      type: GolfControllerReducerActionTypes.set,
      payload: jsonData?.courses
    });
  }, []) // Args will never change, so it will only run once to fetch courses
  
  useEffect(() => {
    onReloadNeeded();
  }, [])

  let golfController = new GolfController(players, setPlayersAction, courses, setCoursesAction, selectedCourse, setSelectedCourseAction)
  
  return (
    <div className="App">
      <CourseSelector golfController={golfController} />
      <GolfScoreTable golfController={golfController} />
    </div>
  );
}

export default App;
