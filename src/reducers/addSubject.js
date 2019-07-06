import Action from '../actions'
var initialState = {
    // isActiveMain: true,
    // isActiveOther: false,
    // isHiddenDetail: false,
    // valSub: "",
    name: "",
    data: {
        course: "",
        name: "",
        sec: "",
        day: "",
        timeStart: "",
        timeEnd: "",
        place: "",
        color: "",
        other: "",
    },
    invalid: {
        course: "",
        name: "",
        day: "",
        timeStart: "",
        timeEnd: "",
    },
    edit: false,
    select: -1,
}

function addSubjectReducer(state = initialState, action) {
    let { course, name, day, timeStart, timeEnd, place, sec, other } = action
    switch (action.type) {
        case Action.ADDSUBJECT:
            return {
                ...state,
                data: {
                    ...state.data,
                    name,
                    course
                },
            }

        case Action.ADDCOURSE:
            return {
                ...state,
                data: {
                    ...state.data,
                    course
                },
            }
        case Action.ADDNAME:
            return {
                ...state,
                data: {
                    ...state.data,
                    name
                },
            }
        case Action.ADDDAY:
            return {
                ...state,
                data: {
                    ...state.data,
                    day
                },
            }
        case Action.ADDTIMESTART:
            return {
                ...state,
                data: {
                    ...state.data,
                    timeStart
                },
            }
        case Action.ADDTIMEEND:
            return {
                ...state,
                data: {
                    ...state.data,
                    timeEnd
                },
            }
        case Action.ADDSEC:
            return {
                ...state,
                data: {
                    ...state.data,
                    sec
                },
            }
        case Action.ADDPLACE:
            return {
                ...state,
                data: {
                    ...state.data,
                    place
                },
            }
        case Action.ADDOTHER:
            return {
                ...state,
                data: {
                    ...state.data,
                    other
                },
            }
        case Action.CLEAR:
            return {
                name: state.name,
                data: {
                    course: "",
                    name: "",
                    sec: "",
                    day: "",
                    timeStart: "",
                    timeEnd: "",
                    place: "",
                    color: "",
                },
                invalid: {
                    course: "",
                    name: "",
                    day: "",
                    timeStart: "",
                    timeEnd: "",
                },
                select: -1,
                edit: false,
            }
        case Action.INVALID:
            return {
                ...state,
                invalid: {
                    course: action.invalid.course,
                    name: action.invalid.name,
                    day: action.invalid.day,
                    timeStart: action.invalid.timeStart,
                    timeEnd: action.invalid.timeEnd,
                }
            }
        case Action.EDITSUBJECT:
            return {
                ...state,
                data: action.data,
                edit: action.edit,
                select: action.select,
            }
        default:
            return state
    }
}
export default addSubjectReducer
