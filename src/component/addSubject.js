import React, { Component } from 'react'
// import { Container, Row, Col } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../css/course.css';

import Action from '../actions';
import * as addingAction from '../actions/addSub'

import Time from '../data/time2.json';
import Day from '../data/day2.json';
import Data from '../data/data.json';

import { ReactComponent as Down } from '../icon/down.svg';
import { ReactComponent as Up } from '../icon/up.svg';

class InputSubject extends Component {
    constructor() {
        super()
        this.state = {
            isActiveMain: true,
            isActiveOther: false,
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
            console.log("check")
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

    tab = (active) => {
        return active ? "active item" : "item"
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
                        <Row><Col md={10}>
                            <div id="tab" className="ui pointing menu" >
                                <span className={this.tab(this.state.isActiveMain)} onClick={this.hidden.bind(this, "main")}>วิชาบูรณาการ</span>
                                <span className={this.tab(this.state.isActiveOther)} onClick={this.hidden.bind(this, "other")}>อื่นๆ</span>
                            </div>
                        </Col></Row>
                        {this.state.isActiveMain &&
                            <Row><Col md={10}>
                                <Dropdown style={{ width: "100%", borderRadius: "25px", marginBottom: "4%" }}
                                    id={invalid.name} placeholder="Select Subject" value={this.state.valSub}
                                    search selection options={Data} onChange={this.props.addingAction.handleChange.bind(this, "subject")} />
                            </Col></Row>}
                        {this.state.isActiveOther &&
                            <Row>
                                <Col md={5}> <input className="course" id={invalid.course} value={data.course} placeholder="Course" onChange={this.props.addingAction.addValue.bind(this)} /></Col>
                                <Col md={5}> <input className="name" id={invalid.name} value={data.name} placeholder="Subject" onChange={this.props.addingAction.addValue.bind(this)} /></Col>
                            </Row>
                        }
                        <Row>
                            <Col md={10}>
                                <Dropdown style={{ width: "100%", borderRadius: "25px", marginBottom: "4%" }}
                                    id={invalid.day} placeholder="Select Day" value={data.day}
                                    selection options={Day} onChange={this.props.addingAction.handleChange.bind(this, 'day')} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={5}>
                                <Dropdown style={{ width: "100%", borderRadius: "25px", marginBottom: "4%", position: "relative" }}
                                    id={invalid.timeStart} placeholder="Select Start" value={data.timeStart}
                                    selection options={Time} onChange={this.props.addingAction.handleChange.bind(this, 'timeStart')} />
                            </Col>
                            <Col md={5}>
                                <Dropdown style={{ width: "100%", borderRadius: "25px", marginBottom: "4%", position: "relative" }}
                                    id={invalid.timeEnd} placeholder="Select End" value={data.timeEnd}
                                    selection clearable={true} options={Time} onChange={this.props.addingAction.handleChange.bind(this, 'timeEnd')} />
                            </Col>
                        </Row>
                        <br />
                        <Row><Col md={10}>
                            <h6 >Detail{!this.state.isHiddenDetail && <Down id="down" onClick={this.hidden.bind(this, "detail")} />}{this.state.isHiddenDetail && <Up id="down" onClick={this.hidden.bind(this, "detail")} />}</h6>
                            {this.state.isHiddenDetail &&
                                <div>
                                    <br />
                                    <Row>
                                        <Col><input className="sec" value={data.sec} placeholder="Sec" onChange={this.props.addingAction.addValue.bind(this)} /></Col>
                                        <Col><input className="place" value={data.place} placeholder="Place" onChange={this.props.addingAction.addValue.bind(this)} /></Col>
                                    </Row>
                                    <Row>
                                        {/* <Col><input className="other" value={this.props.data.sec} placeholder="Other" onChange={this.props.addingAction.addValue()} /></Col> */}
                                    </Row>
                                </div>

                            }
                            <button onClick={this.addBtn} className="add-btn" >ADD</button>
                        </Col></Row>
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
    schedule: state.schedule.schedule
})

const mapDispatchToProps = dispatch => ({
    addingAction: bindActionCreators(addingAction, dispatch),
    clearData: () => dispatch({ type: Action.CLEAR }),
    invalidInputed: (invalid) => dispatch({ type: Action.INVALID, invalid }),
    addData: (newSchedule) => dispatch({ type: Action.ADDDATA, schedule: newSchedule })
})

export default connect(mapStateToProps, mapDispatchToProps)(InputSubject);

