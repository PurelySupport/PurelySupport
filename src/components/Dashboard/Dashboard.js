import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserCredentials } from '../../ducks/reducer';
import Navbar from '../Navbar/Navbar';

class Dashboard extends Component {

    

    componentDidMount() {
        this.props.getUserCredentials

    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        if (newProps.userCredentials.displayname === null) {
            this.props.history.push('/userregistration')
        } else {
            console.log('user registered')
        }
    }

    render() {
        const user = this.props.userCredentials
        console.log(user)
        return (
            <div className='Dashboard'>Dashboard
            <Navbar />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userCredentials: state.userCredentials

    }
}


export default connect(mapStateToProps, { getUserCredentials })(Dashboard);