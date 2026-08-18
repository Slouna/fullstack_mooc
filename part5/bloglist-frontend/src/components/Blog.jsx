import Togglable from './Togglable'
import RegularButton from './RegularButton'

/*
I noticed the hint to  not use togglable after I had done this,
I will fix it if needed later in the material
But I think it works now as it should
*/
const Blog = ({ blog, updateBlog, removeBlog, userId }) => {


  const handleLike = async (blog) => {
    //event.preventDefault()
    const updatedBlog = blog
    updatedBlog.likes += 1
    //blogService.update(blog.id, updatedBlog)
    updateBlog(updatedBlog)
  }

  const handleRemove = async (blog) => {
    removeBlog(blog)

  }



  return(
    <div className="blogCard">
      <p>{blog.title} {blog.author}</p>
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
  )
}


export default Blog