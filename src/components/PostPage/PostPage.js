import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostPage extends Component {
    render(){
        return(
            <div className='PostPage'>PostPage</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);