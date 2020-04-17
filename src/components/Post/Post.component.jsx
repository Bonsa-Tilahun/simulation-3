import React, {Component} from 'react'

import './post.styles.css'

class Post extends Component {
    constructor() {
        super()
    }

    render(){
        return(
            <div className='post-inner-container'>
                <div className='post-title'>
                    <h3>{this.props.post.title}</h3>
                </div>
                <div className='post-info'>
                    <p>by {this.props.post.username}</p>
                    <img className='post-profile-img' src={this.props.post.profile_pic + this.props.post.id + '?set=set2&size=50x50'} alt="UserIcon"/>
                </div>
                
            </div>
        )
    }
}

export default Post