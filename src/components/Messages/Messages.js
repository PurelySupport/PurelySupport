import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserMessages } from '../../ducks/reducer';
import { Form, Modal, Button } from 'semantic-ui-react';
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
        // this.props.getUserMessages(this.props.userCredentials.userid)
    }

    handleChange(e, formfield) {
        this.setState({
            [formfield]: e
        })
    }

    sendMessage(){
        const body = {
            userid: this.props.userCredentials.userid,
            subject: this.state.subject,
            to: this.state.to,
            messageBody: this.state.messageBody
        }

        axios.post('', body)
        .then(response => {})
    }


    render() {
        console.log(this.state)
        return (
            <div className='Messages'>
                <Navbar />
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
                <Modal trigger={<Button className='Messages_compose'>New Message</Button>} closeIcon>
                    <Modal.Content>
                        <Modal.Header>Compose Message</Modal.Header>
                        <Form>
                            <Form.Field control='input' label='To' placeholder='username123' onChange={(e) => this.handleChange(e.target.value, 'to')}/>
                            <Form.Field control='input' label='Subject' placeholder='Subject' onChange={(e) => this.handleChange(e.target.value, 'subject')}/>
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
        // userMessages: state.userMessages
    };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);