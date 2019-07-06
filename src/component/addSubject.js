import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../asset/css/course.css';

import Action from '../actions';
import * as addingAction from '../actions/addSub'
import * as editSubject from '../actions/editSubject'

import Time from '../asset/data/time2.json';
import Day from '../asset/data/day2.json';
import Data from '../asset/data/data.json';

import { ReactComponent as Down } from '../asset/icon/down.svg';
import { ReactComponent as Up } from '../asset/icon/up.svg';

class InputSubject extends Component {
    constructor() {
        super()
        this.state = {
            isActiveMain: false,
            isActiveOther: true,
            isHiddenDetail: false,
            valSub: "",
        }
        this.addBtn = this.addBtn.bind(this)
    }
    addBtn() {
        let { day, name, timeStart, timeEnd, course } = this.props.data
        let inp_course, inp_name, inp_day, inp_ts, inp_te = ""
        console.log(this.props.data)
        inp_course = course === "" ? "invalidInput" : ""
        inp_name = name === "" ? "invalidInput" : ""
        inp_day = day === "" ? "invalidInput" : ""
        inp_ts = timeStart === "" || (timeEnd !== "" && timeStart >= timeEnd) ? "invalidInput" : ""
        inp_te = timeEnd === "" || (timeStart !== "" && timeEnd <= timeStart) ? "invalidInput" : ""
        let invalid = {
            course: inp_course,
            name: inp_name,
            day: inp_day,
            timeStart: inp_ts,
            timeEnd: inp_te,
        }
        this.props.invalidInputed(invalid)

        if (course !== "" && name !== "" && day !== "" && timeStart !== "" && timeEnd !== "" && (timeEnd > timeStart)) {
            if (this.props.edit) {
                let index = this.props.select
                console.log(index)
                this.props.editSubject.removeSubject(this.props.schedule, index)
            }
            this.props.addData(this.props.data)
            this.props.clearData()
            this.setState(
                {
                    valSub: "",
                }
            )
        }
    }

    hidden = (set) => {
        if (set === "main") {
            this.setState({
                isActiveMain: true,
                isActiveOther: false,
            })
        }
        else if (set === "other") {
            this.setState({
                isActiveMain: false,
                isActiveOther: true,
            })
        }
        else if (set === "detail") {
            this.setState({
                isHiddenDetail: !this.state.isHiddenDetail
            })
        }
    }

    tab = active => active ? "active item" : "item"

    checkEdit = () => {
        let text = this.props.edit ? "CONFIRM EDIT" : "ADD"
        // console.log(this.props.edit)
        // console.log(text)
        if (!this.props.edit) {
            return (
                <Row>
                    <Col md={{ size: 6, offset: 3 }}>
                        <button onClick={this.addBtn} className="add-btn" >{text}</button>
                    </Col>
                </Row>
            )
        }
        else {
            return (
                <Row>
                    <Col md={{ size: 4, offset: 2 }}>
                        <button onClick={this.addBtn} className="edit-btn" >{text}</button>
                    </Col>
                    <Col md={{ size: 4 }}>
                        <button onClick={this.props.clearData} className="cancel-btn" >CANCEL</button>
                    </Col>
                </Row>
            )
        }
    }

    render() {
        const data = this.props.data
        const invalid = this.props.invalid
        return (
            <React.Fragment>
                <div className="add-sub">
                    <h3 className="sel-course">Add subject</h3>
                    <br />
                    <div className="main-course">
                        <Row><Col md={{ size: 10, offset: 1 }}>
                            <div id="tab" className="ui pointing menu" >
                                {/* <span className={this.tab(this.state.isActiveMain)} onClick={this.hidden.bind(this, "main")}>วิชาบูรณาการ</span> */}
                                <span className={this.tab(this.state.isActiveOther)} onClick={this.hidden.bind(this, "other")}>อื่นๆ</span>
                            </div>
                        </Col></Row>
                        {this.state.isActiveMain &&
                            <Row><Col md={{ size: 10, offset: 1 }}>
                                <Dropdown style={{ width: "100%", borderRadius: "25px", marginBottom: "4%" }}
                                    id={invalid.name} placeholder="Select Subject" value={this.state.valSub}
                                    search selection options={Data} onChange={this.props.addingAction.handleChange.bind(this, "subject")} />
                            </Col></Row>}
                        {this.state.isActiveOther &&
                            <Row>
                                <Col md={{ size: 5, offset: 1 }}> <input className="course" id={invalid.course} value={data.course} placeholder="Course" onChange={this.props.addingAction.addValue.bind(this)} /></Col>
                                <Col md={5}> <input className="name" id={invalid.name} value={data.name} placeholder="Subject" onChange={this.props.addingAction.addValue.bind(this)} /></Col>
                            </Row>
                        }
                        <Row>
                            <Col md={{ size: 10, offset: 1 }}>
                                <Dropdown style={{ width: "100%", borderRadius: "25px", marginBottom: "4%" }}
                                    id={invalid.day} placeholder="Select Day" value={data.day} search
                                    selection options={Day} onChange={this.props.addingAction.handleChange.bind(this, 'day')} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ size: 5, offset: 1 }}>
                                <Dropdown style={{ width: "100%", borderRadius: "25px", marginBottom: "4%", position: "relative" }}
                                    id={invalid.timeStart} placeholder="Select Start" value={data.timeStart} search
                                    selection options={Time} onChange={this.props.addingAction.handleChange.bind(this, 'timeStart')} />
                            </Col>
                            <Col md={5}>
                                <Dropdown style={{ width: "100%", borderRadius: "25px", marginBottom: "4%", position: "relative" }}
                                    id={invalid.timeEnd} placeholder="Select End" value={data.timeEnd} search
                                    selection clearable={true} options={Time} onChange={this.props.addingAction.handleChange.bind(this, 'timeEnd')} />
                            </Col>
                        </Row>
                        <br />
                        <Row><Col md={{ size: 10, offset: 1 }}>
                            <h6 >Detail{!this.state.isHiddenDetail && <Down id="down" onClick={this.hidden.bind(this, "detail")} />}{this.state.isHiddenDetail && <Up id="down" onClick={this.hidden.bind(this, "detail")} />}</h6>
                            {this.state.isHiddenDetail &&
                                <div>
                                    <br />
                                    <Row>
                                        <Col>
                                            <input className="sec" value={data.sec} placeholder="Sec"
                                                onChange={this.props.addingAction.addValue.bind(this)} />
                                        </Col>
                                        <Col>
                                            <input className="place" value={this.props.data.place} placeholder="Place"
                                                onChange={this.props.addingAction.addValue.bind(this)} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <input className="other" value={data.other} placeholder="Other"
                                                onChange={this.props.addingAction.addValue.bind(this)} />
                                        </Col>
                                    </Row>
                                </div>
                            }
                        </Col></Row>
                        {this.checkEdit()}
                        {!this.state.isHiddenDetail && <span id="showDetail" />}
                    </div>
                    <br />
                    <br />
                    <br />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    data: state.addSubject.data,
    invalid: state.addSubject.invalid,
    schedule: state.schedule.schedule,
    edit: state.addSubject.edit,
    select: state.addSubject.select,
})

const mapDispatchToProps = dispatch => ({
    addingAction: bindActionCreators(addingAction, dispatch),
    editSubject: bindActionCreators(editSubject, dispatch),
    clearData: () => dispatch({ type: Action.CLEAR }),
    invalidInputed: (invalid) => dispatch({ type: Action.INVALID, invalid }),
    addData: (newSchedule) => dispatch({ type: Action.ADDDATA, schedule: newSchedule })
})

export default connect(mapStateToProps, mapDispatchToProps)(InputSubject);

