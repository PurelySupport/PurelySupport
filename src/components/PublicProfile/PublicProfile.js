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
            // following: false,
        }

        this.getUser = this.getUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        // this.followingCheck = this.followingCheck.bind(this);
        // this.followStatusHandler = this.followStatusHandler.bind(this);
    }

    componentDidMount() {
        this.props.getAllUsers().then(response => {
            this.getUser()
            this.getUserInfo()
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

    addFriend(friendid) {

        const body = {
            active_user_id: this.props.userCredentials.userid,
            friend_user_id: this.state.publicUser.userid
        }
        axios.put('/api/addfriend', body)
            .then(response => console.log(`userid ${this.state.publicUser.userid} was added to active user(${this.props.userCredentials.userid})'s friend list.`))
    }

    // followingCheck() {
    //     console.log('following?', this.state.following)
    //     if (this.props.userCredentials.friends.includes(this.state.publicUser.userid) === true) {
    //         this.setState({
    //             following: true
    //         })
    //     }
    // }

    // followStatusHandler() {
    //     this.setState({
    //         following: false
    //     })
    // }

    render() {
        console.log('pubuser', this.state.publicUser)
        console.log('groups', this.state.publicUserGroups[0])
        console.log('interest', this.state.publicUserInterests)

        return (
            <div className='PublicProfile'>
                <Navbar />
                {this.state.publicUserGroups.map(group => {
                    return (
                        <div>{group.group_name}</div>
                    )
                })}

                {this.state.publicUserInterests.map(interest => {
                    return (
                        <div>{interest.interest_name}</div>
                    )
                })}

                {this.state.publicUser.user_name}

                <Button onClick={() => {
                    this.addFriend(this.state.publicUser.userid);
                    // this.followStatusHandler()
                }}>
                    {/* {this.state.following === true ? <p>Unfollow</p> : <p>Follow</p>} */}
                    Follow
                </Button>

                <Modal trigger={<Icon className='Messages_friend-holder-icon' size='large' name='write square'></Icon>} closeIcon>
                    <Modal.Content>
                        <Modal.Header>Compose Message</Modal.Header>
                        <div className='Messages_modal-userholder'>
                            <img className='Messages_friend-holder-img' src={this.state.publicUser.img} />
                            <div className='Messages_username-header'>{this.state.publicUser.displayname}</div>
                        </div>
                        <Form>
                            <textarea rows='7' placeholder='Your message here...' onChange={(e) => this.handleChange(e.target.value, 'messageBody')}></textarea>
                        </Form>
                        <Button onClick={() => this.sendMessage(this.state.publicUser.userid)}>Send</Button>
                    </Modal.Content>
                </Modal>
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