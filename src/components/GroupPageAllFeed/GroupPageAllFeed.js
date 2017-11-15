import React, { Component } from 'react';
import { connect } from 'react-redux';

class GroupPageAllFeed extends Component {
    render(){
        return(
            <div>GroupPageAllFeed</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupPageAllFeed);