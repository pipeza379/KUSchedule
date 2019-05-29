import Action from '../actions'

var initialState = {
    // isActiveMain: true,
    // isActiveOther: false,
    // isHiddenDetail: false,
    // valSub: "",
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
    }
}

function addSubjectReducer(state = initialState, action) {
    let { course, name, day, timeStart, timeEnd, place, sec } = action
    switch (action.type) {
        case Action.ADDSUBJECT:
            return {
                data: {
                    ...state.data,
                    name,
                    course
                },
                invalid: {
                    ...state.invalid,
                    course: "",
                    name: ""
                }
            }

        case Action.ADDCOURSE:
            return {
                data: {
                    ...state.data,
                    course
                },
                invalid: {
                    ...state.invalid,
                    course: ""
                }
            }
        case Action.ADDNAME:
            return {
                data: {
                    ...state.data,
                    name
                },
                invalid: {
                    ...state.invalid,
                    name: ""
                }
            }
        case Action.ADDDAY:
            return {
                data: {
                    ...state.data,
                    day
                },
                invalid: {
                    ...state.invalid,
                    day: ""
                }
            }
        case Action.ADDTIMESTART:
            return {
                data: {
                    ...state.data,
                    timeStart
                },
                invalid: {
                    ...state.invalid,
                    timeStart: ""
                }
            }
        case Action.ADDTIMEEND:
            return {
                data: {
                    ...state.data,
                    timeEnd
                },
                invalid: {
                    ...state.invalid,
                    timeEnd: ""
                }
            }
        case Action.ADDSEC:
            return {
                data: {
                    ...state.data,
                    sec
                }
            }
        case Action.ADDPLACE:
            return {
                data: {
                    ...state.data,
                    place
                }
            }
        case Action.CLEAR:
            return {
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
                }
            }
        case Action.INVALID:
            return {
                ...state,
                invalid: {
                    course:action.invalid.course,
                    name:action.invalid.name,
                    day:action.invalid.day,
                    timeStart:action.invalid.timeStart,
                    timeEnd:action.invalid.timeEnd,
                }
            }
        default:
            return state
    }
}
export default addSubjectReducer
