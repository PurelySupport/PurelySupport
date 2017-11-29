import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Modal, Form, TextArea, Input, Icon, Card } from 'semantic-ui-react';
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
            image: '',
            open: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.addPost = this.addPost.bind(this)

    }

    componentDidMount() {
        if (this.props.userCredentials.userid == null) {
            axios.get('/api/allposts')
                .then((res) => {
                    this.setState({
                        posts: res.data
                    })
                })
        } else {
            axios.get('/api/allposts')
                .then((res) => {
                    this.setState({
                        posts: res.data
                    })
                })
        }
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

    addPost() {
        let currentdate = new Date();
        let timestamp = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        const body = {
            userid: this.props.userCredentials.userid,
            groupid: 2,
            content: this.state.text,
            timestamp: timestamp,
            pointtotal: 0,
            title: this.state.title,
            image: this.state.image
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
                            <Form.Field control='input' Label='Title' placeholder='Title' onChange={(e) => this.handleChange(e.target.value, 'title')} required />
                            <Form.Field control='input' Label='Image URL' placeholder='Image URL' onChange={(e) => this.handleChange(e.target.value, 'image')} required />
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



                {/* fancier cards */}
                {this.state.posts === '' ? <p></p> : this.state.posts.map((post, index) => {
                    return (
                        <figure className="card">
                            <div><img src={post.image} alt="" /></div>
                            <figcaption>
                                {/* <h5>Food</h5> */}
                                <Link to={`/postpage/${post.postid}`} className='fix-link'>
                                <h4>{post.title}</h4>
                                </Link>
                                <footer>
                                    <div className="date">{post.timestamp}</div>
                                    <div className="icons">
                                        <div><Icon name='empty heart' size='large' color='red' />{post.pointtotal}</div>
                                    </div>
                                </footer>
                            </figcaption>
                        </figure>
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






















{/* <div className="two">
    <div className="example-2 card">
        <div className="wrapper">
            <div className="header">
                <div className="date">
                    <span>{post.timestamp}</span>
                </div>
                <ul className="menu-content">
                    <li><Icon name='empty heart' size='small' color='red' /><span>{post.pointtotal}</span></li>
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
</div> */}