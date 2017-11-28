import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserMessages } from '../../ducks/reducer';
import { Form, Modal, Button, Header, Icon } from 'semantic-ui-react';
import Navbar from './../Navbar/Navbar.js';
import axios from 'axios';
import { isNumber } from 'util';

class Messages extends Component {
    constructor() {
        super();

        this.state = {
            conversation: [],
            subject: '',
            to: '',
            messageBody: ''

        }

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getConvo = this.getConvo.bind(this);
    }

    componentDidMount() {
        this.props.getUserMessages(3)
        // this.props.getUserDetails(this.props.userCredentials.userid)
    }

    handleChange(e, formfield) {
        this.setState({
            [formfield]: e
        })
    }


    sendMessage() {

        const body = {
            senderid: 3,
            recieverid: this.state.to,
            content: this.state.messageBody,
            timestamp: Date.now()
        }

        axios.post('', body)
            .then(response => { })
    }

    getConvo(friendID) {
        axios.get(`/api/getconversation/3/${friendID}`)
            .then(response => {
                console.log(response.data[0])
                return this.setState({
                    conversation: response.data[0].user_conversation
                })
            })
    }


    render() {
        console.log('usercred', this.props.userCredentials)
        console.log('usermessages', this.props.userMessages[0])
        return (
            <div className='Messages'>
                <Navbar />
                <Header>Messages</Header>
                <div className='Messages_friends-messages-container'>
                    <div className='Messages_friends-container'>
                        <div className='myFriends-header'>My Friends</div>
                        <div className='Messages_friend-holder'><img className='Messages_friend-holder-img' src='https://wi-images.condecdn.net/image/Pyznj0v4kJw/crop/200/square' /><div className='Messages_friend-holder-username'>bobbbyyyy234</div><Modal trigger={<Icon className='Messages_friend-holder-icon' size='large' name='write square'></Icon>} closeIcon>
                            <Modal.Content>
                                <Modal.Header>Compose Message</Modal.Header>
                                <div className='Messages_modal-userholder'>
                                    <img className='Messages_friend-holder-img' src='https://wi-images.condecdn.net/image/Pyznj0v4kJw/crop/200/square' />
                                    <div className='Messages_username-header'>bobbbyyyy234</div>
                                </div>
                                <Form>
                                    <textarea rows='7' placeholder='Your message here...' onChange={(e) => this.handleChange(e.target.value, 'messageBody')}></textarea>
                                </Form>
                                <Button onClick={this.sendMessage}>Send</Button>
                            </Modal.Content>
                        </Modal></div>
                        <div className='Messages_friend-holder'><img className='Messages_friend-holder-img' src='https://wi-images.condecdn.net/image/Pyznj0v4kJw/crop/200/square' /><div className='Messages_friend-holder-username'>bobby123</div><Icon className='Messages_friend-holder-icon' size='large' name='write square'></Icon></div>
                        <div className='Messages_friend-holder'><img className='Messages_friend-holder-img' src='https://wi-images.condecdn.net/image/Pyznj0v4kJw/crop/200/square' /><div className='Messages_friend-holder-username'>bobby123</div><Icon className='Messages_friend-holder-icon' size='large' name='write square'></Icon></div>
                        <div className='Messages_friend-holder'><img className='Messages_friend-holder-img' src='https://wi-images.condecdn.net/image/Pyznj0v4kJw/crop/200/square' /><div className='Messages_friend-holder-username'>bobby123</div><Icon className='Messages_friend-holder-icon' size='large' name='write square'></Icon></div>
                        <div className='Messages_friend-holder'><img className='Messages_friend-holder-img' src='https://wi-images.condecdn.net/image/Pyznj0v4kJw/crop/200/square' /><div className='Messages_friend-holder-username'>bobby123</div><Icon className='Messages_friend-holder-icon' size='large' name='write square'></Icon></div>
                        <div className='Messages_friend-holder'><img className='Messages_friend-holder-img' src='https://wi-images.condecdn.net/image/Pyznj0v4kJw/crop/200/square' /><div className='Messages_friend-holder-username'>bobby123</div><Icon className='Messages_friend-holder-icon' size='large' name='write square'></Icon></div>
                        <div className='Messages_friend-holder'><img className='Messages_friend-holder-img' src='https://wi-images.condecdn.net/image/Pyznj0v4kJw/crop/200/square' /><div className='Messages_friend-holder-username'>bobby123</div><Icon className='Messages_friend-holder-icon' size='large' name='write square'></Icon></div>
                        <div className='Messages_friend-holder'><img className='Messages_friend-holder-img' src='https://wi-images.condecdn.net/image/Pyznj0v4kJw/crop/200/square' /><div className='Messages_friend-holder-username'>bobby123</div><Icon className='Messages_friend-holder-icon' size='large' name='write square'></Icon></div>
                        <div className='Messages_friend-holder'><img className='Messages_friend-holder-img' src='https://wi-images.condecdn.net/image/Pyznj0v4kJw/crop/200/square' /><div className='Messages_friend-holder-username'>bobby123</div><Icon className='Messages_friend-holder-icon' size='large' name='write square'></Icon></div>
                    </div>
                    <div className='Messages_container'>
                        {this.props.userMessages.length ? this.props.userMessages.map((messages) => {
                            return messages.user_messages.map((message, i, arr) => {
                                if (message.sender_id !== 3)
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
                            })
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
        userMessages: state.userMessages
    };
}
const mapDispatchToProps = {
    getUserMessages: getUserMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);