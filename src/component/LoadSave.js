import React, { Component } from 'react'
import { connect } from 'react-redux';
import Action from '../actions';
import save from '../asset/icon/save.svg'
import load from '../asset/icon/upload.svg'
import "../asset/css/LoadSave.css"


class LoadSave extends Component {

    handleSaveToPC = () => {
        const schedule = { schedule: this.props.schedule, name: this.props.name }
        const fileData = JSON.stringify(schedule);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        let name_file = this.props.name !== ""?`${this.props.name}.json`:"schedule.json"
        link.download = name_file;
        link.href = url;
        link.click();
    }

    handleUploadFile = (event) => {
        const file = event.target.files[0]
        var reader = new FileReader();
        var json
        reader.readAsText(file);
        reader.onload = e => {
            try {
                json = JSON.parse(e.target.result);
                // console.log(json)
                let {name,schedule} = json
                this.props.loadSchedule(name,schedule)
            } catch (ex) {
                alert('cannot readfile ' + ex);
            }
        };
    }

    render() {
        return (
            <div className="load-save">
                <div className="save">
                    <img src={save} alt="save" height="50" onClick={this.handleSaveToPC} />
                    <h6 className="title">SAVE</h6>
                </div>
                <div className="load">
                    <label htmlFor="file-input">
                        <img src={load} alt="load" height="50" />
                        <h6 className="title">LOAD</h6>
                    </label>
                    <input id="file-input" type="file" onChange={this.handleUploadFile.bind(this)} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    name: state.schedule.name,
    schedule: state.schedule.schedule,

})
const mapDispatchToProps = dispatch => ({
    loadSchedule: (name,schedule) => dispatch({ type: Action.LOADSCHEDULE, name,schedule })
})
export default connect(mapStateToProps, mapDispatchToProps)(LoadSave);
