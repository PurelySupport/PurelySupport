import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Modal, Form, TextArea, Input } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

class GroupPageAllFeed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            title: '',
            open: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.addPost = this.addPost.bind(this)
        this.titleChange = this.titleChange.bind(this)
        
    }

    handleChange(value) {
        this.setState({ text: value })
    }

    titleChange(prop, e) {
        this.setState({
            [prop]: e.target.value,
        })
    }

    closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
        this.setState({ closeOnEscape, closeOnRootNodeClick, open: true })
    }

    close = () => this.setState({ open: false })

    addPost() {
        const body = {
            userid: this.props.userCredentials.userid,
            groupid: 2,
            content: this.state.text,
            timestamp: Date.now(),
            pointtotal: 0,
            title: this.state.title
        }
        return axios.post(`/api/createpost`, body)
    }
    render() {

        const { open, closeOnEscape, closeOnRootNodeClick } = this.state

        return (
            <div className='GroupPageAllFeed'>
                <h1>Group Page/All Feed</h1>
                <div>list of posts</div>
                <div>post</div>
                <div>post</div>
                <div>post</div>
                <div>post</div>

                <Modal trigger={<Button onClick={this.closeConfigShow(true, false)}> New Post</Button>} 
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
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userCredentials: state.userCredentials
    };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupPageAllFeed);