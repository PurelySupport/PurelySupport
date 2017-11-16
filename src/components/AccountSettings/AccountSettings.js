import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getUserDetails } from '../../ducks/reducer';

class AccountSettings extends Component {
    constructor(){
        super()
        this.state = {
            displayName: '',
            firstName: '',
            lastName: '',
            city: '',
            state: '',
            userInterests: [],
            userDiseases: [],
            userGroups: []
        }
    }

    componentDidMount(){
        this.props.getUserDetails()
        this.setState({
            displayName: this.props.userCredentials.displayname,
            firstName: this.props.userCredentials.firstname,
            lastName: this.props.userCredentials.lastname,
            city: this.props.userCredentials.city,
            state: this.props.userCredentials.state,
            // userInterests: this.props.userDetails.userInterests,
            // userDiseases: this.props.userDetails.userDiseases,
            // userGroups: this.props.userDetails.userGroups
        })
    }

    handleChange(e, formfield) {
        this.setState({
            [formfield]: e
        })
    }

    updateAccountSettings() {
        const data = {
            displayname: this.state.displayName,
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            city: this.state.city,
            state: this.state.state
        }

        axios.put('', data)
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

    render(){
        return(
            <div className='AccountSettings'>
            <h1>Account Settings</h1>
                User Name
                <input type='text' size='40' onChange={(e) => this.handleChange(e.target.value, 'displayName')} value={this.state.displayName} required></input><br />
                First Name
                <input type='text' size='40' onChange={(e) => this.handleChange(e.target.value, 'firstName')} value={this.state.firstName} required></input><br />
                Last Name
                <input type='text' size='40' onChange={(e) => this.handleChange(e.target.value, 'lastName')} value={this.state.lastName} required></input><br />
                City
                <input type='text' size='40' onChange={(e) => this.handleChange(e.target.value, 'city')} value={this.state.city} required></input><br />
                State
                <input type='text' size='40' onChange={(e) => this.handleChange(e.target.value, 'state')} value={this.state.state} required></input><br />
                <Link to='/dashboard'>
                    <button onClick={() => this.updateRegistration()}>SUBMIT</button>
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userCredentials: state.userCredentials,
        userDetails: state.userDetails
    }
}
export default connect(mapStateToProps, {getUserDetails})(AccountSettings);