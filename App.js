import React, { Component } from 'react'
import '../asset/css/course.css'
import '../asset/css/Sidebar.css'
import { ReactComponent as Down } from '../asset/icon/down.svg'
import { ReactComponent as Up } from '../asset/icon/up.svg'
import { Container, Row, Col } from 'reactstrap';
import { Dropdown } from 'semantic-ui-react';
import ListBox from './component/ListBox'
// import Selecting from './Selecting'
import Schedule from './component/Schedule'
// import Sidebar from './Sidebar'

import Time from './data/time2.json'
import Day from './data/day2.json'
import Data from './data/data.json'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      schedule: data,
      isActiveMain: true,
      isActiveOther: false,
      isHiddenDetail: false,
      valSub: "",
      invalid: {
        course: "",
        name: "",
        day: "",
        timeStart: "",
        timeEnd: "",
      },
      data: {
        "course": "",
        "name": "",
        "sec": "",
        "day": "",
        "timeStart": "",
        "timeEnd": "",
        "place": "",
        "color": "",
      }

    }
    this.addBtn = this.addBtn.bind(this)
    this.addValue = this.addValue.bind(this)
    // this.selCourse = this.selCourse.bind(this)
    this.dataFromList = this.dataFromList.bind(this)
  }

  addBtn() {
    let { day, name, timeStart, timeEnd, course } = this.state.data
    console.log(this.state.data)
    let inp_course, inp_name, inp_day, inp_ts, inp_te = ""

    inp_name = "invalidInput"
    inp_course = course === "" ? "invalidInput" : ""
    inp_name = name === "" ? "invalidInput" : ""
    inp_day = day === "" ? "invalidInput" : ""
    inp_ts = timeStart === "" || (timeEnd !== "" && timeStart >= timeEnd) ? "invalidInput" : ""
    inp_te = timeEnd === "" || (timeStart !== "" && timeEnd <= timeStart) ? "invalidInput" : ""

    this.setState({
      invalid: {
        course: inp_course,
        name: inp_name,
        day: inp_day,
        timeStart: inp_ts,
        timeEnd: inp_te,
      }
    })

    if (course !== "" && name !== "" && day !== "" && timeStart !== "" && timeEnd !== "" && (timeEnd > timeStart)) {
      console.log("data: ", this.state.data)
      this.state.schedule.push(this.state.data)
      console.log("schedule : ", this.state.schedule)
      this.setState(
        {
          valSub: "",
          invalid: {
            course: "",
            name: "",
            day: "",
            timeStart: "",
            timeEnd: "",
          },
          data: {
            course: "",
            name: "",
            sec: "",
            day: "",
            timeStart: "",
            timeEnd: "",
            place: "",
            color: "",
          }
        }
      )
    }
  }

  addValue = e => {
    let value = e.target.value
    let name = e.target.className

    //preVState is other data
    this.setState(prevState => (
      {
        data: {
          ...prevState.data,
          [name]: value
        }
      }))
  }

  dataFromList = (newData) => {
    this.setState({ schedule: newData })
  }

  // selCourse = sel => {
  //   console.log(sel)
  //   this.setState(prevState => (
  //     {
  //       //prevState is other data if this don't have data will left 'name' and 'course'
  //       click: false,
  //       data: {
  //         ...prevState.data,
  //         course: sel.course,
  //         name: sel.name
  //       }
  //     }))
  // }

  handleChange = (set, event, data) => {
    let val = data.value
    if (set === "timeStart") {
      this.setState(prevState => (
        {
          data: {
            ...prevState.data,
            timeStart: val
          }
        }))
    }
    else if (set === "timeEnd") {
      this.setState(prevState => (
        {
          data: {
            ...prevState.data,
            timeEnd: val
          }
        }))
    }
    else if (set === "day") {
      this.setState(prevState => (
        {
          data: {
            ...prevState.data,
            day: val
          }
        }))
    }
    else if (set === "subject") {
      let { course, name } = val
      this.setState(prevState => (
        {
          valSub: val,
          //prevState is other data if this don't have data will left 'name' and 'course'
          data: {
            ...prevState.data,
            course,
            name
          }
        }))
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


    return (
      <React.Fragment>
        <br />
        <br />
        <h1 style={{ textAlign: "center" }}>KUSchedule</h1>
        <br />
        <hr />
        <br />
        {/* <div style={{ display: 'flex', alignItems: 'flex-start' }}> */}
        {/* <StickyBox className="sidebar">Sidebar</StickyBox> */}
        {/* <Sidebar /> */}
        <Container>
          <Row>
            <Col>
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
                      <Dropdown style={{ width: "100%", borderRadius: "25px", marginBottom: "4%", border: `${this.state.inputSelSub}` }}
                        id={this.state.invalid.name} placeholder="Select Subject" value={this.state.valSub}
                        search selection options={Data} onChange={this.handleChange.bind(this, "subject")} />
                    </Col></Row>}
                  {this.state.isActiveOther &&
                    <Row>
                      <Col md={5}> <input className="course" id={this.state.invalid.course} value={this.state.data.course} placeholder="Course" onChange={this.addValue} /></Col>
                      <Col md={5}> <input className="name" id={this.state.invalid.name} value={this.state.data.name} placeholder="Subject" onChange={this.addValue} /></Col>
                    </Row>
                  }
                  <Row>
                    <Col md={10}>
                      <Dropdown style={{ width: "100%", borderRadius: "25px", marginBottom: "4%" }}
                        id={this.state.invalid.day} placeholder="Select Day" value={this.state.data.day}
                        selection options={Day} onChange={this.handleChange.bind(this, 'day')} />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={5}>
                      <Dropdown style={{ width: "100%", borderRadius: "25px", marginBottom: "4%", position: "relative" }}
                        id={this.state.invalid.timeStart} placeholder="Select Start" value={this.state.data.timeStart}
                        selection options={Time} onChange={this.handleChange.bind(this, 'timeStart')} />
                    </Col>
                    <Col md={5}>
                      <Dropdown style={{ width: "100%", borderRadius: "25px", marginBottom: "4%", position: "relative" }}
                        id={this.state.invalid.timeEnd} placeholder="Select End" value={this.state.data.timeEnd}
                        selection clearable={true} options={Time} onChange={this.handleChange.bind(this, 'timeEnd')} />
                    </Col>
                  </Row>
                  <br />
                  <Row><Col md={10}>
                    <h6 >Detail{!this.state.isHiddenDetail && <Down id="down" onClick={this.hidden.bind(this, "detail")} />}{this.state.isHiddenDetail && <Up id="down" onClick={this.hidden.bind(this, "detail")} />}</h6>
                    {this.state.isHiddenDetail &&
                      <div>
                        <br/>
                        <Row>
                          <Col><input className="sec" value={this.state.data.sec} placeholder="Sec" onChange={this.addValue} /></Col>
                          <Col><input className="place" value={this.state.data.place} placeholder="Place" onChange={this.addValue} /></Col>
                        </Row>
                        <Row>
                          <Col><input className="other" value={this.state.data.sec} placeholder="Other" onChange={this.addValue} /></Col>
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
            </Col>
            <Col>
              <ListBox clickState={this.state.click} dataFromList={this.dataFromList} data={this.state.schedule} />
            </Col>
            <br />
          </Row>
        </Container>
        <Schedule data={this.state.schedule} />

        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default App;
