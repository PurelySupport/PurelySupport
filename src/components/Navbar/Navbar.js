import React, { Component } from 'react';
import { connect } from 'react-redux';

class Navbar extends Component {
    render(){
        return(
            <div className='Navbar'>Navbar</div>
        )
    }
}

function mapStateToProps(state) {
    return {  };
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);