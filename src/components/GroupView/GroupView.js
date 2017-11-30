import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents, getAllUsers, getGroups } from '../../ducks/reducer';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

class GroupView extends Component {
    constructor() {
        super();

        this.state = {
            groupEvents: [],
            groupInfo: {},
            comments: [],
            comment: '',
        }
        this.findGroup = this.findGroup.bind(this);
        this.findEvents = this.findEvents.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    componentDidMount() {
        this.props.getEvents().then(response => {
            this.findEvents()
        });

        this.props.getGroups().then(response => {
            this.findGroup()
        })

    }

    findGroup() {
        this.props.groups.map(group => {
            if (group.groupid == this.props.match.params.id) {
                this.setState({
                    groupInfo: group
                })
            }
        })
    }

    findEvents() {
        var groupEvents1 = []
        this.props.allEvents.map(event => {
            if (event.groupid == this.props.match.params.id) {
                groupEvents1.push(event)
            }
        })
        this.setState({ groupEvents: groupEvents1 })
    }

    // findGroupMembers(){
    //     this.props.allUsers.map(user => {
    //         if (user.)
    //     })
    // }

    handleChange(e, formfield) {
        this.setState({
            [formfield]: e
        })
    }






    render() {
        console.log('state', this.state)
        return (
            <div className='GroupView'>Group View
            <Navbar />
                {this.state.groupInfo.name}

                {this.state.groupEvents.map(event => {
                    return (
                        <div>{event.name}</div>
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userCredentials: state.userCredentials,
        allEvents: state.allEvents,
        allUsers: state.allUsers,
        groups: state.groups
    }
}

const mapDispatchToProps = {
    getEvents: getEvents,
    getAllUsers: getAllUsers,
    getGroups: getGroups
}


export default connect(mapStateToProps, mapDispatchToProps)(GroupView);