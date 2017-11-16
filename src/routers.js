import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AccountSettings from './components/AccountSettings/AccountSettings';
import Dashboard from './components/Dashboard/Dashboard';
import Events from './components/Events/Events';
import GroupPage from './components/GroupPageAllFeed/GroupPageAllFeed';
import NoGroupFound from './components/GroupPageAllFeed/NoGroupFound/NoGroupFound';
import Landing from './components/Landing/Landing';
import Messages from './components/Messages/Messages';
import MyActivityLog from './components/MyActivityLog/MyActivityLog';
import Navbar from './components/Navbar/Navbar';
import PostPage from './components/PostPage/PostPage';
import PublicProfile from './components/PublicProfile/PublicProfile';
import UserRegistration from './components/UserRegistration/UserRegistration';

// the below imports are modals. they won't need to be in here once our app is complete. - Marina
import PostModal from './components/GroupPageAllFeed/PostModal/PostModal';






class Routers extends Component {
    render() {
        return(
            <div>
                <Route exact path='/' component={Landing}/>
                <Route path='/dashboard' component={Dashboard}/>
                <Route path='/accountsettings' component={AccountSettings}/>
                <Route path='/events' component={Events}/>
                <Route path='/grouppage' component={GroupPage}/>
                <Route path='/nogroupfound' component={NoGroupFound}/>
                <Route path='/messages' component={Messages}/>
                <Route path='/myactivitylog' component={MyActivityLog}/>
                <Route path='/postpage' component={PostPage}/>
                <Route path='/publicprofile' component={PublicProfile}/>
                <Route path='/userregistration' component={UserRegistration}/>

                {/* the below paths are just here so i can work on their functionality, etc. THEY ARE MODALS THO SO THEY WON'T NEED ROUTES LATER. -Marina */}
                <Route path='/modal' component={PostModal} />  
            </div>
        )
    }
}
export default Routers;