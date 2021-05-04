import React from "react"
import GolfController from "../Controllers/GolfController"

export default function CourseSelector(props) {
    const golfController = props.golfController

    let nameOptionElements = [<option key={"default_value"} value="" disabled selected>Select golf course</option>]

    for (let i=0; i<golfController.courseOptions.length ?? 0; i++) {
        const course = golfController.courseOptions[i]
        nameOptionElements.push(<option key={course.id} value={course.id}>{course.name}</option>)
    }
    
    return (
        <select placeholder="Temp">
            { nameOptionElements }
        </select>
    )
}