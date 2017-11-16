import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div className='Navbar'>
                {/* <nav class="side-menu">
                    <ul>
                        <Link to='/accountsettings'>
                            <li>Account<span></span></li>
                        </Link>
                        <a href={process.env.REACT_APP_LOGOUT}>
                            <li>logout<span></span></li>
                        </a>
                    </ul>
                </nav> */}
                <nav class="side-menu">
                    <ul>
                        <Link to='/accountsettings'>
                            <li>Account<span><i class="user icon"></i></span></li>
                        </Link>
                        <Link to='/messages'>
                            <li>messages<span><i class="inbox icon"></i></span></li>
                        </Link>
                        <li>friends<span><i class="address book icon"></i></span></li>
                        <li>groups<span><i class="users icon"></i></span></li>
                        <Link to='/events'>
                            <li>events<span><i class="calendar icon"></i></span></li>
                        </Link>
                        <li><a href={process.env.REACT_APP_LOGOUT}>logout<span><i class="sign out icon"></i></span></a></li>
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