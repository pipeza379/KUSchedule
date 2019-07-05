import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardContent, CardDescription, CardHeader } from "semantic-ui-react";

import * as editSubject from '../actions/editSubject'

import '../asset/css/listbox.css'
import Time from '../asset/data/time2.json'
import Day from '../asset/data/day2.json'

import Edit from '../asset/icon/edit.svg'
import Delete from '../asset/icon/delete.svg'

class ListBox extends React.Component {
    constructor() {
        super()
        // this.state = {
        //     selectCurrent: null,
        //     isHidden: false,
        // }
        this.createTable = this.createTable.bind(this)
        this.selectSubject = this.selectSubject.bind(this)
    }

    selectSubject = (e) => {
        this.setState({ selectCurrent: e.target.getAttribute('index') })
    }

    createTable() {
        var x = 0
        let table = []
        this.props.schedule.forEach((v) => {
            let ts = Time[(v.timeStart * 2) - 12]
            let te = Time[(v.timeEnd * 2) - 12]
            let place = v.place === "" ? '' : "Place " + v.place
            let sec = v.sec === "" ? '' : "Sec " + v.sec
            let day =  v.day[(v.day).length-1]==="2" ? v.day.split("2")[0]:v.day 
            let c = Day.filter(d => d.value === day)
            table.push(
                <Card className="card" fluid color={c[0].color} key={x} >
                    <CardContent>
                        <CardHeader>
                            <Row style={{ padding: "5px 20px 0px 0px " }}>
                                <Col md={10}>
                                    <span>{v.course} {v.name}</span>
                                </Col>
                                <Col md={1}><img src={Edit} alt="icon" className="edit" index={x} onClick={this.props.editSubject.editSub.bind(this, this.props.schedule)} /></Col>
                                <Col md={1}><img src={Delete} alt="icon" className="rm" index={x} onClick={this.props.editSubject.removeSubject.bind(this, this.props.schedule)} /></Col>
                            </Row>
                        </CardHeader>
                        <CardDescription>
                            <span style={{ padding: "0px 0px 0px 20px " }}>{sec} {place} Time: {ts.text} - {te.text}</span>
                        </CardDescription>
                    </CardContent>
                </Card>
            )
            x += 1
        })
        return table
    }

    render() {
        return (
            <React.Fragment>
                <Container fluid>
                    <h3 id="ListBox">List Subjects</h3>
                    <br />
                    <div className="box">
                        <Card.Group>
                            {this.createTable()}
                        </Card.Group>
                    </div>
                    <br />
                    <br />
                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    schedule: state.schedule.schedule,

})

const mapDispatchToProps = dispatch => ({
    editSubject: bindActionCreators(editSubject, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListBox);

