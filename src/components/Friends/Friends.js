import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './../Navbar/Navbar';
import { Header } from 'semantic-ui-react';
import { getAllUsers } from './../../ducks/reducer';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Friends extends Component {

    constructor() {
        super()

        this.state = {
            friends: []
        }

        this.getFriends = this.getFriends.bind(this)


    }

    componentDidMount() {
        this.props.getAllUsers()
        this.getFriends()
    }




    getFriends() {

        if (this.props.allUsers.length > 0) {
            return this.props.allUsers.map((friend, i, arr) => {
                if (this.props.userCredentials.friends.includes(friend.userid) === true) {
                    console.log('friend', friend)
                    return (
                        // <div className='friendBox'>
                        <div className='friendimg'>
                        <Link to={`/publicprofile/${friend.userid}`} className='fix-link'>
                            <img className="image" src={friend.img} />  <br />
                            <div className="friend-name"> {friend.displayname} </div>
                        </Link>
                        </div>



                        //  </div> 
                    )
                }
            })
        }
        else return (<div>You Don't Have Any Friends Yet!</div>)
    }



    render() {
        return (
            <div className='Friends'>

                <div className='friends-parent-div'>
                    <Navbar />
                    <div className="friends-title">My Friends</div>
                    <div className="friendsContainer">
                        {this.getFriends()}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userCredentials: state.userCredentials,
        allUsers: state.allUsers
    }
}

const mapDispatchToProps = {
    getAllUsers: getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends)