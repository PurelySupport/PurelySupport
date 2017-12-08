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
            image1: '',
            open: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleChange2 = this.handleChange2.bind(this)
        this.addPost = this.addPost.bind(this)

    }

    componentDidMount() {
        axios.get('/api/allposts')
        .then((res) => {
            this.setState({
                posts: res.data
            })
        })
    }

    handleChange(e, formfield) {
        this.setState({
            [formfield]: e
        })
    }

    handleChange2(value) {
        this.setState({ text: value })
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
            image1: this.state.image1
        }
        console.log('body', body)
        return axios.post(`/api/createpost`, body)
    }

    render() {

        const { open, closeOnEscape, closeOnRootNodeClick } = this.state

        return (
            <div className='GroupPageAllFeed'>
                <Navbar />
                <div className='main'>
                    <div className='container'>

                        <div className='new-post-btn'>
                        <div>Group Name</div>
                            <Modal trigger={<Button onClick={this.closeConfigShow(true, false)} className='np-btn'> New Post</Button>}
                                closeIcon open={open}
                                closeOnRootNodeClick={closeOnRootNodeClick}
                                onClose={this.close}>
                                <Modal.Header>What's On Your Mind?</Modal.Header>
                                <Modal.Content >
                                    <Form>
                                        <Form.Field control='input' Label='Title' placeholder='Title' onChange={(e) => this.handleChange(e.target.value, 'title')} required />
                                        <Form.Field control='input' Label='Image URL' placeholder='Image URL' onChange={(e) => this.handleChange(e.target.value, 'image1')} required />
                                        <ReactQuill className='editor'
                                            theme='snow'
                                            value={this.state.text}
                                            onChange={this.handleChange2}
                                        />
                                        <Button onClick={() => this.addPost()}>Submit</Button>
                                        <div className='render'>
                                            <div dangerouslySetInnerHTML={{ __html: this.state.post }} />
                                        </div>
                                    </Form>
                                </Modal.Content>
                            </Modal>
                        </div>



                        {/* fancier cards */}
                        <div className='card-container'>

                        {this.state.posts === '' ? <p></p> : this.state.posts.map((post, index) => {
                            return (
                                <figure className="card">
                                    <div><img src={post.image} alt="" /></div>
                                    <figcaption>
                                        {/* <h5>Food</h5> */}
                                        <Link to={`/postpage/${post.postid}`} className='fix-link'>
                                        <img src={post.image1}/>
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

                    </div>
                </div>
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