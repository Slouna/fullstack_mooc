import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(true)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setSuccess(false)
      setMessage(`Wrong username or password`)
        setTimeout(() => {setMessage(null)}, 5000)
      
    }
  }

  const handleLogOut =() => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleAddingBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    const response = await blogService.create(blogObject)
    console.log(response)
    setBlogs(blogs.concat(response))
    setSuccess(true)
    setMessage(`A new blog: ${blogTitle}, by ${blogAuthor} added to to blog list!`)
    setTimeout(() => {setMessage(null)}, 5000)
    
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  const handleTitleChange = (event) =>{
    setBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }

  return (
    <div>
      <Notification message={message} success = {success}/>
      {!user && (<LoginForm username = {username} password = {password} 
      handleLogin = {handleLogin} 
      setUsername = {setUsername} setPassword = {setPassword}/>
      )}
      {user && (
      <div>
        <p>{user.name} loggedin</p>
        <LogoutButton onClick={handleLogOut} name='Log out'/>

        <h2>Add new blog</h2>

        <NewBlogForm 
        newBlogTitle={blogTitle} newBlogAuthor={blogAuthor} newBlogUrl={blogUrl}
        handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} 
        handleUrlChange={handleUrlChange} addBlog={handleAddingBlog}/>

        <BlogList blogs = {blogs}/> 
        </div>
      )}
    </div>
  )
}

const NewBlogForm = (props) => {

  return(
    <form onSubmit={props.addBlog}>
      <div>
        <p>title</p>
        <input value={props.newBlogTitle} onChange={props.handleTitleChange} />
        <p>Author</p>
        <input value={props.newBlogAuthor} onChange={props.handleAuthorChange}/>
        <p>Url</p>
        <input value={props.newBlogUrl} onChange={props.handleUrlChange}/>
        <p><button type="submit">create</button></p>
      </div>
    </form>
    )
}

const LogoutButton = (props) => {
  return(
    <button onClick={props.onClick}>{props.name} </button>
  )

}

const BlogList = (props) => {
  return(
    <div>
      <h2>blogs</h2>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

const LoginForm = (props) => {
  return(
    <div>
    <h2>Login</h2>
      <form onSubmit={props.handleLogin}>
        <div>
          <label>
            Username
            <input
              type="text"
              value={props.username}
              onChange={({ target }) => props.setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              value={props.password}
              onChange={({ target }) => props.setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
      </div>
  )

}

export default App