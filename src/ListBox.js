import React from 'react'
import EditSubject from './EditSubject'

import './css/listbox.css'
import 'bootstrap/dist/css/bootstrap.css'

import { ReactComponent as Edit } from './icon/edit.svg'

class ListBox extends React.Component {
    constructor() {
        super()
        this.state = {
            selectCurrent: null,
            isHidden: false,

        }
        this.createTable = this.createTable.bind(this)
        this.delBtn = this.delBtn.bind(this)
        this.selectSubject = this.selectSubject.bind(this)
        this.editSubject = this.editSubject.bind(this)
    }

    delBtn = (e) => {
        if (this.props.dataFromList) {
            let index = e.target.getAttribute('index')
            let data = this.props.data
            delete data[index]
            data = data.filter(() => { return true });
            this.props.dataFromList(data)
        }
    }

    selectSubject = (e) => {
        this.setState({ selectCurrent: e.target.getAttribute('index') })
    }

    editSubject = () => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    createTable() {
        var x = 0
        if (this.props.data) {
            let table = []
            this.props.data.map((v) => {
                table.push(
                    <div id="list-subject" className="row">
                        <li className="col-1" ><button className="rm-btn" index={x} course={v.course} onClick={this.delBtn}>X</button></li>
                        <li className="col-3" index={x} onClick={this.selectSubject}>{v.course}</li>
                        <li className="col-5" index={x} onClick={this.selectSubject}>{v.name}</li>
                        <li className="col-1" index={x} onClick={this.selectSubject}>{v.timeStart}</li>
                        <li className="col-1" index={x} onClick={this.selectSubject}>{v.timeEnd}</li>
                        <li className="col-1"><Edit onClick={this.editSubject} className="btn-edit" /></li>
                        {/* <i class="material-icons" style="font-size:48px;color:red">border_color</i> */}
                    </div>
                )
                x += 1
                return 0
            })
            return table
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-sm-1 col-md-1" />
                    <div className="col-sm-7 col-md-6">
                        <h3 id="ListBox">List Subjects</h3>
                        <br />
                        <div id="box" className="align-middle">
                            <div id="head-list" className="row">
                                <li id="list-head" className="col-1"></li>
                                <li id="list-head" className="col-3">Course</li>
                                <li id="list-head" className="col-5">Subject</li>
                                <li id="list-head" className="col-1">Start</li>
                                <li id="list-head" className="col-1">End</li>
                                <li id="list-head" className="col-1"></li>
                            </div>
                            {this.createTable()}
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-4">
                        <div className="row">
                            {this.state.isHidden && <EditSubject data={this.props.data[this.state.selectCurrent]} />}
                        </div>
                    </div>
                    <div className="col-sm-1 col-md-1" />
                </div>
            </React.Fragment>
        )
    }
}
export default ListBox