import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Modal, Form, TextArea, Input, Icon } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import fns from './../../utilities/functions';

class GroupPageAllFeed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            text: '',
            title: '',
            open: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.addPost = this.addPost.bind(this)
        this.titleChange = this.titleChange.bind(this)

    }

    componentDidMount() {
        // axios.get('/api/allposts')
        //     .then(res => this.setState({
        //         posts: res.data
        //     }))

        fns.getPosts('/api/allposts').then( res => {
            this.setState({
                posts: res
            })
        })


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

        console.log('this is state.posts', this.state.posts)

        const { open, closeOnEscape, closeOnRootNodeClick } = this.state

        return (
            <div className='GroupPageAllFeed'>
                <h1>Group Page/All Feed</h1>
                <Navbar />
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


                {this.state.posts === '' ? <p></p> : this.state.posts.map((post, index) => {
                    return (
                        <div className="two">
                            <div className="example-2 card">
                                <div className="wrapper">
                                    <div className="header">
                                        <div className="date">
                                            <span>{post.timestamp}</span>
                                        </div>
                                        <ul className="menu-content">
                                            <li><Icon name='empty heart' size='small' color='red'/><span>{post.pointtotal}</span></li>
                                            <li><Icon name='comments' size='small' /><span>3</span></li>
                                        </ul>
                                    </div>
                                    <div className="data">
                                        <div className="content">
                                            <span className="author">Author</span>
                                            <Link to={`/postpage/${post.postid}`} className='fix-link'>
                                                <h1 className="title">{post.title}</h1>
                                            </Link>
                                            <p className="text">{post.content.substr(0, 200) + '...'}</p>
                                            <Link to={`/postpage/${post.postid}`} className='fix-link'>
                                                <a className='fix-link'>Read more</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                }



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