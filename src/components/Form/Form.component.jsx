import React, {Component} from 'react'
import imgPlaceHolder from '../../assets/no_image.jpg'
import './form.styles.css'
import Axios from 'axios'

class Form extends Component {
    constructor() {
        super()

        this.state={
            title:'',
            img:'',
            content:''
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handlePost = () => {
        const post = {title: this.state.title, img:this.state.img, content:this.state.content}
        Axios.post(`/api/posts`, post).then(()=>{
            this.props.history.push('/dashboard')
        }).catch(err => alert(err))
    }

    render(){
        return(
            <div className='new-container'>
                <div className='new-inner-container'>
                    <h1 className='new-header'>New Post</h1>
                    <p>Title:</p>
                    <input name='title' onChange={this.handleChange} type="text"/>
                    <div className='new-img-palceholder'>
                        < img className='new-img' src={this.state.img || imgPlaceHolder} alt="content"/>
                    </div>
                    <p>Image URL</p>
                    <input name='img' onChange={this.handleChange} type="text" />
                    <p>content</p>
                    <textarea className='new-textarea' rows="5" name='content' onChange={this.handleChange} />
                    <button onClick={()=> this.handlePost()} className='new-post-btn'>Post</button>
                </div>
            </div>
        )
    }
}

export default Form