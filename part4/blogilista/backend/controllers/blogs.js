const blogsRouter = require('express').Router()
const { response, request } = require('../app')
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.title){
    return response.status(400).json({
      error: 'Title is missing'
    })
  }

  if(!body.url){
    return response.status(400).json({
      error: 'Url is missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
  
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async(request, response) =>{
  const updatedBlog = request.body
  const oldBlog = await Blog.findById(request.params.id)

  if (!oldBlog){
    console.log('could not find the blog')
    return response.status(404).end()
  }

  oldBlog.title = updatedBlog.title
  oldBlog.author = updatedBlog.author
  oldBlog.url = updatedBlog.url
  oldBlog.likes = updatedBlog.likes

  await oldBlog.save()
  response.json(oldBlog)
})

module.exports = blogsRouter