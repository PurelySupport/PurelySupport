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
        
        if (this.props.allUsers.length > 0) {
            return this.props.allUsers.map((friend, i, arr) => {
                if (this.props.userCredentials.friends.includes(friend.userid) === true) {
                    return (
                        // <div className='friendBox'>
                                 <div className='friendimg'>
                                   <img className="image" src={friend.img} />  <br/> 
                                  <div className="friend-name"> {friend.displayname} </div>
                                 </div>
                                
                                    
                                 
                            //  </div> 
                    )
                }
            })   
        }
        else return (<div>You Don't Have Any Friends Yet!</div>)



    }



    render(){
        return(
            <div className='friends-parent-div'>
            <Navbar/>
            <div className="friends-title">My Friends</div>
                <div className="friendsContainer">
                    {this.getFriends()}
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