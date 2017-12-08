import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserCredentials, getEvents, getUserDetails } from '../../ducks/reducer';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

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



                <div className='main-grid'>

                    {/* events */}

                    <div className='events'>
                        <div className='events-header'>Events</div>
                        <div className='event-holder'>

                            {this.props.allEvents.map(event => {
                                return (
                                    <Link to={`/events`} className='fix-link'>
                                        <div className='event'>
                                            <div className='img-holder'
                                                style={{
                                                    backgroundImage: `url(${event.image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: '50% 50%',
                                                }}>

                                            </div>
                                            <div className='holder'>
                                                <div className='groupName'>{event.groupname}</div>
                                                <div className='name'>{event.name}</div>
                                                <div className='date'>{event.date}</div>
                                                <div className='place'>{`${event.city}, ${event.state}`}</div>
                                                <div className='time'>{event.starttime}</div>
                                            </div>
                                            <div className='description'>{event.description.substr(0, 75) + "..."}</div>
                                        </div>
                                    </Link>
                                )
                            })}

                        </div>



                        {/* posts */}
                        <div className='events-header'>Posts</div>
                        <div className='event-holder'>
                            {this.state.posts.map(post => {
                                return (
                                    <div className='event'>
                                        <div className='img-holder'
                                            style={{
                                                backgroundImage: `url(${post.image1})`,
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: '50% 50%',
                                            }}>

                                        </div>
                                        <div className='holder'>
                                            <Link to={`/grouppage`}>
                                                <div className='groupName'>{post.groupname}</div>
                                            </Link>
                                            <Link to={`/postpage/${post.postid}`} className='fix-link'>
                                                <div className='name'>{post.title}</div>
                                            </Link>
                                            <div className='date'>{post.timestamp}</div>
                                        </div>
                                        <div className='description' dangerouslySetInnerHTML={{ __html: post.content.substr(0, 50) + "..." }} />
                                    </div>
                                )
                            })}

                        </div>
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