import React from 'react'
import Post from './components/Post'
import Navbar from './components/Navbar'
import postService from './services/posts'
import formatTool from './services/time'
import './App.css'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      personalPosts: [],
      showPersonal: false,
      newPost: '',
      currentUser: '',
      filter: '',
      error: null,
    }
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    postService
      .getAll()
      .then(response => {
        this.setState({ posts: response })
      })
  }

  addPost = (event) => {
    event.preventDefault()
    let current = new Date()
    let formattedTime = formatTool.formatTime(current)
    const postObject = {
      user: this.state.currentUser,
      content: this.state.newPost,
      date: formattedTime
    }

    if (this.state.newPost.length !== 0 && this.state.currentUser.length !== 0 && this.state.newPost.length <= 60 && this.state.currentUser.length <= 20) {
      postService
        .create(postObject)
        .then(newPost => {
          this.setState({
            posts: this.state.posts.concat(newPost),
            newPost: '',
            currentUser: ''
          })
        })
      document.getElementById('textarea1').value = ''
      document.getElementById('textarea2').value = ''
    }
    else {
      alert("The post is empty or too long! (post max length 60 characters, username max length 20 characters)")
    }

  }

  handleUserChange = (event) => {
    console.log(event.target.value)
    this.setState({ currentUser: event.target.value })
  }

  handlePostChange = (event) => {
    console.log(event.target.value)
    this.setState({ newPost: event.target.value })
  }

  handleFilter (filterValue) {
    //showing all
    if (filterValue === this.state.filter) {
      this.setState({ showPersonal: false, filter: '' }, () => {
        console.log(this.state.filter)
      })
    } else {
      //showing personal
      this.setState({ filter: filterValue, showPersonal: true}, () => {
        let allPosts = this.state.posts;
        let filteredPosts = allPosts.filter(post => {
          console.log(post.user);
          console.log(this.state.filter)
          if (post.user === this.state.filter) {
            return post;
          }
        })
        this.setState({personalPosts: filteredPosts})
      })
    }
  }

  render() {
    let postsToShow = []
    if (this.state.showPersonal === true) {
      postsToShow = this.state.personalPosts
    }
    else if (this.state.showPersonal === false) {
      postsToShow = this.state.posts
    } else {
      console.log("What to show??")
    }

    
    return (
      <div className="site-bg">
        <Navbar/>
        <div class="container">
          <div className="main-site">
            <h1 className="header-text">Post your thoughts!</h1>
            <div class="row">
              <div class="col s6">
                <form onSubmit={this.addPost}>
                  <div class="input-field col s12"
                    value={this.state.currentUser}
                    onChange={this.handleUserChange}>
                    <textarea id="textarea1" class="materialize-textarea"></textarea>
                    <label for="textarea1">Username</label>
                  </div>
                </form>
              </div>
            </div>
            <div class="row">
              <div class="col s6">
                <form onSubmit={this.addPost}>
                  <div class="input-field col s12"
                    value={this.state.currentUser} 
                    onChange={this.handlePostChange}>
                    <textarea id="textarea2" class="materialize-textarea"></textarea>
                    <label for="textarea2">Post</label>
                  </div>
                  <button class="btn blue waves-effect waves-light" type="submit">Send</button>
                </form>
              </div>
            </div>
            <div class="row">
              <div class="col s10">
                <ul class="collection">
                  {postsToShow.slice(0).reverse().map(post => 
                    <Post
                      //key={post.id}
                      post={post}
                      handleFilter={this.handleFilter}
                    />)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App