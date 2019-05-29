import React, { Component } from 'react'
import './css/course.css'
import './css/Sidebar.css'
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import InputSubject from './component/addSubject'
import ListBox from './component/ListBox'
// import Selecting from './Selecting'
import Schedule from './component/Schedule'
// import Sidebar from './Sidebar'

class App extends Component {
  render() {
    
    const schedule = this.props.schedule
    console.log(schedule)
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
            </Col>
            <Col>
              <ListBox/>
            </Col>
            <br />
          </Row>
        </Container>
        <Schedule data={schedule} />

        {/* </div> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  schedule: state.schedule.schedule,

})
export default connect(mapStateToProps)(App);
