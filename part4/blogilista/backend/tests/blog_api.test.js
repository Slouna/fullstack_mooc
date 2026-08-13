const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const {listWithManyBlogs} = require('../tests/test_list')
const Blog = require('../models/blog')

const api = supertest(app)

/* 
run tests only in this file with:
npm test -- tests/blog_api.test.js
*/


//should put 6 blogs
beforeEach(async () => {
    await Blog.deleteMany({})
    for(const blog of listWithManyBlogs){
        await new Blog(blog).save()
    }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, listWithManyBlogs.length)
  })
  
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(e => e.title)
    assert.strictEqual(titles.includes('First class tests'), true)
  })

test("objects have id, not _id", async () => {
    const response = await api.get('/api/blogs')
    assert(response.body.every(blog => Object.hasOwn(blog, "id")))
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Palindromeja",
        author: "Simo Frangen",
        url: "https://www.keksittysivu.com/simo",
        likes: 2,
        __v: 0
      } 
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
      
    assert.strictEqual(response.body.length, listWithManyBlogs.length + 1)
      
    assert(titles.includes('Palindromeja'))
})

test('new blog without likes has likes value 0', async () => {
    const newBlog = {
        title: "Palindromeja",
        author: "Simo Frangen",
        url: "https://www.keksittysivu.com/simo",
      } 
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const addedBlog = response.body[response.body.length - 1]
    assert.strictEqual(addedBlog.likes, 0)
})

test('blog without title gives status 400', async () => {
    const newBlog = {
        author: "Simo Frangen",
        url: "https://www.keksittysivu.com/simo",
        likes: 2,
      } 
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.error, "Title is missing")

})

test('blog without url gives status 400', async () => {
    const newBlog = {
        title: "Palindromeja",
        author: "Simo Frangen",
        likes: 2,
      } 
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.error, "Url is missing")
})