import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            navDropDownVisible: false
        }
        this.openNavDropDown = this.openNavDropDown.bind(this);
    }

    openNavDropDown() {
        this.setState({
            navDropDownVisible: !this.state.navDropDownVisible
        })
    }

    render() {
        return (
            <div className='Navbar'>
                <div className='nav-main'>
                    <div className='nav-parent'>

                        <Link to='/dashboard' className='nav-logo-header'>
                            <div className='nav-logo-parent'>PURELY SUPPORT</div>
                        </Link>

                        <div className='nav-menu-container' onClick={this.openNavDropDown}>
                            <div className={this.state.navDropDownVisible ? 'hide' : 'nav-menu-icon fix-link'}><a>&equiv;</a></div>
                        </div>

                        <div className={this.state.navDropDownVisible ? 'nav-drop-down nav-drop-down-open' : 'nav-drop-down'}>

                            <div className={this.state.navDropDownVisible ? 'nav-menu-icon' : 'hide'}><a onClick={this.openNavDropDown}>&times;</a></div>

                            <div className='nav-drop-down-parent'>
                                <Link to='/dashboard' className='fix-link2'>
                                    <list>DASHBOARD</list>
                                </Link>
                                <Link to='/messages' className='fix-link2'>
                                    <list>MESSAGES</list>
                                </Link>
                                <Link to='/friends' className='fix-link2'>
                                    <list>FRIENDS</list>
                                </Link>
                                <Link to='/grouppage' className='fix-link2'>
                                    <list>GROUPS</list>
                                </Link>
                                <Link to='/events' className='fix-link2'>
                                    <list>EVENTS</list>
                                </Link>
                                <Link to='/accountsettings' className='fix-link2'>
                                    <list>ACCOUNT SETTINGS</list>
                                </Link>
                                <a href={process.env.REACT_APP_LOGOUT}>
                                    <list>LOGOUT</list>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
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