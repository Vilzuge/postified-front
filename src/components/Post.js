import React from 'react'
import userlogo from '../images/user.jpg'
import './Post.css'

//Single blogpost
const Post = ({ post, handleFilter }) => {

  return (
    <li class="collection-item avatar">
      <img src={userlogo} alt="" class="circle"/>
      <span class="title">
        <div className="user-style">{post.user}</div>
      </span>
      <p>
        {post.content}
      </p>
      <button class="btn-small green waves-effect waves-light" onClick={() => handleFilter(post.user)}>Filter/Unfilter</button>
      <div className="date-info">
        {post.date}
      </div>
    </li>
  )
}

export default Post