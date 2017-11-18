import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { getUserDetails } from '../../ducks/reducer';
import axios from 'axios';

class PostPage extends Component {
    constructor() {
        super()
        this.state = {
            comments: {},
            post: {}
        }
    }

    componentDidMount() {
        this.props.getUserDetails(this.props.userCredentials.userid)
        axios.get('/api/getpost/:2')
        .then(res => console.log(res))
    }

    render() {
        console.log(this.state)
        return (
            <div className='PostPage'>

                <h1>Post Title</h1>
                <div>Post Content</div>


                <Comment.Group threaded >
                    <Header as='h3' dividing>Comments</Header>

                    <Comment>
                        <Comment.Avatar src={this.props.userCredentials.img} />
                        <Comment.Content>
                            <Comment.Author as='a'>{this.props.userCredentials.displayname}</Comment.Author>
                            <Comment.Metadata>
                                <div>Today at 5:42PM</div>
                            </Comment.Metadata>
                            <Comment.Text>Comment Content</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                            <Form reply>
                                <Form.TextArea />
                                <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                            </Form>
                        </Comment.Content>
                    </Comment>


                    <Form reply>
                        <Form.TextArea />
                        <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                    </Form>

                </Comment.Group>
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