import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Form, Header, Icon, Grid } from 'semantic-ui-react'
import { getUserDetails } from '../../ducks/reducer';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import fns from './../../utilities/functions';

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
        }

        this.showReplyForm = this.showReplyForm.bind(this);
        this.showCommentForm = this.showCommentForm.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        this.props.getUserDetails(this.props.userCredentials.userid)
       
        // axios.get(`/api/getpost/${this.props.match.params.id}`)
        //     .then(res => this.setState({
        //         post: res.data[0]
        //     }))

        // axios.get(`/api/getcomments/${this.props.match.params.id}`)
        //     .then(res => {
        //         this.setState({
        //             comments: res.data
        //         })
        //     })
        
        fns.grabPost(`/api/getpost/${this.props.match.params.id}`)
        .then( res => {
            this.setState({
                post: res
            })
        })
       
        fns.getComments(`/api/getcomments/${this.props.match.params.id}`)
        .then( res => {
            this.setState({
                comments: res
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
        let timestamp = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
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
        let timestamp = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
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

    // upvotePost(postid) {
    //     if (this.state.upvoted === false) {
    //         let data = {
    //             postid: postid,
    //         }
    //         axios.put(`/api/upvotepost/${postid}`, data)
    //             .then(() => {
    //                 this.setState({
    //                     upvoted: true
    //                 })
    //             })

    //     } else {
    //         let data = {
    //             postid: postid,
    //         }
    //         axios.put(`/api/downvotepost/${postid}`, data)
    //             .then(() => {
    //                 this.setState({
    //                     upvoted: false
    //                 })
    //             })
    //     }
    // }


    render() {
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
                            {/* {this.state.upvoted ?
                                <div><Icon name='empty heart' size='large' color='red' onClick={(this.upvotePost(this.state.post.postid))} /><span>{this.state.post.pointtotal}</span></div> :
                                <div><Icon name='heart' size='large' color='red' onClick={(this.upvotePost(this.state.post.postid))} /><span>{this.state.post.pointtotal}</span></div>
                            } */}
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
                                        
                                        <Icon name='heart' size='large' color='red' onClick={() => this.upvoteComment(comment.commentid, comment.pointtotal)} /> 








                                        {/* {this.state.upvoted ?
                                            <Icon name='heart' size='large' color='red' onClick={() => this.upvoteComment(comment.commentid, comment.pointtotal)} /> :
                                            <Icon name='empty heart' size='large' color='red' onClick={() => this.upvoteComment(comment.commentid, comment.pointtotal)} />
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