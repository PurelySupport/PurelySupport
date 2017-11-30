import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from './../Navbar/Navbar';
import { Header } from 'semantic-ui-react';
import { getAllUsers } from './../../ducks/reducer';
import axios from 'axios';


class Friends extends Component {

    constructor(){
        super()

        this.state = {
            friends:[]
        }

        this.getFriends = this.getFriends.bind(this)


    }
 
    componentDidMount() {
        this.props.getAllUsers()
        this.getFriends()
        //this.props.allUsers has all the users
        // setTimeout( this.getFriends(), 1000)
    }




    getFriends() {
        this.props.userCredentials.friends !== null ?
        this.props.allUsers.map( (friend, i) => {
            return <div className='friendBox'>
                <div className='friendImage'>
                 {friend.img}   
                </div>
                <div>
                    {friend.displayname}
                </div>
            </div> 
        } ) :  <div>You Don't have any friends yet!</div>
    }



    render(){
        return(
            <div className='friendsContainer'>
            <Navbar/>
                {this.getFriends()}
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