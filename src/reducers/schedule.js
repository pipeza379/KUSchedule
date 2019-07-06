import Action from '../actions'
// import initialState from "./state"
// var data = [
//     {
//         "course": 123450,
//         "name": "Lab2",
//         "sec": "",
//         "day": "Md",
//         "timeStart": 9.5,
//         "timeEnd": 10.5,
//         "place": "",
//         "color": "",
//     },
//     {
//         "course": 111110,
//         "name": "compro",
//         "sec": "",
//         "day": "Md",
//         "timeStart": 10.5,
//         "timeEnd": 12.5,
//         "place": "E15",
//         "color": "",
//     },
//     {
//         "course": 114400,
//         "name": "comarc",
//         "sec": "999",
//         "day": "Td",
//         "timeStart": 6.5,
//         "timeEnd": 18.5,
//         "place": "",
//         "color": "",
//     },
// ]

var initialState = {
    schedule: [],
}

function scheduleReducer(state = initialState, action) {
    switch (action.type) {
        case Action.SCHEDULENAME:
            return {
                ...state,
                name: action.schedulename,
            }
        case Action.ADDDATA:
            return {
                ...state,
                schedule: [
                    ...state.schedule,
                    action.schedule
                ]
            }
        case Action.REMOVESUBJECT:
            return {
                ...state,
                schedule: action.newSchedule
            }
        case Action.LOADSCHEDULE:
            return {
                ...state,
                schedule: action.schedule,
                name: action.name
            }
        default:
            return state

    }
}
export default scheduleReducer
