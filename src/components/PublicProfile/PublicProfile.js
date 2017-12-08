import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { getAllUsers } from '../../ducks/reducer';
import { Form, Modal, Button, Header, Icon } from 'semantic-ui-react';
import axios from 'axios';



class PublicProfile extends Component {
    constructor() {
        super()

        this.state = {
            publicUser: {},
            publicUserGroups: [],
            publicUserInterests: [],
            messageBody: '',
            following: false,
            groups: false,
            interests: false,
        }

        this.getUser = this.getUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.followingCheck = this.followingCheck.bind(this);
        this.followStatusHandler = this.followStatusHandler.bind(this);
        this.toggleGroups = this.toggleGroups.bind(this);
        this.toggleInterests = this.toggleInterests.bind(this);
    }

    componentDidMount() {
        this.props.getAllUsers().then(response => {
            this.getUser()
            this.state.publicUser ? this.getUserInfo() : null
            this.props.userCredentials.length ? this.followingCheck() : null
        })
    }

    getUserInfo() {
        axios.get(`/api/getuserinterestsgroups/${this.state.publicUser.userid}`).then(response => {
            this.setState({
                publicUserGroups: response.data[0].user_groups,
                publicUserInterests: response.data[0].user_interests
            })
        })
    }

    getUser() {
        this.props.allUsers.map(user => {
            if (user.userid == this.props.match.params.id) {
                this.setState({
                    publicUser: user
                })
            }
        })
    }

    handleChange(e, formfield) {
        this.setState({
            [formfield]: e
        })
    }

sendMessage(friendid) {

    const body = {
        senderid: this.props.userCredentials.userid,
        receiverid: friendid,
        content: this.state.messageBody,
        timestamp: Date.now()
    }

    axios.post('/api/createmessage', body)
        .then(response => {
            console.log('body', body)
        })
}

addFriend() {
    const body = {
        active_user_id: this.props.userCredentials.userid,
        friend_user_id: this.state.publicUser.userid
    }
    axios.put('/api/addfriend', body)
        .then(response => this.followingCheck())
}

followingCheck() {
    console.log('following?', this.state.following)
    const id = this.state.publicUser.userid
    if (this.props.userCredentials.friends.includes(id) === true) {
        this.setState({
            following: !this.state.following
        })
    }
}

followStatusHandler() {
    this.setState({
        following: false
    })
}

toggleGroups(){
    this.setState({
        groups: !this.state.groups
    })
}

toggleInterests(){
    this.setState({
        interests: !this.state.interests
    })
}

render() {
    const user = this.state.publicUser
    console.log('this.state.publicusergroups', this.state.publicUserGroups)

    return (
        <div className='PublicProfile'>
            <Navbar />
            <div className='main'>
                <div className='main'>
                    <div className='title-box' style={{
                        backgroundImage: `url(${user.img})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '50% 50%',
                        animationName: 'fadeIn',
                        transition: 7
                    }}>
                        <span>{user.displayname}</span>
                        <span>{user.user_name}</span>
                        <span> {user.city}, {user.state}</span>
                        <div className='btn-parent'>
                            <span onClick={() => this.toggleGroups()}>groups</span>

                            <div className='groups'>
                                {this.state.groups === false ? null : this.state.publicUserGroups == null ? <span>no groups</span> :
                                    this.state.publicUserGroups.map((group, index) => {
                                        return (
                                            <span>-{group.group_name}</span>
                                        )
                                    })}
                            </div>



                            <span onClick={() => this.toggleInterests()}>interests</span>


                            <div className='interests'>
                                {this.state.interests === false ? null : this.state.publicUserInterests == null ? <span>no interests</span> :
                                    this.state.publicUserInterests.map((interest, index) => {
                                        return (
                                            <span>-{interest.interest_name}</span>
                                        )
                                    })}
                            </div>



                            <Modal trigger={<span>message</span>} closeIcon>
                                <Modal.Content>
                                    <Form>
                                        <textarea rows='7' placeholder='Your message here...' onChange={(e) => this.handleChange(e.target.value, 'messageBody')}></textarea>
                                    </Form>
                                    {this.state.messageBody === '' ? <Button disabled>Send</Button> :
                                        <Button onClick={() => this.sendMessage(this.state.publicUser.userid)}>Send</Button>}
                                </Modal.Content>
                            </Modal>
                            {this.state.following ? <span onClick={() => this.addFriend()}>follow</span> : <span onClick={() => this.addFriend()}>unfollow</span>}
                        </div>
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
        allUsers: state.allUsers,
    };
}
const mapDispatchToProps = {
    getAllUsers: getAllUsers,

}

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfile);