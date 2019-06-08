import Action from './'

export function removeSubject(schedule, e) {
    let index
    console.log("rm",e)
    if (isNaN(e))
        index = e.target.getAttribute('index')
    else
        index = e
    delete schedule[index]
    schedule = schedule.filter(() => { return true });
    return ({
        type: Action.REMOVESUBJECT,
        newSchedule: schedule,
    })
}

export function editSub(data, e) {
    let index = e.target.getAttribute('index')
    console.log(index)
    data = data[index]
    // console.log(data)
    console.log(e.target)
    return ({
        type: Action.EDITSUBJECT,
        data,
        edit: true,
        select: index,
    })
}

