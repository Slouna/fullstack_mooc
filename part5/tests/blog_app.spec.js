const {test, expect, beforeEach, describe} = require('@playwright/test')
const { log } = require('console')


describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
      })
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Timo Testaaja',
          username: 'testeri',
          password: 'testeri'
        }
      })
  
      await page.goto('http://localhost:5173')
    })

    const logIn = async (page, username, password) => {
        console.log(username, password)
        await page.goto('http://localhost:5173/login')

        await page.getByRole('button', { name: 'login' }).click()
        const textboxes = await page.getByRole('textbox').all()
    
        await page.getByLabel('Username').fill(username)
        await page.getByLabel('Password').fill(password)
    
       
        await page.getByRole('button', { name: 'login' }).click()
    }

    const logOut = async (page) => {

        await page.getByRole('button', { name: 'Log out' }).click()
    }

    const createBlog = async (page, title, author, url) => {
        await page.getByRole('link', { name: 'New blog' }).click()
        await page.getByLabel('Title').fill(title)
        await page.getByLabel('Author').fill(author)
        await page.getByLabel('URL').fill(url)
        await page.getByRole('button', { name: 'Create' }).click()
    }
  
    test('Login form is shown', async ({ page }) => {
        await page.goto('http://localhost:5173/login')

        const locator = page.getByText('Login page')
        await expect(locator).toBeVisible()
        
        await expect(page.getByText('Username')).toBeVisible()
        await expect(page.getByText('Password')).toBeVisible()

    })

    describe('Login', () => {

        test('succeeds with correct credentials', async ({ page }) => {

            await logIn(page, 'mluukkai', 'salainen')
          
            await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
        })
    
        test('fails with wrong credentials', async ({ page }) => {

            await logIn(page, 'mluukkai', 'wrongPassword')
          
            await expect(page.getByText('Wrong username or password')).toBeVisible()
        })
        
        
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {

            await logIn(page, 'mluukkai', 'salainen')
        })
      //ok
        test('a new blog can be created', async ({ page }) => {

            await createBlog(page, 'Test Blog', 'Pasi Bloggaaja', 'example.com')
            await expect(page.getByText('Test Blog by Pasi Bloggaaja')).toBeVisible()
        })

        test('blog can be liked', async ({page}) => {
            await createBlog(page, 'Test Blog', 'Pasi Bloggaaja', 'example.com')

            await page.getByRole('link', { name: 'Test Blog by Pasi Bloggaaja' }).click()
            await expect(page.getByText('Likes: 0')).toBeVisible()
            await page.getByRole('button', { name: 'Like' }).click()
            await expect(page.getByText('Likes: 1')).toBeVisible()

        })

        test('blog can be removed', async ({page})=>{
            await createBlog(page, 'Test Blog', 'Pasi Bloggaaja', 'example.com')
            await page.getByRole('link', { name: 'Test Blog by Pasi Bloggaaja' }).click()
            page.on('dialog', dialog => dialog.accept());
            await page.getByRole('button', { name: 'Remove' }).click()

            await expect(page.getByText('Test Blog Pasi Bloggaaja')).toBeHidden()

        })

        test('no delete option for other users blogs', async({page}) =>{
            //tests that it shows to OP but not to others
            await createBlog(page, 'Test Blog', 'Pasi Bloggaaja', 'example.com')
            await page.getByRole('link', { name: 'Test Blog by Pasi Bloggaaja' }).click()
            await expect(page.getByRole('button', {name:'Remove'})).toBeVisible()
            await logOut(page)
            await logIn(page, "testeri", "testeri")
            await page.getByRole('link', { name: 'Test Blog by Pasi Bloggaaja' }).click()
            await expect(page.getByRole('button', {name:'Remove'})).toBeHidden()
            
        } )
//ois varmaan joku siistimpi keino, ainaki ois voinu tehdä loopin likeille
        /*
        test('blog are in order of likes', async ({page}) => {
            await createBlog(page, "most liked", "aaa", "abcd.com")
            await createBlog(page, "least liked", "bbb", "abcd.org")
            await createBlog(page, "med liked", "ccc", "abcd.fi")

            const bestBlog = page.locator('.blogCard').filter({hasText: 'most liked'})

            const medBlog = page.locator('.blogCard').filter({hasText: 'med liked'})

            const worstBlog = page.locator('.blogCard').filter({hasText: 'least liked'})

            await bestBlog.getByRole('button', {name: 'view'}).click()
            await bestBlog.getByRole('button', {name: 'Like'}).click()
            await bestBlog.getByRole('button', {name: 'Like'}).click()
            await bestBlog.getByRole('button', {name: 'Like'}).click()
            await bestBlog.getByRole('button', {name: 'Like'}).click()
            await bestBlog.getByRole('button', {name: 'Like'}).click()

            await medBlog.getByRole('button', {name: 'view'}).click()
            await medBlog.getByRole('button', {name: 'Like'}).click()
            await medBlog.getByRole('button', {name: 'Like'}).click()
            await medBlog.getByRole('button', {name: 'Like'}).click()

            await worstBlog.getByRole('button', {name: 'view'}).click()
            await worstBlog.getByRole('button', {name: 'Like'}).click()
            
            const blogs = page.locator('.blogCard')

            await expect(blogs.nth(0)).toContainText('most liked')
            await expect(blogs.nth(1)).toContainText('med liked')
            await expect(blogs.nth(2)).toContainText('least liked')
            


        })
        */


      })
})