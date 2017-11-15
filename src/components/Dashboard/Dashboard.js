import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
    render(){
        return(
            <div>Dashboard</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);