import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser, updateUser} from '../../ducks/reducer'
import HomeLogo from '../../assets/home_logo.png'
import NewPost from '../../assets/new_logo.png'
import Logout from '../../assets/shut_down.png'

import './nav.styles.css'
import Axios from 'axios'

class Nav extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount = ()=>{
        Axios.get('/auth/me').then(res =>{
            this.props.updateUser(res.data)
        }).catch(()=>{
            this.props.history.push('/')
        })
    }
    handleLogout = () =>{
        //TODO--make delete request to destroy session
        Axios.post('/auth/logout').then(()=>{
            this.props.logoutUser()
            this.props.history.push('/')
        }).catch(err=> alert(err))
    }
    
    render(){
        const {id, username, profile_pic} = this.props
        console.log("my props" , this.props)
        return(
            <div className='nav-container'>
                <div className='nav-main'>
                    <div className='nav-profile-data'>
                        <img className='nav-profile-img' src={profile_pic + parseInt(id) + '?set=set2&size=80x80'} alt="UserIcon"/>
                        <p>{username}</p>
                    </div>
                    
                    <Link to='/dashboard' >
                        <img className='nav-home' src={HomeLogo}/>
                    </Link>
                    <Link to='/new' >
                    <img className='nav-new-post' src={NewPost}/>
                    </Link>
                </div>
                <div onClick={()=> this.handleLogout()} className='nav-logout'>
                    <img className='nav-new-post' src={Logout} alt=""/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = reduxState => {
    console.log('reduxState : ', reduxState)
    return {id: reduxState.user.id, username: reduxState.user.username, profile_pic: reduxState.user.profile_pic}
}

export default withRouter(connect(mapStateToProps, {logoutUser, updateUser})(Nav))