import React, { Component } from 'react'
import { connect } from 'react-redux';
// import axios from 'axios';

class LoadSave extends Component {
    constructor() {
        super()
        this.state = {
            checkClick: false,
        }
    }

    componentDidMount(prevState) {
        if (this.state !== prevState) {
            this.setState({
                checkClick: false,
            })
        }
    }

    handleSaveToPC = jsonData => {
        const fileData = JSON.stringify(jsonData);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'filename.json';
        link.href = url;
        if (this.state.checkClick)
            link.click();
    }

    handleUploadFile = (event) => {
        // let data=[];
        console.log(event.target.file[0])
        // data.append(event.target.files[0]);
        // data.append('name', 'some value user types');
        // data.append('description', 'some value user types');
        // '/files' is your node.js route that triggers our middleware
        // axios.post('/files', data).then((response) => {
        //     console.log(response); // do something with the response
        // });
        // console.log(data)
    }

    render() {
        const schedule = this.props.schedule
        console.log(schedule)
        return (
            <React.Fragment>
                <button onClick={() => { this.setState({ checkClick: true }) }}>click!</button>
                {this.handleSaveToPC(schedule)}
                <div>
                    <input type="file" onChange={this.handleUploadFile} />
                </div>
            </React.Fragment >
        );
    }
}

const mapStateToProps = state => ({
    schedule: state.schedule.schedule,

})
export default connect(mapStateToProps)(LoadSave);
