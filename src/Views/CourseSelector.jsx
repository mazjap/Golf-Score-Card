import React from "react"

export default function CourseSelector(props) {
    const { courses, selectedCourse, setSelectedCourse } = props
    const courseOptions = courses

    let courseOptionList = [<option key={"default_value"} value="default_value" defaultValue={ selectedCourse ? false : true }>Select golf course</option>]

    for (let i=0; i<courseOptions.length ?? 0; i++) {
        const course = courseOptions[i]
        courseOptionList.push(<option key={ course.id } value={ course.id } defaultValue={ selectedCourse?.id === course.id } >{ course.name }</option>)
    }
    
    return (
        <select placeholder="Temp" onChange={ event => setSelectedCourse(event.target.value) }>
            { courseOptionList }
        </select>
    )
}