import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div className='Navbar'>
                <nav class="side-menu">
                    <ul>
                        <Link to='/accountsettings'>
                            <li>Account<span></span></li>
                        </Link>
                        <a href={process.env.REACT_APP_LOGOUT}>
                            <li>logout<span></span></li>
                        </a>
                    </ul>
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);