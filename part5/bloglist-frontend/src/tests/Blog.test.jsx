import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'
import Togglable from '../components/Togglable'
import NewBlogForm from '../components/NewBlogForm'


describe('Blog component tests', () => {
    let blog
    beforeEach(() => {
        blog = {
            title: 'Toggling works',
            author: "Pasi Bloggaaja",
            url: "example.com",
            likes: 0,
            user: {
                name: "Timo testaaja"
            }
        }
    })

    
  
    test('renders its children', () => {
        render(<Blog blog={blog} />)

        const element = screen.getByText('Toggling works Pasi Bloggaaja')
        expect(element).toBeDefined()
    })
  
    test('at start the children are not displayed', () => {
        render(<Blog blog={blog} />)

        expect(screen.getByText('example.com')).not.toBeVisible()
        expect(screen.getByText(/Likes: 0/)).not.toBeVisible()
    })
  
    test('after clicking the button, children are displayed', async () => {
        render(<Blog blog={blog} />)
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        expect(screen.getByText('Toggling works Pasi Bloggaaja')).toBeVisible()
        expect(screen.getByText('Timo testaaja')).toBeVisible()
        expect(screen.getByText('example.com')).toBeVisible()
        expect(screen.getByText(/Likes: 0/)).toBeVisible()
    })

    test('like button is clicked twice', async () => {
        const mockHandler = vi.fn()
      
        render(
          <Blog
            blog={blog}
            updateBlog={mockHandler}
          />
        )
      
        const user = userEvent.setup()
        const likeButton = screen.getByText('Like')
      
        await user.click(likeButton)
        await user.click(likeButton)
      
        expect(mockHandler.mock.calls).toHaveLength(2)
      })

    test('user creating a blog', async () =>{
        const mockHandler = vi.fn()
    
        render(<NewBlogForm createBlog={mockHandler} />)
    
        const user = userEvent.setup()
    
        await user.type(screen.getByLabelText('Title'), 'Testi blogi')
        await user.type(screen.getByLabelText('Author'), 'Pasi Bloggaaja')
        await user.type(screen.getByLabelText('URL'), 'example.com')
    
        await user.click(screen.getByText('Create'))
    
    
    
        expect(mockHandler).toHaveBeenCalledWith({
            title: 'Testi blogi',
            author: 'Pasi Bloggaaja',
            url: 'example.com'
        })
      })
  })

