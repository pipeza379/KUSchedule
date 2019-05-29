import {combineReducers} from 'redux'
import addSubjectReducer from './addSubject'
import scheduleReducer from './schedule'

export default combineReducers({
    addSubject:addSubjectReducer,
    schedule:scheduleReducer,
})