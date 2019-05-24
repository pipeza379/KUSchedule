import React, { Component } from 'react'
import { CompactPicker } from 'react-color'
// import Select from 'react-select'

import './css/EditSubject.css'
import { ReactComponent as AddBtn } from './icon/add.svg'
import { ReactComponent as ColorBtn } from './icon/edit-color.svg'


var selData = {
    selCourse: "",
    selSubject: "",
    selDay: "",
    selTimeStart: "",
    selTimeEnd: "",
}

class EditSubject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isHidden: false,
            setBorder: "#FFFFFF",
            setColor: "#FFFFFF",

        }
        this.editFinish = this.editFinish.bind(this)
        this.editColor = this.editColor.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== undefined && nextProps.data !== this.props.data) {
            let color = nextProps.data.color === "" ? "#FFFFFF" : nextProps.data.color
            this.setState({
                setColor: color,
            })
        }
    }

    onChangePicker = (color) => {
        if (this.props.data) {
            this.setState({
                setColor: color.hex,
            })
        }
    }

    editColor = () => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    selectSubject() {
        if (this.props.data) {
            let { course, name, place, sec } = this.props.data
            sec = sec === "" ? "" : "sec " + sec
            let detail = sec !== "" || place !== "" ? sec + place : ""
            selData.selCourse = course
            selData.selSubject = name
            return (
                <div>
                    <div style={{ textAlign: "center", position: "relative", top: "10%" }}>
                        <br />
                        <h6>{course}</h6>
                        <h6>{name}</h6>
                        <p>{detail}</p>
                        <br />
                    </div>
                    <div className="col-sm-5 col-md-6"> <input className="course" value={selData.selCourse} placeholder="course" /></div>
                    <div className="col-sm-5 col-md-6"> <input className="name" value={selData.selSubject} placeholder="name" /></div>
                </div>
            )
        }
    }

    editFinish = () => {
        console.log(this.props.data)
        if (this.props.data)
            this.props.data.color = this.state.setColor
    }

    render() {
        const boxStyle = {
            backgroundColor: this.state.setColor,
            borderColor: this.state.setBorder
        }

        return (
            <React.Fragment>
                <div className="EditBox">
                    <div className="BoxSubject" style={boxStyle}>
                        {this.selectSubject()}
                    </div>
                    <div className="BoxColor">
                        {this.state.isHidden && <CompactPicker color={this.state.setColor} onChange={this.onChangePicker} />}
                    </div>
                    <ColorBtn onClick={this.editColor} />
                    <AddBtn onClick={this.editFinish} />
                </div>
            </React.Fragment>
        )
    }
}

export default EditSubject
