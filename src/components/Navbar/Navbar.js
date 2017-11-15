import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Navbar.css';

class Navbar extends Component {
    render(){
        return(
            <div>Navbar</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);