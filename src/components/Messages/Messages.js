import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserMessages, getAllUsers, getUserDetails } from '../../ducks/reducer';
import { Form, Modal, Button, Header, Icon } from 'semantic-ui-react';
import Navbar from './../Navbar/Navbar.js';
import axios from 'axios';
import { isNumber } from 'util';
import fns from './../../utilities/functions';

class Messages extends Component {
    constructor() {
        super();

        this.state = {
            conversation: [],
            subject: '',
            messageBody: '',
            messages: [],
            convoBuddy: '',
            friends: [],
            friendModal: false,
            convoModal: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getConvo = this.getConvo.bind(this);
    }

    componentDidMount() {
        this.props.userCredentials.userid ? 
        this.props.getAllUsers().then(response => {
            let pass = response.action.payload.filter((user, index, array) => {
                if (this.props.userCredentials.friends.includes(user.userid)) {
                    return user
                }
            })
            this.setState({
                friends: pass
            })  
        }) : null;

        this.props.userCredentials.userid ? 
        this.props.getUserMessages(this.props.userCredentials.userid).then(response => {
            console.log('usermessages response',response)
            this.setState({
                messages: response.action.payload
            })
        }) : null;
    }

    handleChange(e, formfield) {
        this.setState({
            [formfield]: e
        })
    }

    sendMessage(friendid) {
        const body = {
            // senderid: 6,
            senderid: this.props.userCredentials.userid,
            receiverid: friendid,
            content: this.state.messageBody,
            timestamp: Date.now()
        }

        axios.post('/api/createmessage', body)
            .then(response => {
                this.props.getUserMessages(this.props.userCredentials.userid).then(response => {
                    console.log(response)
                    this.setState({
                        messages: response.action.payload
                    })
                })
            })
    }

    getConvo(friendID) {
        const myId = this.props.userCredentials.userid

        fns.getConversation(`/api/getconversation/${myId}/${friendID}`)
            .then(res => {
                this.setState({
                    conversation: res[0].user_conversation
                })
            })
    }

    render() {
        console.log('user-messages', this.state.messages)
        console.log('friends', this.state.friends)
        return (
            <div className='Messages'>
                <Navbar />
                <div className='mess-header'>Messages</div> 
                <div className='Messages_friends-messages-container'>
                    <div className='Messages_friends-container'>
                        <div className='myFriends-header'>My Friends</div>
                        {this.state.friends.length > 0 ? this.state.friends.map(user => {
                            return (
                                <div className='Messages_friend-holder'><img className='Messages_friend-holder-img' src={user.img} /><div className='Messages_friend-holder-username'>{user.displayname}</div><Modal trigger={<Icon className='Messages_friend-holder-icon' size='large' name='write square'></Icon>} closeIcon>
                                    <Modal.Content>
                                        <Modal.Header>Compose Message</Modal.Header>
                                        <div className='Messages_modal-userholder'>
                                            <img className='Messages_friend-holder-img' src={user.img} />
                                            <div className='Messages_username-header'>{user.displayname}</div>
                                        </div>
                                        <Form>
                                            <textarea rows='7' placeholder='Your message here...' onChange={(e) => this.handleChange(e.target.value, 'messageBody')}></textarea>
                                        </Form>
                                        <Button onClick={() => this.sendMessage(user.userid)}>Send</Button>
                                    </Modal.Content>
                                </Modal></div>)
                        }) : <div className='Messages_modal-userholder'>'No friends'</div>}
                    </div>


                    <div className='Messages_container'>
                        {this.state.messages.length ? this.state.messages.map((message) => {
                            if (message.user_id == this.props.userCredentials.userid)
                                console.log('message', message)
                            return <div key={message.messageid} className='Messages_temporary'><div className='usericonholder'><Icon className='messages_icon' name='mail'></Icon><div className='messages_user'>{message.displayname}</div></div> <div className='messages_subject'>{message.content}</div> <div className='messages_time'></div>
                                <Modal trigger={<Button onClick={() => { this.getConvo(message.user_id) }} className='messages_read'>Read</Button>} closeIcon>
                                    <Modal.Content>
                                        <div className='Messages_read-modal'>
                                            <Modal.Header>Message Open</Modal.Header>
                                            {this.state.conversation.map(message => {
                                                return <div className='Messages_messagefeedmodal'>
                                                    <div className='Messages_messagefeedmodal-sender'>{message.sender_name} </div>
                                                    <div className='Messages_messagefeedmodal-message'>Message: {message.message}</div>
                                                </div>
                                            })}
                                            <textarea className='Messages_read-modal_textbox' rows='7' onChange={(e) => this.handleChange(e.target.value, 'messageBody')}></textarea>
                                            <Button onClick={() => this.sendMessage(message.user_id)}>Send</Button>
                                        </div>
                                    </Modal.Content>
                                </Modal>
                            </div>
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
        userMessages: state.userMessages,
        allUsers: state.allUsers,
        userDetails: state.userDetails
    };
}
const mapDispatchToProps = {
    getUserMessages: getUserMessages,
    getAllUsers: getAllUsers,
    getUserDetails: getUserDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);