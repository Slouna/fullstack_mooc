import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import RegularButton from './components/RegularButton'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(true)
  const addBlogRef = useRef()

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

  const addBlog = async (blogObject) => {
    try{
      const returnedBlog = await blogService.create(blogObject)
      console.log(returnedBlog)
      setBlogs(blogs.concat(returnedBlog))
      addBlogRef.current.toggleVisibility()
      setSuccess(true)
      setMessage(`A new blog: ${blogObject.title}, by ${blogObject.author} added to to blog list!`)
      setTimeout(() => {setMessage(null)}, 5000)
    } catch(error){
      setSuccess(false)
      setMessage(`Adding new blog failed`)
      setTimeout(() => {setMessage(null)}, 5000)
    }
    
    
  }

  const updateBlog = async (blogObject) => {
    await blogService.update(blogObject.id, blogObject)
    const response = await blogService.getAll()
    setBlogs(response)

  }

  const removeBlog = async (blog) => {
    if(window.confirm(`Do you want to remove the blog: ${blog.title} `)){
      const response = await blogService.deleteBlog(blog.id)
      console.log(response)
      if (response === 0){
        console.log('what')
      }
      if(response === 400){
        setSuccess(false)
        setMessage('You cannot remove blogs that other users have added')
      } else if(response === 401) {
        setSuccess(false)
        setMessage('Invalid token')
      }else {
        setSuccess(true)
        setMessage(`${blog.title} deleted!`)
      }
      setTimeout(() => {setMessage(null)}, 5000)
    }
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)

  }

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
      setMessage('Wrong username or password')
      setTimeout(() => {setMessage(null)}, 5000)

    }
  }

  const handleLogOut =() => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }


  return (
    <div className='app'>
      <Notification message={message} success = {success}/>
      {!user && (<LoginForm username = {username} password = {password}
        handleLogin = {handleLogin}
        setUsername = {setUsername} setPassword = {setPassword}/>
      )}
      {user && (
        <div>
          <p>{user.name} Logged in</p>
          <RegularButton onClick={handleLogOut} name='Log out'/>

          <h2>Add new blog</h2>

          <Togglable buttonLabel = "Create new blog" closeLabel="Cancel" ref = {addBlogRef}>
            <NewBlogForm createBlog={addBlog}
            />
          </Togglable>
          <h2>blogs</h2>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} userId={user.id} />
          )}
        </div>
      )}
    </div>
  )
}



export default App