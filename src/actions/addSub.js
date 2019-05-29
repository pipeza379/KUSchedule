import Action from './';

export function addValue(data) {
    let value = data.target.value
    let name = data.target.className
    if (name === "course")
        return ({
            type: Action.ADDCOURSE,
            [name]: value,
        })
    else if (name === "name")
        return ({
            type: Action.ADDNAME,
            [name]: value,
        })
    else if (name === "sec")
        return ({
            type: Action.ADDSEC,
            [name]: value,
        })
    else if (name === "place")
        return ({
            type: Action.ADDPLACE,
            [name]: value,
        })
}


export function handleChange(set, event, data){
    let val = data.value
    if (set === "timeStart") {
        return ({
            type: Action.ADDTIMESTART,
            timeStart: val,
        })
    }
    else if (set === "timeEnd") {
        return ({
            type: Action.ADDTIMEEND,
            timeEnd: val,
        })
    }
    else if (set === "day") {
        return ({
            type: Action.ADDDAY,
            day: val,
        })
    }
    else if (set === "subject") {
        let { course, name } = val
        this.setState({valSub: val})
        return ({
            type: Action.ADDSUBJECT,
            course,
            name
        })        
    }
}
