import React from 'react';
import './css/Selecting.css';
import data from './data/test.json'

class Selecting extends React.Component {
    constructor() {
        super()
        this.state = {
            course: '',
            name: '',
        }
        this.handleChange = this.handleChange.bind(this)
    }    
    handleChange = (e) => {
        let course = e.target.value
        let index = e.target.options.selectedIndex
        let name = e.target.options[index].getAttribute('name')
        // console.log(course, index)
        this.setState({
            course,
            name,
        }, () => {
            // console.log(this.state)
            if (this.props.onChange && this.state.course !== '') {
                this.props.onChange(this.state)
            }
        })
    }

    showData() {
        let slice = []
        Object.keys(data).map((key) => {
            let text = `${key} ${data[key].subject} (${data[key].thsubject})`
            slice.push(<option key={key} name={data[key].subject} value={key}> {text}</option>)
            return 0
        })
        return slice
    }

    render() {
        return (
            <React.Fragment>
                {/* <input type="text" className="input-serch"/> */}
                <select className="course" value={this.props.value} onChange={this.handleChange}>
                    <option value="" label="Select Subject" />
                    {this.showData()}
                </select>
            </React.Fragment>
        )
    }
}
export default Selecting