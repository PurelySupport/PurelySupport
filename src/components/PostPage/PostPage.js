import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Form, Header, Icon, Grid } from 'semantic-ui-react'
import { getUserDetails } from '../../ducks/reducer';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

class PostPage extends Component {
    constructor() {
        super()
        this.state = {
            comments: [],
            commenterInfo: [],
            post: {},

            newComment: '',
            newReply: '',

            commentFormVisible: false,
            replyFormVisible: false,
        }

        this.showReplyForm = this.showReplyForm.bind(this);
        this.showCommentForm = this.showCommentForm.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        this.props.getUserDetails(this.props.userCredentials.userid)
        axios.get(`/api/getpost/${this.props.match.params.id}`)
            .then(res => this.setState({
                post: res.data[0]
            }))
        axios.get(`/api/getcomments/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    comments: res.data
                })
            })
    }

    showCommentForm() {
        this.setState({
            commentFormVisible: !this.state.commentFormVisible
        })
    }

    showReplyForm() {
        this.setState({
            replyFormVisible: !this.state.replyFormVisible
        })
    }

    handleChange(e, formfield) {
        this.setState({
            [formfield]: e
        })
    }

    handleCheckbox(e, { checked }) {
        this.setState({
            collapsed: checked
        })
    }

    addComment() {
        let currentdate = new Date();
        let timestamp = (currentdate.getMonth() + 1) + "/"
            + currentdate.getDate() + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        const data = {
            userid: this.props.userCredentials.userid,
            postid: this.state.post.postid,
            comment: this.state.newComment,
            timestamp: timestamp
        }

        axios.post('/api/postcomment', data)
            .then(() => {
                window.location.reload()
            })
    }

    addReply(commentid) {
        let currentdate = new Date();
        let timestamp = (currentdate.getMonth() + 1) + "/"
            + currentdate.getDate() + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        const data = {
            userid: this.props.userCredentials.userid,
            commentid: commentid,
            content: this.state.newReply,
            timestamp: timestamp
        }

        axios.post('/api/createreply', data)
            .then(() => {
                window.location.reload()
            })
    }

    upvoteComment(commentid) {
        const data = {
            commentid: commentid,
            userid: this.props.userCredentials.userid
        }
        axios.put('/api/upvotecomment', data)
            .then(res => console.log(res))
    }

    upvotePost(postid) {
        const data = {
            commentid: postid,
            userid: this.props.userCredentials.userid
        }
        axios.put('/api/upvotepost', data)
            .then(res => console.log(res))
    }

    render() {
        console.log('this.state.post', this.state.post.liked_by)
        return (
            <div className='PostPage'>
                <Navbar />
                <Grid centered verticalAlign='top' celled>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <h1>{this.state.post.title}</h1>
                        </Grid.Column>
                    </Grid.Row>


                    <Grid.Row>
                        <Grid.Column width={5}>
                            <div>{this.state.post.timestamp}</div>
                        </Grid.Column>

                        <Grid.Column width={5}>



                            {this.state.post.liked_by == null ?
                                <Icon name='empty heart' size='large' color='red' onClick={() => this.upvotePost(this.state.post.postid)} /> :
                                <Icon name='heart' size='large' color='red' onClick={() => this.upvotePost(this.state.post.postid)} />
                            }
                            <div>{this.state.post.pointtotal}</div>
                        </Grid.Column>
                    </Grid.Row>


                    <Grid.Row>
                        <Grid.Column width={11}>
                            <div>{this.state.post.content}</div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


                <Comment.Group threaded >
                    <Header as='h3' dividing>Comments</Header>
                    {this.state.comments.map((comment, index) => {
                        return (
                            <Comment key={comment.commentid}>
                                <Comment.Avatar src={comment.img} />
                                <Comment.Content>
                                    <Comment.Author as='a'>{comment.displayname}</Comment.Author>

                                    <Comment.Metadata>
                                        <div>{comment.timestamp}</div>

                                        {/* {comment.liked_by.indexOf(this.props.userCredentials.userid) === -1 ? 
                                        <Icon name='empty heart' size='large' color='red' onClick={() => this.upvoteComment(comment.commentid)} /> :
                                        <Icon name='heart' size='large' color='red' onClick={() => this.upvoteComment(comment.commentid)} /> 
                                    } */}

                                        <div>{comment.pointtotal}</div>
                                    </Comment.Metadata>

                                    <Comment.Text>{comment.comment}</Comment.Text>
                                    {/* <Comment.Actions>
                                        <Comment.Action onClick={() => this.showReplyForm()}>Reply To Comment</Comment.Action>
                                    </Comment.Actions> */}
                                    {this.state.replyFormVisible === false ? <p></p> :
                                        <Form reply>
                                            <Form.TextArea onChange={(e) => this.handleChange(e.target.value, 'newReply')} />
                                            <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={() => this.addReply(comment.commentid)} />
                                        </Form>
                                    }
                                </Comment.Content>
                            </Comment>

                        )
                    })}
                    {this.state.commentFormVisible === false ? <p></p> :
                        <Form reply>
                            <Form.TextArea onChange={(e) => this.handleChange(e.target.value, 'newComment')} />
                            {this.state.newComment === '' ?
                                <Button content='Add Comment' labelPosition='left' icon='edit' disabled /> :
                                <Button content='Add Comment' labelPosition='left' icon='edit' primary onClick={() => this.addComment()} />

                            }
                            <Button content='Cancel' labelPosition='left' icon='remove' onClick={() => this.showCommentForm()} />

                        </Form>
                    }

                </Comment.Group>


                {this.state.commentFormVisible === false ?
                    <Button content='Add New Comment' labelPosition='left' icon='edit' primary onClick={() => this.showCommentForm()} /> :
                    <p></p>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userCredentials: state.userCredentials,
        userDetails: state.userDetails,
    }
}
export default connect(mapStateToProps, { getUserDetails })(PostPage);