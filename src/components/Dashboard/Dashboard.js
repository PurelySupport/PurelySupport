import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserCredentials } from '../../ducks/reducer';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props){
        super(props)

        this.state = {
            groups: [],
        }

    }

    
componentWillReceiveProps(newProps) {
        console.log('new props', newProps)
        if (newProps.userCredentials.displayname === null) {
            this.props.history.push('/userregistration')
        } else {
            axios.get(`/api/getusergroups/${newProps.userCredentials.userid}`)
            .then((res) => {
                res.data.map((group, index) => {
                    this.setState({
                        groups: group.groupid
                    })
                })
            })
        }
    }

    render() {
        const user = this.props.userCredentials
        console.log('user', user)
        return (
            <div className='Dashboard'>
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