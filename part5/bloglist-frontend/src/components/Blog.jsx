import Togglable from './Togglable'
import RegularButton from './RegularButton'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


/*
I noticed the hint to  not use togglable after I had done this,
I will fix it if needed later in the material
But I think it works now as it should
*/
const Blog = ({ blog, updateBlog, removeBlog, userId }) => {
  const navigate = useNavigate()

  console.log('Blog received:', blog)


  const handleLike = async (blog) => {
    //event.preventDefault()
    const updatedBlog = blog
    updatedBlog.likes += 1
    //blogService.update(blog.id, updatedBlog)
    updateBlog(updatedBlog)
  }

  const handleRemove = async (blog) => {
    await removeBlog(blog)
    navigate('/')
  }


  console.log(userId)
  return(
    <div className="blogCard">
      <p>{blog.title} by {blog.author}</p>
        <p>{blog.url}</p>
        <p>
        Likes: {blog.likes}
          {userId && <RegularButton name= "Like" onClick={() => handleLike(blog)}/>}
        </p>
        <p>{blog.content}</p>
        <p>{blog.user.name}</p>
        {blog.user.id === userId &&
        <p>{<RegularButton name="Remove" onClick={() => handleRemove(blog)} className="remove"/>}</p>
        }
    </div>
  )
}

/*
    <div className="blogCard">
      <p>{blog.title} by {blog.author}</p>
      <Togglable buttonLabel="view" closeLabel="Hide">
        <p>{blog.url}</p>
        <p>
        Likes: {blog.likes}
          {<RegularButton name= "Like" onClick={() => handleLike(blog)}/>}
        </p>
        <p>{blog.content}</p>
        <p>{blog.user.name}</p>
        {blog.user.id === userId &&
        <p>{<RegularButton name="Remove" onClick={() => handleRemove(blog)} className="remove"/>}</p>
        }

      </Togglable>
    </div>
*/

export default Blog