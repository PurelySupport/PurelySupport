import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getUserDetails } from '../../ducks/reducer';
import { Dropdown, Form, Button, Divider } from 'semantic-ui-react';

class AccountSettings extends Component {
    constructor() {
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

    componentDidMount() {
        this.props.getUserDetails()
        this.setState({
            displayName: this.props.userCredentials.displayname,
            firstName: this.props.userCredentials.firstname,
            lastName: this.props.userCredentials.lastname,
            city: this.props.userCredentials.city,
            state: this.props.userCredentials.state,
            userInterests: this.props.userDetails.userInterests,
            userDiseases: this.props.userDetails.userDiseases,
            userGroups: this.props.userDetails.userGroups
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

    render() {
        return (
            <div className='AccountSettings'>
                <h1>Account Settings</h1>
                <Form size='tiny' error>
                    <Form.Input label='Username' placeholder={this.state.displayName} width={6} onChange={(e) => this.handleChange(e.target.value, 'displayName')} required />
                    <Form.Group widths='equal'>
                        <Form.Field label='First name' control='input' placeholder={this.state.firstName} onChange={(e) => this.handleChange(e.target.value, 'firstName')} required />
                        <Form.Field label='Last name' control='input' placeholder={this.state.lastName} onChange={(e) => this.handleChange(e.target.value, 'lastName')} required />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field label='City' control='input' placeholder={this.state.city} onChange={(e) => this.handleChange(e.target.value, 'city')} required />
                        <Form.Field label='State' control='input' placeholder={this.state.state} onChange={(e) => this.handleChange(e.target.value, 'state')} required />
                    </Form.Group>
                    <Dropdown placeholder='Interests' fluid multiple search selection options={this.state.interests} />
                    <Dropdown placeholder='Diseases' fluid multiple search selection options={this.state.diseases} />
                    <Dropdown placeholder='Groups' fluid multiple search selection options={this.state.groups} />
                    <Link to='/dashboard'>
                        <Button type='submit' onClick={() => this.updateAccountSettings()} >Submit</Button>
                    </Link>
                    <Divider hidden />
                </Form>
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
export default connect(mapStateToProps, { getUserDetails })(AccountSettings);