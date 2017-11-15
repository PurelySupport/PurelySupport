import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PostPage.css';

class PostPage extends Component {
    render(){
        return(
            <div>PostPage</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);