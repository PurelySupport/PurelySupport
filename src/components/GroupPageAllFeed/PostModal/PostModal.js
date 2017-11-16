import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';


class PostModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            title: ''
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
        return (
            <div className='PostModal'>
                Title:
                <input type='text' value={this.state.title}
                    onChange={(e) => this.titleChange('title', e)}></input>

                <ReactQuill className='editor'
                    value={this.state.text}
                    onChange={this.handleChange}
                // modules={{ toolbar: toolbarOptions }}  
                />

                <button onClick={() => this.addPost()}>Create Post</button>

                <div className='render'>
                    <div dangerouslySetInnerHTML={{ __html: this.state.post }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);