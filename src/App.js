import React, { Component } from 'react'
import './asset/css/app.css'
// import './css/Sidebar.css'
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InputSubject from './component/addSubject'
import ListBox from './component/ListBox'
// import Selecting from './Selecting'
import Schedule from './component/Schedule'
// import Sidebar from './Sidebar'
import LoadSave from './component/LoadSave'

import * as addingAction from './actions/addSub'

class App extends Component {
  constructor() {
    super()
    this.state = {
      checkClick: false,
      editName: false,
    }
  }

  componentDidMount(prevState) {
    if (this.state !== prevState) {
      this.setState({
        checkClick: false,
      })
    }
  }

  editName = () => {
    this.setState({ editName: true })
  }

  render() {
    const schedule = this.props.schedule
    // console.log(schedule)
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
              <InputSubject />
              {/* <button onClick={() => { this.setState({ checkClick: true }) }}>click!</button> */}
              {/* {this.handleSaveToPC(schedule)} */}
            </Col>
            <Col>
              <ListBox />
            </Col>
            <br />
          </Row>
        </Container>
        <Row>
          <Col md={{ size: 4, offset: 4 }}>
            <input className="schedule-name" value={this.props.name} placeholder="EditScheduleName" onChange={this.props.addingAction.addValue.bind(this)} />
          </Col>
        </Row>
        <Schedule data={schedule} />
        <Row>
          <Col>
            <LoadSave />
          </Col>
        </Row>
        {/* </div> */}
      </React.Fragment >
    );
  }
}

const mapStateToProps = state => ({
  name: state.addSubject.name,
  schedule: state.schedule.schedule,

})
const mapDispatchToProps = dispatch => ({
  addingAction: bindActionCreators(addingAction, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
