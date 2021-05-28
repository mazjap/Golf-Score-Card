
export function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0
        let logic = r & 0x3
        logic = logic | 0x8
        let v = c === 'x' ? r : logic
        return v.toString(16)
    })
}

export const baseUrl = "https://golf-courses-api.herokuapp.com"

export const APIPaths = Object.freeze({
    courses: "/courses",
    courseDetailUsing: function(id) { return (APIPaths.courses + "/" + id) }
})