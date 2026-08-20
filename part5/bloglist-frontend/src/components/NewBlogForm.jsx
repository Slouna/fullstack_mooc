import { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return(
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
  )
}

export default NewBlogForm