import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserMessages, getUserDetails } from '../../ducks/reducer';
import { Form, Modal, Button, Header, Icon } from 'semantic-ui-react';
import Navbar from './../Navbar/Navbar.js';
import axios from 'axios';

class Messages extends Component {
    constructor() {
        super();

        this.state = {
            subject: '',
            to: '',
            messageBody: ''

        }
    }

    componentDidMount() {
        this.props.getUserMessages(this.props.userCredentials.userid)
        // this.props.getUserDetails(this.props.userCredentials.userid)
    }

    handleChange(e, formfield) {
        this.setState({
            [formfield]: e
        })
    }

    sendMessage() {
        const body = {
            userid: this.props.userCredentials.userid,
            subject: this.state.subject,
            to: this.state.to,
            messageBody: this.state.messageBody
        }

        axios.post('', body)
            .then(response => { })
    }


    render() {
        console.log('usercred', this.props.userCredentials)
        console.log(this.props.userDetails)
        return (
            <div className='Messages'>
                <Navbar />
                <Header>Messages</Header>
                <div className='Messages_container'>
                    <div className='Messages_temporary'><div className='usericonholder'><Icon className='messages_icon'name='mail'></Icon><div className='messages_user'>user123yayayayayayayaya</div></div> <div className='messages_subject'>Let's meet!</div> <div className='messages_time'>12:30PM</div> <Button className='messages_read'>Read</Button></div>
                    <div className='Messages_temporary'><div className='usericonholder'><Icon className='messages_icon'name='mail'></Icon><div className='messages_user'>user345</div></div> <div className='messages_subject'>Do you like OW?</div> <div className='messages_time'>12:30PM</div> <Button className='messages_read'>Read</Button></div>
                    <div className='Messages_temporary'><div className='usericonholder'><Icon className='messages_icon'name='mail'></Icon><div className='messages_user'>user123</div></div> <div className='messages_subject'>Let's meet!</div> <div className='messages_time'>12:30PM</div> <Button className='messages_read'>Read</Button></div>
                    <div className='Messages_temporary'><div className='usericonholder'><Icon className='messages_icon'name='mail'></Icon><div className='messages_user'>user345</div></div> <div className='messages_subject'>Do you like OW?</div> <div className='messages_time'>12:30PM</div> <Button className='messages_read'>Read</Button></div>
                    <div className='Messages_temporary'><div className='usericonholder'><Icon className='messages_icon'name='mail'></Icon><div className='messages_user'>user123</div></div> <div className='messages_subject'>Let's meet!</div> <div className='messages_time'>12:30PM</div> <Button className='messages_read'>Read</Button></div>
                    <div className='Messages_temporary'><div className='usericonholder'><Icon className='messages_icon'name='mail'></Icon><div className='messages_user'>user345</div></div> <div className='messages_subject'>Do you like OW?</div> <div className='messages_time'>12:30PM</div> <Button className='messages_read'>Read</Button></div>
                    <div className='Messages_temporary'><div className='usericonholder'><Icon className='messages_icon'name='mail'></Icon><div className='messages_user'>user345</div></div> <div className='messages_subject'>Do you like OW?</div> <div className='messages_time'>12:30PM</div> <Button className='messages_read'>Read</Button></div>
                    <div className='Messages_temporary'><div className='usericonholder'><Icon className='messages_icon'name='mail'></Icon><div className='messages_user'>user123</div></div> <div className='messages_subject'>Let's meet!</div> <div className='messages_time'>12:30PM</div> <Button className='messages_read'>Read</Button></div>
                    <div className='Messages_temporary'><div className='usericonholder'><Icon className='messages_icon'name='mail'></Icon><div className='messages_user'>user345</div></div> <div className='messages_subject'>Do you like OW?</div> <div className='messages_time'>12:30PM</div> <Button className='messages_read'>Read</Button></div>

                    {/* {this.props.userMessages.map(message => {
                    return <div className='Messages_messagePreview'>
                        <div className='sender'>
                            {message.sender}
                        </div>
                        <div className='subject'>
                            {message.subject}
                        </div>
                        <div className='timestamp'>
                            {message.timestamp}
                        </div>
                        </br>
                    </div>
                })} */}
                </div>
                <Modal trigger={<div className='messages_compose_btn'><Button className='Messages_compose'>New Message</Button></div>} closeIcon>
                    <Modal.Content>
                        <Modal.Header>Compose Message</Modal.Header>
                        <Form>
                            <Form.Field control='input' label='To' placeholder='username123' onChange={(e) => this.handleChange(e.target.value, 'to')} />
                            <Form.Field control='input' label='Subject' placeholder='Subject' onChange={(e) => this.handleChange(e.target.value, 'subject')} />
                            <textarea rows='7' onChange={(e) => this.handleChange(e.target.value, 'messageBody')}></textarea>
                        </Form>
                        <Button onClick={this.sendMessage()}>Send</Button>
                    </Modal.Content>
                </Modal>
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