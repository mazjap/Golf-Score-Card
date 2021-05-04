
export function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

export const baseUrl = "https://golf-courses-api.herokuapp.com"

export const APIPaths = Object.freeze({
    courses: "/courses",
    courseDetailUsing: function(id) { return (APIPaths.courses + "/" + id) }
})