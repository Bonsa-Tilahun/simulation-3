import React, {Component} from 'react'

import './post.styles.css'
import Axios from 'axios'
import { connect } from 'react-redux'

class Post extends Component {
    constructor() {
        super()

        this.state={
            post:{}
        }
    }

    componentDidMount = () =>{
        console.log(typeof this.props.userId)
        console.log(this.state.post.profile_pic + parseInt(this.props.userId) )
        Axios.get(`/api/posts/post/${this.props.match.params.postid}`).then(res =>{
            this.setState({
                post: res.data
            })
        }).catch(err => alert(err))
    }

    handleDeletePost = () =>{
        Axios.delete(`/api/posts/${this.state.post.post_id}`).then(()=>{
            this.props.history.push('/dashboard')
        }).catch(err => alert(err))
    }

    render(){
        return(
            <div className='post-page-container'>
                <div className='post-page-inner'>
                    <div className='post-page-meta-data'>
                        <div className='post-page-title'>
                            <h3>{this.state.post.title}</h3>
                            {this.props.user.id === this.state.post.author_id ?
                            <button onClick={this.handleDeletePost} className='delete-btn'>Delete Post</button>: ""} 
                        </div>
                        <div className='post-page-info'>
                            <p>by {this.props.user.username}</p>
                            <img className='post-page-profile-img' src={this.props.user.profile_pic + parseInt(this.state.post.author_id) + '?set=set2&size=50x50'} alt="UserIcon"/>
                        </div>
                    </div>
                    <div className='pos-page-body'>
                        <div className='post-page-image-url'>
                            <img src={this.state.post.img} alt="post"/>
                        </div>
                        <div className='pos-page-content'>
                            <p>{this.state.post.content}</p>
                        </div> 
                        
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToPost = reduxState => reduxState
export default connect(mapStateToPost)(Post)