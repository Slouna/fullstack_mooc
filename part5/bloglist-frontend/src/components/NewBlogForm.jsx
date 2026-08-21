import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewBlogForm = ({ createBlog }) => {
  const navigate = useNavigate()

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    await createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
    navigate('/')
  }

  return(
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>Title 
          <input value={blogTitle} onChange={event => setBlogTitle(event.target.value)} />
          </label>
          <p></p>
          <label>Author 
          <input value={blogAuthor} onChange={event => setBlogAuthor(event.target.value)}/>
          </label>
          <p></p>
          <label>URL 
          <input value={blogUrl} onChange={event => setBlogUrl(event.target.value)}/>
          </label>
          <p><button type="submit">Create</button></p>
        </div>
      </form>
    </div>
  )
}

export default NewBlogForm