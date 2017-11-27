import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Form, Header, Checkbox, Icon, Grid, Image } from 'semantic-ui-react'
import { getUserDetails } from '../../ducks/reducer';
import axios from 'axios';

class PostPage extends Component {
    constructor() {
        super()
        this.state = {
            comments: [],
            commenterInfo: [],
            pointtotal: 0,
            post: {},
            upvoted: false,

            newComment: '',
            newReply: '',

            commentFormVisible: false,
            replyFormVisible: false,
            collapsed: true,
        }

        this.showReplyForm = this.showReplyForm.bind(this);
        this.showCommentForm = this.showCommentForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);

    }

    componentDidMount() {
        this.props.getUserDetails(this.props.userCredentials.userid)
        // axios.get(`/api/getpost/${this.props.match.params.postid}`)
        // .then(res => this.setState({
        //     post: res.data[0]
        // }))
        // axios.get(`/api/getcomments/${this.props.match.params.postid}`)
        // .then(res => this.setState({
        //     comments: res.data
        // }))


        axios.get('/api/getpost/2')
            .then(res => this.setState({
                post: res.data[0]
            }))
        axios.get('/api/getcomments/2')
            .then(res => this.setState({
                comments: res.data
            }))
            .then(() => {
                const comments = this.state.comments

                comments.map((comment, index) => {
                    return axios.get(`/api/getusercredentials/${comment.userid}`)
                        .then((res) => {
                            console.log('this is res', res)
                            this.setState({
                                commenterInfo: res.data
                            })
                        })
                })
            })
    }

    showCommentForm() {
        this.setState({
            commentFormVisible: !this.state.replyFormVisible
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
        const data = {
            userid: this.props.userCredentials.userid,
            postid: this.props.match.params.postid,
            comment: this.state.newComment
        }
        axios.put('/postcomment', data)
            .then(res => alert('comment added'))
    }

    upvotePost(i) {
        const data = {
            commentid: this.state.post.postid,
            pointtotal: this.state.post.pointtotal
        }
        axios.put('/api/upvotepost', data)
            .then(res => res)
    }


    upvoteComment(commentid, pointtotal) {
        if (this.state.upvoted === false) {
            let data = {
                commentid: commentid,
                pointtotal: pointtotal,
            }
            axios.put('/api/upvotecomment', data)
                .then(() => {
                    this.setState({
                        upvoted: true
                    })
                })

        } else {
            let data = {
                commentid: commentid,
                pointtotal: pointtotal,
            }
            axios.put('/api/downvotecomment', data)
                .then(() => {
                    this.setState({
                        upvoted: false
                    })
                })
        }
    }


    render() {
        const { collapsed } = this.state
        console.log('this.state.upvoted', this.state.upvoted)
        return (
            <div className='PostPage'>

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
                            {/* <Icon name='empty heart' size='large' color='red' className='heart'/>
                            <div cl>{this.state.post.pointtotal}</div> */}
                            <div><Icon name='empty heart' size='large' color='red' /><span>{this.state.post.pointtotal}</span></div>
                        </Grid.Column>
                    </Grid.Row>


                    <Grid.Row>
                        <Grid.Column width={11}>
                            <div>{this.state.post.content}</div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


                {this.state.comments.map((comment, index) => {
                    // <Checkbox defaultChecked label='Collapse comments' onChange={this.handleCheckbox} />
                    return (
                        <Comment.Group threaded >
                            <Header as='h3' dividing>Comments</Header>
                            {this.state.commenterInfo.map((commenter, index) => {
                                return (
                                    <Comment>
                                        <Comment.Avatar src={commenter.img} />
                                        <Comment.Content>
                                            <Comment.Author as='a'>{commenter.displayname}</Comment.Author>

                                            <Comment.Metadata>
                                                <div>{comment.timestamp}</div>


                                                <Icon name='empty heart' size='large' color='red' onClick={() => this.upvoteComment(comment.commentid, comment.pointtotal)} />
                                                <div>{comment.pointtotal}</div>
                                            </Comment.Metadata>

                                            <Comment.Text>{comment.comment}</Comment.Text>
                                            <Comment.Actions>
                                                <Comment.Action onClick={() => this.showReplyForm()}>Reply To Comment</Comment.Action>
                                            </Comment.Actions>
                                            {this.state.replyFormVisible === false ? <p></p> :
                                                <Form reply>
                                                    <Form.TextArea onChange={(e) => this.handleChange(e.target.value, 'newReply')} />
                                                    <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                                                </Form>
                                            }
                                        </Comment.Content>
                                    </Comment>
                                )
                            })}
                            {this.state.commentFormVisible === false ? <p></p> :
                                <Form reply>
                                    <Form.TextArea onChange={(e) => this.handleChange(e.target.value, 'newComment')} />
                                    <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                                </Form>
                            }
                        </Comment.Group>
                    )
                })}
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