import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Form, Header, Checkbox } from 'semantic-ui-react'
import { getUserDetails } from '../../ducks/reducer';
import axios from 'axios';

class NoGroupFound extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            title: '',
            open: false
        }

        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(e, formfield) {
        this.setState({
            [formfield]: e
        })
    }

    closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
        this.setState({ closeOnEscape, closeOnRootNodeClick, open: true })
    }

    close = () => this.setState({ open: false })

    render() {

        const { open, closeOnEscape, closeOnRootNodeClick } = this.state

        return (
            <div>No Group Found!</div>

            <Modal trigger={<Button onClick={this.closeConfigShow(true, false)}>Create New Group</Button>}
                closeIcon open={open}
                closeOnRootNodeClick={closeOnRootNodeClick}
                onClose={this.close}>
                <Modal.Header>What's On Your Mind?</Modal.Header>
                <Modal.Content >
                    <Form>
                        <Form.Field control='input' Label='Title' placeholder='Title' onChange={(e) => this.titleChange('title', e)} required />
                        <ReactQuill className='editor'
                            theme='snow'
                            value={this.state.text}
                            onChange={this.handleChange}
                        />
                        {this.state.text === '' || this.state.title === '' ? <Button disabled>Submit</Button> : <Button onClick={() => this.addPost()}>Submit</Button>}
                        <div className='render'>
                            <div dangerouslySetInnerHTML={{ __html: this.state.post }} />
                        </div>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        userCredentials: state.userCredentials,
        userDetails: state.userDetails,
    }
}
export default connect(mapStateToProps, { getUserDetails })(NoGroupFound);