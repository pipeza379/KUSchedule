import React from 'react'

import './css/listbox.css'
import Time from './data/time2.json'
import Day from './data/day2.json'

import { ReactComponent as Edit } from './icon/edit.svg'
import { ReactComponent as Erase } from './icon/eraser.svg'
import { Container, Row, Col } from 'reactstrap';
import { Card, CardContent, CardDescription, CardHeader} from "semantic-ui-react";

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
        console.log("del")
        let index = e.target.getAttribute('index')
        console.log(index)
        console.log(e.target)
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
            this.props.data.forEach((v) => {
                let ts = Time[(v.timeStart * 2) - 12]
                let te = Time[(v.timeEnd * 2) - 12]
                let place = v.place === "" ? '' : "Place "+v.place
                let sec = v.sec === "" ? '' : "Sec "+v.sec
                let c = Day.filter(d => d.value === v.day)
                table.push(
                    <Card className="card" fluid color={c[0].color} key={x} >
                        <CardContent>
                            <CardHeader>
                                <Row style={{ padding: "5px 20px 0px 0px " }}>
                                    <Col md={10}>
                                        <span>{v.course} {v.name}</span>
                                    </Col>
                                    <Col md={1}><Erase className="rm" index={x} onClick={this.delBtn}></Erase></Col>
                                    <Col md={1}><Edit className="edit" index={x} onClick={this.editSubject} /></Col>
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
                    <br/>
                    <br/>
                    {/* <Col>
                        {this.state.isHidden && <EditSubject data={this.props.data[this.state.selectCurrent]} />}
                    </Col> */}
                </Container>
            </React.Fragment>
        )
    }
}
export default ListBox