import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Modal, Button, Header, Icon, Input, Image } from 'semantic-ui-react';

class Events extends Component {
    constructor() {
        super();

        this.state = {
            title: '',
            location: '',
            date: '',
            time: '',
            img: '',
        }
    }

    handleChange(e, formfield) {
        this.setState({
            [formfield]: e
        })
    }

    render() {
        return (
            <div className='Events'>
                <Modal trigger={<Button>Create Event</Button>} closeIcon>
                    <Modal.Content>
                        <Modal.Header>New Event</Modal.Header>
                        <Form>
                            <div className='modal'>
                                <div className='positioning-wrapper'>
                                    <div className='left-wrapper'>
                                        <div className='outer-input-wrapper'>
                                            <div className='input-wrapper'>
                                                Title
                            <Input onChange={(e) => this.handleChange(e.target.value, 'title')}></Input>
                                            </div>
                                            <div className='input-wrapper'>
                                                Location
                            <Input onChange={(e) => this.handleChange(e.target.value, 'location')}></Input>
                                            </div>
                                        </div>
                                        <div className='outer-input-wrapper'>
                                            <div className='input-wrapper'>
                                                Date
                            <Input onChange={(e) => this.handleChange(e.target.value, 'date')}></Input>
                                            </div>
                                            <div className='input-wrapper'>
                                                Time
                            <Input onChange={(e) => this.handleChange(e.target.value, 'time')}></Input>
                                            </div>
                                        </div>
                                        <div className='input-wrapper-imgurl'>
                                            Image URL
                            <Input onChange={(e) => this.handleChange(e.target.value, 'img')}></Input>
                                        </div>
                                    </div>
                                    <div className='right-wrapper'>
                                        <div className='outer-input-wrapper-img'>
                                            <Image className='img' src={this.state.img} />
                                        </div>
                                    </div>
                                </div>
                                <div className='input-wrapper-desc'>
                                    Description
                            <textarea rows='6'></textarea>
                                </div>
                            </div>
                        </Form>
                    </Modal.Content>
                </Modal>
                <div className='events-holder'>
                    <div className='featured-event'></div>
                    <div className='event'></div>
                    <div className='event'></div>
                    <div className='event'></div>
                    <div className='event'></div>
                    <div className='event'></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);