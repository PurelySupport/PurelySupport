import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getUserDetails, getDiseases, getInterests, getGroups } from '../../ducks/reducer';
import { Dropdown, Form, Button, Divider, Header, Icon, Modal } from 'semantic-ui-react';

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
            userGroups: [],
            allInfoFilled: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.getUserDetails(this.props.userCredentials.userid)
        this.props.getDiseases()
        this.props.getInterests()
        this.props.getGroups()
        this.setState({
            displayName: this.props.userCredentials.displayname,
            firstName: this.props.userCredentials.firstname,
            lastName: this.props.userCredentials.lastname,
            city: this.props.userCredentials.city,
            state: this.props.userCredentials.state,
            userInterests: this.props.userDetails.interestid,
            userDiseases: this.props.userDetails.diseaseid,
            userGroups: this.props.userDetails.groupid
        })
    }

    handleChange(e, formfield) {
        this.setState({
            [formfield]: e
        })
    }

    updateAccountSettings() {
        const data1 = {
            userid: this.props.userCredentials.userid,
            displayname: this.state.displayName,
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            state: this.state.state,
            city: this.state.city,
        }

        const data2 = {
            userid: this.props.userCredentials.userid,
            interestid: this.state.userInterests
        }

        const data3 = {
            userid: this.props.userCredentials.userid,
            groupid: this.state.userGroups,
        }

        const data4 = {
            userid: this.props.userCredentials.userid,
            diseaseid: this.state.userDiseases
        }

        axios.put('/api/register', data1)
            .then(response => { })
        console.log(data1)
        axios.put('/api/updateinterests', data2)
            .then(response => { })
        console.log('data2', data2)
        axios.put('/api/updategroups', data3)
            .then(response => { })
        console.log('data3', data3)
        axios.put('/api/updatediseases', data4)
            .then(response => { })
        console.log('data4', data4)
    }




    render() {
        if (this.state.displayName === '' || this.state.firstName === '' || this.state.lastName === '' || this.state.city === '' || this.state.state === '') {
            this.state.allInfoFilled = false
        } else {
            this.state.allInfoFilled = true
        }
        return (
            <div className='AccountSettings'>
                <h1>Account Settings</h1>
                <Form size='tiny' error>
                    <Form.Input label='Username' value={this.state.displayName} width={6} onChange={(e) => this.handleChange(e.target.value, 'displayName')} required />
                    <Form.Group widths='equal'>
                        <Form.Field label='First name' control='input' value={this.state.firstName} onChange={(e) => this.handleChange(e.target.value, 'firstName')} required />
                        <Form.Field label='Last name' control='input' value={this.state.lastName} onChange={(e) => this.handleChange(e.target.value, 'lastName')} required />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field label='City' control='input' value={this.state.city} onChange={(e) => this.handleChange(e.target.value, 'city')} required />
                        <Form.Field label='State' control='input' value={this.state.state} onChange={(e) => this.handleChange(e.target.value, 'state')} required />
                    </Form.Group>


                    <Dropdown placeholder='Interests' fluid multiple search selection options={this.props.interests.map((interest, index) => {
                        return {
                            key: interest.interestid,
                            value: interest.interestid,
                            text: interest.interest
                        }
                    })} onChange={(e, data) => this.setState({ userInterests: data.value })} />
                    <Dropdown placeholder='Diseases' fluid multiple search selection options={this.props.diseases.map((disease, index) => {
                        return {
                            key: disease.diseaseid,
                            value: disease.diseaseid,
                            text: disease.name
                        }
                    })} onChange={(e, data) => this.setState({ userDiseases: data.value })} />
                    <Dropdown placeholder='Groups' fluid multiple search selection options={this.props.groups.map((group, index) => {
                        return {
                            key: group.groupid,
                            value: group.groupid,
                            text: group.name
                        }
                    })} onChange={(e, data) => this.setState({ userGroups: data.value })} />


                    {this.state.allInfoFilled === false ? <Button disabled>Submit</Button> :
                        <Link to='/dashboard'>
                            <Button type='submit' onClick={() => this.updateAccountSettings()} >Submit</Button>
                        </Link>
                    }   

                    <Modal basic size='small' closeIcon trigger={<Button>Cancel</Button>}>
                        <Header icon='hand paper' content='Unsaved Data' />
                        <Modal.Content>
                            <p>You have unsaved changes, are you sure you want to leave the page?</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Link to='/dashboard'>
                            <Button color='green' inverted>
                                <Icon name='checkmark' /> Yes
                            </Button>
                            </Link>
                        </Modal.Actions>
                    </Modal> 
                    <Divider hidden />
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userCredentials: state.userCredentials,
        userDetails: state.userDetails,
        diseases: state.diseases,
        interests: state.interests,
        groups: state.groups
    }
}
export default connect(mapStateToProps, { getUserDetails, getDiseases, getInterests, getGroups })(AccountSettings);