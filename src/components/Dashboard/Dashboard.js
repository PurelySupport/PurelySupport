import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserCredentials, getEvents, getUserDetails } from '../../ducks/reducer';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            groups: [],
            posts: [],
            details: [],
            diseases: [],
            interests: []
        }
    }

    componentDidMount() {
        this.props.getEvents();

        axios.get('/api/allposts').then(res => this.setState({ posts: res.data }))

        this.props.getUserDetails(this.props.userCredentials.user_id).then(response => {
            this.setState({
                groups: response.action.payload[0].user_groups,
                diseases: response.action.payload[0].user_diseases,
                interests: response.action.payload[0].user_interests
            })
        })
    }

    componentWillReceiveProps(newProps) {
        console.log('new props', newProps)
        if (newProps.userCredentials.displayname === null) {
            this.props.history.push('/userregistration')
        } else {
            axios.get(`/api/getusergroups/${newProps.userCredentials.userid}`)
                .then((res) => {
                    res.data.map((group, index) => {
                        this.setState({
                            groups: group.groupid
                        })
                    })
                })
        }
    }

    render() {
        console.log('events: ', this.props.allEvents)
        console.log('posts: ', this.state.posts)
        console.log('userinfoobject: ', this.props.userDetails)
        console.log('groups', this.state.groups)
        return (
            <div className='Dashboard'>
                <Navbar />


                <div className='events'>
                    {this.props.allEvents.map(event => {
                        return (
                            <div className='event'>
                                <img src={event.image} />
                                <div className='groupName'>{event.groupname}</div>
                                <div className='name'>{event.name}</div>
                                <div className='date'>{event.date}</div>
                                <div className='time'>{event.starttime}</div>
                                <div className='description'>{event.description}</div>
                            </div>
                        )
                    })}

                    {this.state.posts.map(post => {
                        return (
                            <div>
                                {post.image}
                                {post.title}
                            </div>
                        )
                    })}

                    <div className='stuff'>

                        My Interests:
                    {this.state.interests !== null ? this.state.interests.map(interest => {
                            return (
                                <div>{interest.interest_name}</div>
                            )
                        }) : null}

                        {this.state.groups !== null ? this.state.groups.map(group => {
                            return (
                                <div>{group.group_name}</div>
                            )
                        }) : null}

                        {this.state.diseases !== null ? this.state.diseases.map(disease => {
                            return (
                                <div>{disease.disease_name}</div>
                            )
                        }) : null}
                        
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userCredentials: state.userCredentials,
        userDetails: state.userDetails,
        allEvents: state.allEvents
    }
}

const mapDispatchToProps = {
    getUserCredentials: getUserCredentials,
    getEvents: getEvents,
    getUserDetails: getUserDetails
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);