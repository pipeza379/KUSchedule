import Action from '../actions'

var initialState = {
    // isActiveMain: true,
    // isActiveOther: false,
    // isHiddenDetail: false,
    // valSub: "",
    name:"",
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
    edit: false,
    select: -1,
}

function addSubjectReducer(state = initialState, action) {
    let { course, name, day, timeStart, timeEnd, place, sec } = action
    switch (action.type) {
        case Action.ADDSUBJECT:
            return {
                name:state.name,
                data: {
                    ...state.data,
                    name,
                    course
                },
                invalid: {
                    ...state.invalid,
                    course: "",
                    name: ""
                },
                edit: state.edit,
                select: state.select,
            }

        case Action.ADDCOURSE:
            return {
                name:state.name,
                data: {
                    ...state.data,
                    course
                },
                invalid: {
                    ...state.invalid,
                    course: ""
                },
                edit: state.edit,
                select: state.select,
            }
        case Action.ADDNAME:
            return {
                name:state.name,
                data: {
                    ...state.data,
                    name
                },
                invalid: {
                    ...state.invalid,
                    name: ""
                },
                edit: state.edit,
                select: state.select,
            }
        case Action.ADDDAY:
            return {
                name:state.name,
                data: {
                    ...state.data,
                    day
                },
                invalid: {
                    ...state.invalid,
                    day: ""
                },
                edit: state.edit,
                select: state.select,
            }
        case Action.ADDTIMESTART:
            return {
                name:state.name,
                data: {
                    ...state.data,
                    timeStart
                },
                invalid: {
                    ...state.invalid,
                    timeStart: ""
                }, 
                edit: state.edit,
                select: state.select,
            }
        case Action.ADDTIMEEND:
            return {
                name:state.name,
                data: {
                    ...state.data,
                    timeEnd
                },
                invalid: {
                    ...state.invalid,
                    timeEnd: ""
                },
                edit:state.edit,
                select:state.select,
            }
        case Action.ADDSEC:
            return {
                name:state.name,
                data: {
                    ...state.data,
                    sec
                },
                edit: state.edit
            }
        case Action.ADDPLACE:
            return {
                name:state.name,
                data: {
                    ...state.data,
                    place
                },
                edit:state.edit,
                select:state.select,
            }
        case Action.CLEAR:
            return {
                name:state.name,
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
        case Action.SCHEDULENAME:
            return{
                ...state,
                name:action.nameSchedule,
            }
        default:
            return state
    }
}
export default addSubjectReducer
