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
            pointtotal: 0,
            post: {},

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
        const data = {
            commentid: commentid,
            pointtotal: pointtotal
        }
        axios.put('/api/upvotecomment', data)
        .then(res => console.log('comment has been updated'))
    }

    render() {
        const { collapsed } = this.state
        console.log('this.state.comments', this.state.comments[0])
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
                            <Icon name='chevron up' size='large' />
                            <div>{this.state.post.pointtotal}</div>
                            <Icon name='chevron down' size='large' />
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
                            <Comment>
                                <Comment.Avatar src={comment.userid} />
                                <Comment.Content>
                                    <Comment.Author as='a'>{comment.userid}</Comment.Author>

                                    <Comment.Metadata>
                                        <div>{comment.timestamp}</div>


                                        <Icon name='chevron up' size='large' onClick={() => this.upvoteComment(comment.commentid, comment.pointtotal)}/>
                                        <div>{comment.pointtotal}</div>


                                        <Icon name='chevron down' size='large' />
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