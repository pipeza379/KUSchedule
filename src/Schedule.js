import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import './css/schedule.css'
import 'bootstrap/dist/css/bootstrap.css'
import styled from 'styled-components'
// import { Container} from 'reactstrap';


var boxSpace = {
    Md: [], Md2: [],
    Td: [], Td2: [],
    Wd: [], Wd2: [],
    Thd: [], Thd2: [],
    Fd: [], Fd2: [],
    Sd: [], Sd2: [],
    Sud: [], Sud2: [],
}
var Md, Td, Wd, Thd, Fd, Sd, Sud = []
var Md2, Td2, Wd2, Thd2, Fd2, Sd2, Sud2 = []
// var space = [0, 0, 0, 0, 0, 0] // SMd,STd,SWd,STh,SFd,SSd,

var len = 20
const ST = 8
const LT = 17

// var Tds = styled.td`
//     background-color: rgb(61, 61, 63);
//     width: ${100 / len}%;
// `


class Schedule extends Component {
    constructor() {
        super()
        this.state = {
            // lenght: 23,
            startTime: ST,
            lastTime: LT, //subject finish
        }
        this.representData = this.representData.bind(this)
        this.pushSubject = this.pushSubject.bind(this)
        this.checkLastDay = this.checkLastDay.bind(this)
        this.createHeadTable = this.createHeadTable.bind(this)
        this.overlapSubject = this.overlapSubject.bind(this)
        this.base = this.base.bind(this)
        this.setTime = this.setTime.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setTime()
            console.log(len)
        }
        // console.log(this.state.startTime,this.state.lastTime)
    }

    representData = () => {
        // console.log(this.props.data)
        // if (this.props.clickState) {
        // if (true) {
        if (this.props.data) {
            let d
            d = this.pushing("Md")
            Md = d[0]
            Md2 = d[1]
            boxSpace.Md = d[2]
            boxSpace.Md2 = d[3]

            d = this.pushing("Td")
            Td = d[0]
            Td2 = d[1]
            boxSpace.Td = d[2]
            boxSpace.Td2 = d[3]

            d = this.pushing("Wd")
            Wd = d[0]
            Wd2 = d[1]
            boxSpace.Wd = d[2]
            boxSpace.Wd2 = d[3]

            d = this.pushing("Thd")
            Thd = d[0]
            Thd2 = d[1]
            boxSpace.Thd = d[2]
            boxSpace.Thd2 = d[3]

            d = this.pushing("Fd")
            Fd = d[0]
            Fd2 = d[1]
            boxSpace.Fd = d[2]
            boxSpace.Fd2 = d[3]

            d = this.pushing("Sd")
            Sd = d[0]
            Sd2 = d[1]
            boxSpace.Sd = d[2]
            boxSpace.Sd2 = d[3]

            d = this.pushing("Sud")
            Sud = d[0]
            Sud2 = d[1]
            boxSpace.Sud = d[2]
            boxSpace.Sud2 = d[3]
        }
    }

    pushing = d => {
        let D = []
        let D2 = []
        let box = []
        let box2 = []
        this.props.data.map((v) => {
            // data.map((v) => {
            if (v.day === d) {
                D.push(v)
            }
            return 0
        })
        D.sort((a, b) => parseFloat(a.timeStart) - parseFloat(b.timeStart))

        let prev = -1
        for (let i = 0; i < D.length; i++) {
            if (prev !== -1 && D[i].timeStart < D[prev].timeEnd) {
                D[prev].overlap = true
                box.push([D[prev].timeEnd, D[i].timeEnd])
                box2.push([D[prev].timeStart, D[i].timeStart])
                D2.push(D[i])
                D.splice(i, 1)
            }
            prev = i
        }

        return [D, D2, box, box2]
    }

    overlapSubject = (e, box) => {
        let tableOver = []
        let count = 0;
        e.map(subject => {
            let { course, name, timeStart: start, timeEnd: end, place, sec, day } = subject
            let que = count % 2 === 0 ? "even" : "odd";
            let cspan = (end - start) * 2

            box.map(s => {
                if (s[1] === start && s[1] - s[0]!==0) {
                    tableOver.push(<td className="space" colSpan={(s[1] - s[0]) * 2}></td>)
                }
                return 0
            })
            tableOver.push(<td className="align-middle" id={day} q={que} rowSpan="1" colSpan={cspan} >{course}<br />{name}<br /><small>{sec} {place}</small></td>)
            count++
            return 0
        })
        return tableOver
    }

    pushSubject = (e, box) => {
        let table = []
        var prevEnd = this.state.startTime
        let count = 0;
        e.map(subject => {
            // console.log(subject)
            let { course, name, timeStart: start, timeEnd: end, place, sec, day, color } = subject
            //set space before subject

            //check space overlap
            for (let i = 0; i < box.length; i++) {
                if (box[i][0] === prevEnd && (box[i][1] - box[i][0])!==0) {
                    console.log(box[i])
                    table.push(<td className="space" rowSpan="1" colSpan={(box[i][1] - box[i][0]) * 2}></td>)
                    prevEnd = box[i][1]
                }
            }

            if (start - prevEnd !== 0)
                table.push(<td className="space" rowSpan="2" colSpan={(start - prevEnd) * 2}></td>)

            let cspan = (end - start) * 2
            let rspan = subject.overlap ? 1 : 2
            let que = count % 2 === 0 ? "even" : "odd";
            sec = sec === "" ? "" : "sec " + sec
            if (color === "")
                table.push(<td className="align-middle" id={day} q={que} rowSpan={rspan} colSpan={cspan} >{course}<br />{name}<br /><small>{sec} {place}</small></td>)
            else
                table.push(<td className="align-middle" style={{ backgroundColor: color }} id={day} rowSpan={rspan} colSpan={cspan} >{course}<br />{name}<br /><small>{sec} {place}</small></td>)
            prevEnd = end
            count++

            if (start < this.state.startTime)
                this.setState({ startTime: parseInt(start) })
            if (end > this.state.lastTime)
                this.setState({ lastTime: parseInt(end) + 1 })

            return 0
        })
        // set end space
        // console.log(this.state.lastTime, prevEnd)
        let backSpace = this.state.lastTime - prevEnd
        if (backSpace)
            table.push(<td className="space" rowSpan="2" colSpan={(backSpace) * 2}></td>)
        return table
    }

    checkLastDay = () => {
        let table = []
        if (Sd[0] != null || Sud[0] != null) {
            table.push(<tr><th id="head" className="align-middle" rowSpan="2" colSpan="2">Saturday</th>{this.pushSubject(Sd, boxSpace.Sd)}</tr>)
            table.push(<tr>{this.overlapSubject(Sd2, boxSpace.Sd2)}</tr>)
        }
        if (Sud[0] != null) {
            table.push(<tr><th id="head" className="align-middle" rowSpan="2" colSpan="2">Sunday</th>{this.pushSubject(Sud, boxSpace.Sud)}</tr>)
            table.push(<tr>{this.overlapSubject(Sud2, boxSpace.Sud2)}</tr>)
        }
        return table
    }

    createHeadTable = () => {
        // console.log("time: ",this.state.startTime , this.state.lastTime)
        let head = []
        let { startTime: start, lastTime: end } = this.state
        // this.setState({
        //     length: (end - start * 2) + 1
        // })
        head.push(<th className="time" colSpan="2">#</th>)
        for (let i = start; i < end; i++) {
            if (i < 10)
                head.push(<th className="time" colSpan="2">0{i}.00</th>)
            else if (i >= 10)
                head.push(<th className="time" colSpan="2">{i}.00</th>)
        }
        return head
    }

    base = () => {
        let table = [];
        let { startTime: start, lastTime: end } = this.state

        // table.push(<Tds className="base" colSpan="1" />)
        len = (parseInt(this.state.lastTime) - parseInt(this.state.startTime)+1) * 2 
        for (let i = 0; i < (end - start+1) * 2; i++) {
        table.push(<td className="base" colSpan="1" style={{backgroundColor:"#3d3d3f",width:`${100/len}%`}}/>)
        }
        return table
    }

    setTime = () => {
        this.setState({
            startTime: ST,
            lastTime: LT,
        })
        console.log(len)
    }

    render() {
        return (
            <React.Fragment >
                    {this.representData()}
                    <h3 id="Name" style={{ textAlign: "center" }}>YourSchedule</h3>
                    <br />
                    < div className="row" >
                        <div id="table">
                            <Table className="align-middle">
                                <thead className="thead-dark">
                                    <tr className="head">
                                        {/* 0700-0800 */}
                                        {this.createHeadTable()}
                                    </tr>
                                </thead>
                                <tbody className="align-middle">
                                    <tr day="Md">
                                        <th id="head" className="align-middle" rowSpan="2" colSpan="2">Monday</th>
                                        {this.pushSubject(Md, boxSpace.Md)}
                                    </tr>
                                    <tr>
                                        {this.overlapSubject(Md2, boxSpace.Md2)}
                                    </tr>
                                    <tr>
                                        <th id="head" className="align-middle" rowSpan="2" colSpan="2">Tueday</th>
                                        {this.pushSubject(Td, boxSpace.Td)}
                                    </tr>
                                    <tr>
                                        {this.overlapSubject(Td2, boxSpace.Td2)}
                                    </tr>
                                    <tr>
                                        <th id="head" className="align-middle" rowSpan="2" colSpan="2">Wednesday</th>
                                        {this.pushSubject(Wd, boxSpace.Wd)}
                                    </tr>
                                    <tr>
                                        {this.overlapSubject(Wd2, boxSpace.Wd2)}
                                    </tr>
                                    <tr>
                                        <th id="head" className="align-middle" rowSpan="2" colSpan="2">Thursday</th>
                                        {this.pushSubject(Thd, boxSpace.Thd)}
                                    </tr>
                                    <tr>
                                        {this.overlapSubject(Thd2, boxSpace.Thd2)}
                                    </tr>
                                    <tr>
                                        <th id="head" className="align-middle" rowSpan="2" colSpan="2">Friday</th>
                                        {this.pushSubject(Fd, boxSpace.Fd)}
                                    </tr>
                                    <tr>
                                        {this.overlapSubject(Fd2, boxSpace.Fd2)}
                                    </tr>
                                    {this.checkLastDay()}
                                    <tr className="base">
                                        {this.base()}
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
            </React.Fragment >
        )
    }
}

export default Schedule