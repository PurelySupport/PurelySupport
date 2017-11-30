import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div className='Navbar'>
                <nav className="side-menu">
                    <ul>
                        <Link to='/accountsettings' className='fix_link'>
                            <li>Account<span><i className="user icon"></i></span></li>
                        </Link>
                        <Link to='/messages' className='fix_link'>
                            <li>messages<span><i className="inbox icon"></i></span></li>
                        </Link>
                        <Link to='/friends' className='fix_link'>
                        <li>friends<span><i className="address book icon"></i></span></li>
                        </Link>
                        <Link to='/grouppage' className='fix_link'>
                            <li>groups<span><i className="users icon"></i></span></li>
                        </Link>
                        <Link to='/events' className='fix_link'>
                            <li>events<span><i className="calendar icon"></i></span></li>
                        </Link>
                        <li><a href={process.env.REACT_APP_LOGOUT}>logout<span><i className="sign out icon"></i></span></a></li>
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