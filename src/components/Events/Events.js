import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Modal, Button, Header, Icon, Input, Image, Dropdown } from 'semantic-ui-react';
import Navbar from './../Navbar/Navbar.js';
import { getGroups, createEvent } from '../../ducks/reducer';
import axios from 'axios'

class Events extends Component {
    constructor() {
        super();

        this.state = {
            location: '',
            date: '',
            starttime: '',
            endtime: '',
            img: '',
            description: '',
            city: '',
            state: '',
            myEventsToggled: false,
            allEventsToggled: true,
            groupid: 0,
            events: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.selectMine = this.selectMine.bind(this);
        this.newEvent = this.newEvent.bind(this);

    }

    componentDidMount() {
        this.props.getGroups();

        axios.get('/api/getallevents')
            .then(response => {
                this.setState({ events: response.data })
            })
    }

    handleChange(e, formfield) {
        this.setState({
            [formfield]: e
        })
    }

    selectAll() {
        this.setState({
            myEventsToggled: false,
            allEventsToggled: true
        })
    }

    selectMine() {
        this.setState({
            myEventsToggled: true,
            allEventsToggled: false
        })
    }

    allEvents() {
        if (this.state.allEventsToggled === true) {
            return this.state.events.map((event) => {
                return (
                    <div className='event'>{event.description}</div>
                )
            })
        } else return this.state.events.map((event) => {
            if (event.name == 6){
                return <div className='event'>{event.description}</div>
            }
        })
    }

    newEvent() {
        const body = {
            groupid: this.state.groupid,
            name: 6,
            description: this.state.description,
            date: this.state.date,
            starttime: this.state.starttime,
            endtime: this.state.endtime,
            image: this.state.img,
            city: this.state.city,
            state: this.state.state,
            location: this.state.location
        }
        this.props.createEvent(body)
    }


    render() {
        console.log(this.state.events)
        return (
            <div className='Events'>
                <Navbar />

                <div className='view-select'>
                    <div onClick={this.selectAll} className={this.state.allEventsToggled === true ? 'button-selected' : 'button'}>All Events</div>/
                    <div onClick={this.selectMine} className={this.state.myEventsToggled === true ? 'button-selected' : 'button'}>My Events</div>
                </div>
                <div className='events-holder'>
                    <div className='left-holder'>
                        <div className='featured-event'></div>
                    </div>
                    <div className='right-holder'>
                        {this.allEvents()}
                    </div>
                </div>
                <Modal trigger={<Button>Create Event</Button>} closeIcon>
                    <Modal.Content>
                        <Modal.Header>New Event</Modal.Header>
                        <Form>
                            <div className='modal'>
                                <div className='form-container'>
                                    <div className='left-container'>
                                        <div className='input-holder'>
                                            <div className='input-title'>Group</div>
                                            <Dropdown className='input' placeholder='Groups' selection options={this.props.groups.map((group, index) => {
                                                return {
                                                    key: group.groupid,
                                                    value: group.groupid,
                                                    text: group.name
                                                }
                                            })} onChange={(e, data) => this.setState({ groupid: data.value })} />
                                        </div>
                                        <div className='input-holder'>
                                            <div className='input-title'>Date</div><Input onChange={(e) => this.handleChange(e.target.value, 'date')} className='input'></Input>
                                        </div>
                                        <div className='input-holder'>
                                            <div className='input-title'>Start Time</div><Input onChange={(e) => this.handleChange(e.target.value, 'starttime')} className='input'></Input>
                                        </div>
                                        <div className='input-holder'>
                                            <div className='input-title'>End Time</div><Input onChange={(e) => this.handleChange(e.target.value, 'endtime')} className='input'></Input>
                                        </div>
                                        <div className='input-holder'>
                                            <div className='input-title'>Image</div><Input onChange={(e) => this.handleChange(e.target.value, 'img')} className='input'></Input>
                                        </div>
                                        <div className='input-holder'>
                                            <div className='input-title'>Location</div><Input onChange={(e) => this.handleChange(e.target.value, 'location')} className='input'></Input>
                                        </div>
                                        <div className='input-holder'>
                                            <div className='input-title'>City</div><Input onChange={(e) => this.handleChange(e.target.value, 'city')} className='city'></Input>
                                        </div>
                                        <div className='input-holder'>
                                            <div className='input-title'>State</div><Input onChange={(e) => this.handleChange(e.target.value, 'state')} className='state'></Input>
                                        </div>
                                    </div>

                                    <div className='right-container'>
                                        <img className='img' src={this.state.img} />
                                    </div>
                                </div>

                                <div className='input-holder-desc'>
                                    Description<textarea onChange={(e) => this.handleChange(e.target.value, 'description')} rows='6'></textarea>
                                </div>
                            </div>
                        </Form>
                        <Button onClick={this.newEvent}>Create Event</Button>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        groups: state.groups
    };
}

export default connect(mapStateToProps, { getGroups, createEvent })(Events);