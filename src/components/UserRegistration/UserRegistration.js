import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown, Form, Button, Divider } from 'semantic-ui-react';

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
                <Form size='tiny' error>
                    <Form.Input label='Username' placeholder='Username' width={6} onChange={(e) => this.handleChange(e.target.value, 'displayName')} required />
                    <Form.Group widths='equal'>
                        <Form.Field label='First name' control='input' placeholder='First Name' onChange={(e) => this.handleChange(e.target.value, 'firstName')} required />
                        <Form.Field label='Last name' control='input' placeholder='Last Name' onChange={(e) => this.handleChange(e.target.value, 'lastName')} required />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field label='City' control='input' placeholder='City' onChange={(e) => this.handleChange(e.target.value, 'city')} required />
                        <Form.Field label='State' control='input' placeholder='State' onChange={(e) => this.handleChange(e.target.value, 'state')} required />
                    </Form.Group>
                    <Link to='/dashboard'>
                        <Button type='submit' onClick={() => this.updateRegistration()} >Submit</Button>
                    </Link>
                    <Divider hidden />
                </Form>
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