import React, { Component } from 'react'
import './css/course.css'
import 'bootstrap/dist/css/bootstrap.css'
import './css/Sidebar.css'
import Select from 'react-select'
// import { Container, Row, Col } from 'reactstrap';
import { Button, ButtonGroup } from 'reactstrap'
import { ReactComponent as Down } from './icon/down.svg'
import { ReactComponent as Up } from './icon/up.svg'
import ListBox from './ListBox'
import Selecting from './Selecting'
import Schedule from './Schedule'
// import Sidebar from './Sidebar'

import Time from './data/time.json'
import Day from './data/day.json'


var data = [
  {
    "course": 123450,
    "name": "Lab2",
    "sec": "",
    "day": "Md",
    "timeStart": 9.5,
    "timeEnd": 10.5,
    "place": "",
    "color": "",
  },
  {
    "course": 111110,
    "name": "compro",
    "sec": "",
    "day": "Md",
    "timeStart": 10.5,
    "timeEnd": 12.5,
    "place": "E15",
    "color": "",
  },
  {
    "course": 114400,
    "name": "comarc",
    "sec": "999",
    "day": "Td",
    "timeStart": 6.5,
    "timeEnd": 18.5,
    "place": "",
    "color": "",
  },
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sel: "",
      schedule: data,
      click: false,
      isHiddenMain: true,
      isHiddenOther: false,
      isHiddenDetail: false,
      selectTimeStart: null,
      selectTimeEnd: null,
      selectDay: null,
      dayInput: "",
      timeStartInput: "",
      timeEndInput: "",
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
    this.selCourse = this.selCourse.bind(this)
    this.dataFromList = this.dataFromList.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }

  addBtn() {
    let { day, timeStart, timeEnd, course } = this.state.data
    // console.log(this.state)
    if (this.state.selectDay === null)
      this.setState({ dayInput: "invalidInput" })
    if (this.state.selectTimeStart === null)
      this.setState({ timeStartInput: "invalidInput" })
    if (this.state.selectTimeEnd === null)
      this.setState({ timeEndInput: "invalidInput" })
    if (course !== "" && day !== "" && timeStart !== "" && timeEnd !== "" && (timeEnd > timeStart)) {
      console.log("data: ", this.state.data)
      this.state.schedule.push(this.state.data)
      console.log("schedule : ", this.state.schedule)
      this.setState(
        {
          dayInput: '',
          click: true,
          selectTimeStart: null,
          selectTimeEnd: null,
          selectDay: null,
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
    // console.log(this.state.schedule)
    // this.state.table.push(<p className="text-table"><button className="rm-btn" >X</button>{course} {name}</p>)

  }

  addValue = e => {
    let value = e.target.value
    let name = e.target.placeholder
    // console.log(value, name);

    //preVState is other data
    this.setState(prevState => (
      {
        data: {
          ...prevState.data,
          [name]: value
        }
      }))
    // console.log(this.state.data);
  }

  dataFromList = (newData) => {
    this.setState({ schedule: newData })
  }

  selCourse(sel) {
    this.setState(prevState => (
      {
        //prevState is other data if this don't have data will left 'name' and 'course'
        click: false,
        data: {
          ...prevState.data,
          course: sel.course,
          name: sel.name
        }
      }))
  }

  handleChange(set, select) {
    let time = select.value
    // console.log(select.target.className)
    if (set === "timeStart") {
      this.setState(prevState => (
        {
          timeStartInput: "",
          selectTimeStart: select,
          data: {
            ...prevState.data,
            timeStart: time
          }
        }))
    }
    else if (set === "timeEnd") {
      this.setState(prevState => (
        {
          timeEndInput: "",
          selectTimeEnd: select,
          data: {
            ...prevState.data,
            timeEnd: time
          }
        }))
    }
    else if (set === "day") {
      this.setState(prevState => (
        {
          dayInput: "",
          selectDay: select,
          data: {
            ...prevState.data,
            day: time
          }
        }))
    }
    // console.log(`Option selected:`, this.state.data);

  }

  hidden = (set) => {
    if (set === "main") {
      this.setState({
        isHiddenMain: true,
        isHiddenOther: false,
      })
    }
    else if (set === "other") {
      this.setState({
        isHiddenMain: false,
        isHiddenOther: true,
      })
    }
  }
  showDetail = () => {
    this.setState({
      isHiddenDetail: !this.state.isHiddenDetail
    })
  }

  render() {
    return (
      <React.Fragment>
        <br />
        <br />
        <br />
        <hr />
        <br />
        {/* <div style={{ display: 'flex', alignItems: 'flex-start' }}> */}
        {/* <StickyBox className="sidebar">Sidebar</StickyBox> */}
        {/* <Sidebar /> */}
        <div>
          <div className="row">
            <div className="col-sm-1 col-md-3" />
            <div className="col-sm-4 col-md-6">
              <div className="add-sub">
                <br />
                <h3 className="sel-course">Add subject</h3>
                <div className="main-course">
                  <div className="tabInput">
                    <ButtonGroup>
                      <Button onClick={this.hidden.bind(this, "main")}>วิชาบูรณาการ</Button>
                      <Button onClick={this.hidden.bind(this, "other")}>อื่นๆ</Button>
                    </ButtonGroup>
                  </div>
                  <br />
                  {this.state.isHiddenMain && <Selecting className="subject" value={this.state.data.course} onChange={this.selCourse} select="course" />}
                  {this.state.isHiddenOther &&
                    <div className="row">
                      <div className="col-sm-5 col-md-6"> <input className="course" value={this.state.data.course} type="course" placeholder="course" onChange={this.addValue} /></div>
                      <div className="col-sm-5 col-md-6"> <input className="name" value={this.state.data.name} type="course" placeholder="name" onChange={this.addValue} /></div>
                    </div>
                  }
                  <div className="row">
                    <div className="col-sm-8 col-md-12">
                      <Select id={this.state.dayInput} className="day" value={this.state.selectDay} onChange={this.handleChange.bind(this, 'day')} options={Day} isSearchable={false} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4 col-md-6">
                      <Select id={this.state.timeStartInput} className="timestart" value={this.state.selectTimeStart} onChange={this.handleChange.bind(this, 'timeStart')} options={Time} />
                      {/* <input className="time" value={this.state.data.time_start} type="course" placeholder="time_start" onChange={this.addValue} /> */}
                    </div>
                    <div className="col-sm-4 col-md-6">
                      <Select id={this.state.timeEndInput} className="timeend" value={this.state.selectTimeEnd} onChange={this.handleChange.bind(this, 'timeEnd')} options={Time} />
                      {/* <input className="time" value={this.state.data.timeEnd} type="course" placeholder="time_end" onChange={this.addValue} /> */}
                    </div>
                  </div>
                  <br />
                  <h6 >Detail{!this.state.isHiddenDetail && <Down id="down" onClick={this.showDetail} />}{this.state.isHiddenDetail && <Up id="down" onClick={this.showDetail} />}</h6>
                  {this.state.isHiddenDetail &&
                    <div className="row">
                      <div className="col-sm-3 col-md-5"> <input className="sec" value={this.state.data.sec} type="course" placeholder="sec" onChange={this.addValue} /></div>
                      <div className="col-sm-3 col-md-5"> <input className="place" value={this.state.data.place} type="course" placeholder="place" onChange={this.addValue} /></div>
                    </div>
                  }
                  {!this.state.isHiddenDetail && <h5 id="showDetail"></h5>}
                </div>
                <br />
                <button onClick={this.addBtn} className="add-btn" >ADD</button>
                <br />
                <br />
              </div>
            </div>
            <div className="col-sm-1 col-md-3" />
          </div>
          <br />
          <br />
          <ListBox clickState={this.state.click} dataFromList={this.dataFromList} data={this.state.schedule} />
          <br />
          {/* <Schedule/> */}
          <Schedule data={this.state.schedule} />
        </div>
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default App;
