import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserDetails, getDiseases } from '../../ducks/reducer';
import { Button, Header, Image, Modal, Form, TextArea, Input, Dropdown, Divider, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

class NoGroupPageFound extends Component {
    constructor() {
        super()
        this.state = {
            newGroupName: '',
            newGroupDisease: [],
            open: false,
        }

        this.handleChange = this.handleChange.bind(this)

    }

    componentDidMount() {
        this.props.getUserDetails(this.props.userCredentials.userid)
        this.props.getDiseases()
    }

    handleChange(e, formfield) {
        this.setState({
            [formfield]: e
        })
    }

    closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
        this.setState({ closeOnEscape, closeOnRootNodeClick, open: true })
    }

    close = () => this.setState({ open: false })

    addGroup(){
        const data = {
            diseaseid: this.state.newGroupDisease.diseaseid,
            diseasename: this.state.newGroupName,
        }
        axios.post('/api/creategroup', data)
        .then(res => alert('New Group Created'))
    }

    render() {

        const { open, closeOnEscape, closeOnRootNodeClick } = this.state

        return (
            <div className='NoGroupPageFound'>
            No Group Found! 
            <Navbar />
            <Modal trigger={<Button onClick={this.closeConfigShow(true, false)}>Create New Group</Button>}
                    closeIcon open={open}
                    closeOnRootNodeClick={closeOnRootNodeClick}
                    onClose={this.close}>

                    <Modal.Header>Let's Make a New Group</Modal.Header>
                    <Modal.Content >
                        <Form>
                            <Form.Field control='input' label='Group Name' placeholder='Group Name' onChange={(e) => this.handleChange(e.target.value, 'newGroupName')} required />
                            <Dropdown placeholder='Disease Type' fluid search selection options={this.props.diseases.map((disease, index) => {
                                return {
                                    key: disease.diseaseid,
                                    value: disease.diseaseid,
                                    text: disease.name
                                }
                            })} onChange={(e, data) => this.setState({ newGroupDisease: data.value })} />
                            {this.state.newGroupName === '' || this.state.newGroupDisease === [] ? <Button disabled>Submit</Button> : <Button onClick={() => this.addGroup()}>Submit</Button>}
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userCredentials: state.userCredentials,
        userDetails: state.userDetails,
        diseases: state.diseases,
    }
}
export default connect(mapStateToProps, { getUserDetails, getDiseases })(NoGroupPageFound);