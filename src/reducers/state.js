var initialState = {
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
    schedule: [],
}

export default initialState