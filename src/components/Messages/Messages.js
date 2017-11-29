import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserMessages, getAllUsers } from '../../ducks/reducer';
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
            convoBuddy:''
            

        }

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getConvo = this.getConvo.bind(this);
        this.findFriends = this.findFriends.bind(this)
    }

    componentDidMount() {
        this.props.getAllUsers()
        // console.log('redux userCredentials', this.props.userCredentials.userid)
       
        axios.get(`/api/getallmessages/${this.props.userCredentials.userid}`)
            .then(response => {
                this.setState({ messages: response.data })
            })

        // this.props.getUserDetails(this.props.userCredentials.userid)
    }

    handleChange(e, formfield) {
        this.setState({
            [formfield]: e
        })
    }


    sendMessage(friendid) {

        
        const body = {
            // senderid: 6,
            senderid:this.props.userCredentials.userid,
            receiverid: friendid,
            content: this.state.messageBody,
            timestamp: Date.now()
            
        }

        axios.post('/api/createmessage', body)
            .then(response => {
                console.log('body', body)
            })
    }

    getConvo(friendID) {
        // axios.get(`/api/getconversation/3/${friendID}`)
        //     .then(response => {
        //         console.log(response.data[0])
        //         return this.setState({
        //             conversation: response.data[0].user_conversation
        //         })
        //     })

        const myId = this.props.userCredentials.userid

        fns.getConversation(`/api/getconversation/${myId}/${friendID}`)
        .then( res => {
            // return
             this.setState({
                conversation: res[0].user_conversation
            })
        })
        console.log('CONVERSATION',this.state.conversation)


    }

    findFriends() {
        if (this.props.allUsers.length > 0) {
            return this.props.allUsers.map((user, i, arr) => {
                if (this.props.allUsers[6].friends.includes(user.userid) === true) {
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
                        </Modal></div>
                    )
                }
            })
        }
    }


    render() {
        console.log('this.state.messages', this.state.messages)
        console.log('usercred', this.props.userCredentials)
        console.log('usermessages', this.props.userMessages[0])
        console.log('allusers', this.props.allUsers)
        return (
            <div className='Messages'>
                <Navbar />
                <Header>Messages</Header>
                <div className='Messages_friends-messages-container'>
                    <div className='Messages_friends-container'>
                        <div className='myFriends-header'>My Friends</div>
                        {this.findFriends()}
                    </div>
                    <div className='Messages_container'>
                       
                        {/* {this.state.messages.length ? this.state.messages.map((message) => {
                            if (message.recieverid !== this.props.userCredentials.userid)
                                return <div key={message.messageid} className='Messages_temporary'><div className='usericonholder'><Icon className='messages_icon' name='mail'></Icon><div className='messages_user'>{message.sender_name}</div></div> <div className='messages_subject'>Do some javascript here..</div> <div className='messages_time'>TimeStamp?</div>
                                    <Modal trigger={<Button onClick={() => { this.getConvo(message.sender_id) }} className='messages_read'>Read</Button>} closeIcon>
                                        <Modal.Content>
                                            <div className='Messages_read-modal'>
                                                <Modal.Header>Message Open</Modal.Header>
                                                {this.state.conversation.map(message => {
                                                    return <div className='Messages_messagefeedmodal'>
                                                        <div className='Messages_messagefeedmodal-sender'>{message.sender_name} </div>
                                                        <div className='Messages_messagefeedmodal-message'>Message: {message.message}</div>
                                                    </div>
                                                })}
                                                <textarea className='Messages_read-modal_textbox' rows='7'></textarea>
                                                <Button>Send</Button>
                                            </div>
                                        </Modal.Content>
                                    </Modal>
                                </div>
                        }) : null} */}

{this.state.messages.length ? this.state.messages.map((message) => {
                            if (message.recieverid == this.props.userCredentials.userid)
                                return <div key={message.messageid} className='Messages_temporary'><div className='usericonholder'><Icon className='messages_icon' name='mail'></Icon><div className='messages_user'>{message.messageid}</div></div> <div className='messages_subject'>{message.content}</div> <div className='messages_time'>TimeStamp?</div>
                                    <Modal trigger={<Button onClick={() => { this.getConvo(message.senderid) } } className='messages_read'>Read</Button>} closeIcon>
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
                                                <Button onClick={() => this.sendMessage(message.recieverid)}>Send</Button>
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
    };
}
const mapDispatchToProps = {
    getUserMessages: getUserMessages,
    getAllUsers: getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);