import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import '../asset/css/schedule.css';
import 'bootstrap/dist/css/bootstrap.css';
import EditColor from './EditColor';
import { Popup } from 'semantic-ui-react';

// import styled from 'styled-components'

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
            isAppear: false,
            selCurrent: {
                day: "",
                index: "",
                color: "",
            },
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
        }
        // console.log(this.state.startTime,this.state.lastTime)
    }

    // shouldComponentUpdate(nextProps,nextState){
    //     if(this.props.data !== nextProps.data || this.state !== nextState){
    //         return true
    //     }
    //     // if(this.state !== nextState)
    //     //     return true
    //     return false
    // }

    // componentWillUpdate(nextProps){
    //     if(this.props.data !== nextProps.data)
    //         this.setTime()

    // }


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

    setColor = (color, data) => {
        data = data.target
        let day = data.getAttribute("id")
        let index = data.getAttribute("index")
        this.setState({
            selCurrent: {
                color,
                day,
                index
            }
        })
    }

    editColor = (newColor) => {
        let { day, color, index } = this.state.selCurrent
        if (newColor !== color) {
            this.setState(prevState =>
                ({
                    selCurrent: {
                        ...prevState.selCurrent,
                        color: newColor
                    }
                }))

            color = newColor
            switch (day) {
                case "Md":
                    Md[index].color = color
                    break
                case "Md2":
                    Md2[index].color = color
                    break
                case "Td":
                    Td[index].color = color
                    break
                case "Td2":
                    Td2[index].color = color
                    break
                case "Wd":
                    Wd[index].color = color
                    break
                case "Wd2":
                    Wd2[index].color = color
                    break
                case "Thd":
                    Thd[index].color = color
                    break
                case "Thd2":
                    Thd2[index].color = color
                    break
                case "Fd":
                    Fd[index].color = color
                    break
                case "Fd2":
                    Fd2[index].color = color
                    break
                case "Sd":
                    Sd[index].color = color
                    break
                case "Sd2":
                    Sd2[index].color = color
                    break
                case "Sud":
                    Sud[index].color = color
                    break
                case "Sud2":
                    Sud2[index].color = color
                    break
                default:
                    console.log("this's not in case")
            }

        }
    }

    pushing = d => {
        let D = []
        let D2 = []
        let box = []
        let box2 = []
        let rm = []
        this.props.data.forEach((v) => {
            if (v.day === d)
                D.push(v)
        })
        D.sort((a, b) => parseFloat(a.timeStart) - parseFloat(b.timeStart))
        let prev = 0
        for (let i = 1; i < D.length; i++) {
            // console.log(prev, i)
            if (D[i].timeStart < D[prev].timeEnd) {
                // console.log(D, D2)
                D[prev].overlap = true
                D2.push(D[i])
                rm.push(i)
                D[i].day += '2'
                if (D[prev].timeEnd <= D[i].timeEnd)
                    box.push([D[prev].timeEnd, D[i].timeEnd])
                if (D[prev].timeStart <= D[i].timeStart)// && D2.length<=1)
                    box2.push([D[prev].timeStart, D[i].timeStart])
            }
            else prev = i
        }
        for (let i = 0; i < rm.length; i++)
            delete D[rm[i]];
        D = D.filter(() => { return true })
        // let endBef=-1
        // D2.forEach(v=>{
        //     if(endBef!==-1){
        //         box2.push(D[prev.time])
        //     } 
        //     endBef = v.timeEnd
        // })

        // console.log(box, box2)

        return [D, D2, box, box2]

    }

    overlapSubject = (e, box) => {
        let tableOver = []
        let count = 0;
        e.forEach(subject => {
            let { course, name, timeStart: start, timeEnd: end, place, sec, day, color } = subject
            let { day: eday, index: eindex, color: ecolor } = this.state.selCurrent
            let newColor = (eday === day && eindex === count) ? ecolor : color
            // console.log(day)
            // console.log(eday,eindex)
            let que = count % 2 === 0 ? "even" : "odd";
            let cspan = (end - start) * 2


            box.forEach(s => {
                if (s[1] === start && s[1] - s[0] !== 0) {
                    tableOver.push(<td className="space" colSpan={(s[1] - s[0]) * 2}></td>)
                }
            })
            tableOver.push(
                <Popup
                    trigger={
                        <td className="align-middle" style={{ backgroundColor: newColor }} index={count}
                            id={day} q={que} rowSpan="1" colSpan={cspan} onClick={this.setColor.bind(this, color)}>
                            {course} {name}<br /><small>{sec} {place}</small>
                        </td>
                    }
                    content={
                        <EditColor data={subject} color={this.editColor} />
                    }
                    on='click'
                    flowing
                />

                // <td className="align-middle"  id={day} q={que} rowSpan="1" colSpan={cspan} >{course}<br />{name}<br /><small>{sec} {place}</small></td>

            )
            count++
        })
        return tableOver
    }

    pushSubject = (e, box) => {
        let table = []
        var prevEnd = this.state.startTime
        let count = 0;
        e.forEach(subject => {
            let { course, name, timeStart: start, timeEnd: end, place, sec, day, color } = subject
            let { day: eday, index: eindex, color: ecolor } = this.state.selCurrent
            let newColor = (eday === day && eindex === count) ? ecolor : color
            //set space before subject
            //check space overlap
            for (let i = 0; i < box.length; i++) {
                if (box[i][0] === prevEnd && (box[i][1] - box[i][0]) !== 0) {
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
            table.push(
                <Popup
                    trigger={
                        <td className="align-middle" style={{ backgroundColor: newColor }} index={count}
                            id={day} q={que} rowSpan={rspan} colSpan={cspan} onClick={this.setColor.bind(this, color)}>
                            {course} {name}<br /><small>{sec} {place}</small>
                        </td>
                    }
                    content={
                        <EditColor data={subject} color={this.editColor} />
                    }
                    on='click'
                    flowing
                />
            )
            prevEnd = end
            count++

            if (start < this.state.startTime)
                this.setState({ startTime: parseInt(start) })
            if (end > this.state.lastTime)
                this.setState({ lastTime: parseInt(end) + 1 })
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
        head.push(<th colSpan="2">#</th>)
        for (let i = start; i < end; i++) {
            let time = i < 10 ? `0${i}.00` : `${i}.00`
            head.push(<th className="time" colSpan="2">{time}</th>)
        }
        return head
    }

    base = () => {
        let table = [];
        let { startTime: start, lastTime: end } = this.state

        // table.push(<Tds className="base" colSpan="1" />)
        len = (parseInt(this.state.lastTime) - parseInt(this.state.startTime) + 1) * 2
        for (let i = 0; i < (end - start + 1) * 2; i++) {
            table.push(<td colSpan="1" style={{ backgroundColor: "#3d3d3f", width: `${100 / len}%` }} />)
        }
        return table
    }

    setTime = () => {
        this.setState({
            startTime: ST,
            lastTime: LT,
        })
    }


    render() {
        return (
            <React.Fragment >
                {this.representData()}
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