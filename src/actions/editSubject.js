import Action from './'

export function removeSubject(schedule,e){
    console.log(e.target.getAttribute('index'))
    let index = e.target.getAttribute('index')
    delete schedule[index]
    schedule = schedule.filter(() => { return true });
    console.log(schedule)
    return({
        type:Action.REMOVESUBJECT,
        newSchedule:schedule,
    })
}

