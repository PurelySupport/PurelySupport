import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UserRegistration extends Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            firstName: '',
            lastName: '',
            city: '',
            state: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, formfield) {
        this.setState({
            [formfield]: e
        })
    }

    updateRegistration() {
        const data = {
            displayname: this.state.displayName,
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            city: this.state.city,
            state: this.state.state
        }

        axios.put('/api/register', data)
            .then(res => {
                this.setState({
                    displayName: '',
                    firstName: '',
                    lastName: '',
                    city: '',
                    state: ''
                })
            })
    }


    render() {
        return (
            <div className='UserRegistration'>
            <h1>UserRegistration</h1>
                User Name
                <input type='text' size='40' onChange={(e) => this.handleChange(e.target.value, 'displayName')} required></input><br />
                First Name
                <input type='text' size='40' onChange={(e) => this.handleChange(e.target.value, 'firstName')} required></input><br />
                Last Name
                <input type='text' size='40' onChange={(e) => this.handleChange(e.target.value, 'lastName')} required></input><br />
                City
                <input type='text' size='40' onChange={(e) => this.handleChange(e.target.value, 'city')} required></input><br />
                State
                <input type='text' size='40' onChange={(e) => this.handleChange(e.target.value, 'state')} required></input><br />
                <Link to='/dashboard'>
                    <button onClick={() => this.updateRegistration()}>SUBMIT</button>
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userCredentials: state.userCredentials
    }
}


export default connect(mapStateToProps)(UserRegistration);