const bcrypt = require('bcrypt')

module.exports = {
    register: async(req, res) => {
        //TODO Register new user
        const db = req.app.get('db')
        const { username, password, profile_pic } = req.body

        const existingUser = await db.check_user(username)
        if (existingUser[0]) {
            return res.status(409).send('User already exists')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = await db.register_user([username, hash, profile_pic])

        req.session.user = newUser[0]
        res.status(200).send(req.session.user)

    },
    login: async(req, res) => {
        //TODO Login existing user
        const db = req.app.get('db')
        const { username, password } = req.body
        const [existingUser] = await db.check_user(username) //de-structured existingUser from the array that came back
            // console.log(existingUser)
        if (!existingUser) {
            return res.status(404).send('User does not exist')
        }
        const authenticated = bcrypt.compareSync(password, existingUser.password)
        if (!authenticated) {
            return res.status(403).send('Username of password does not match')
        }
        delete existingUser.password
        req.session.user = existingUser
        res.status(200).send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getLoggedinUser: (req, res) => {
        console.log('logged in  user: ', req.session)
        if (req.session.user) {
            return res.status(200).send(req.session.user)
        }
        res.sendStatus(404)
    },
    getAllpost: async(req, res) => {
        console.log("session: ", req.session)
        const db = req.app.get('db')
        const { id } = req.session.user.id
        const { userposts, search } = req.query
        const posts = await db.get_all_posts()
        if (userposts === 'true' && search === '') {
            return res.status(200).send(posts)
        } else if (userposts === 'false' && search !== '') {
            const othersPost = posts.filter(post => post.id !== id && post.title.includes(search))
            return res.status(200).send(othersPost)
        } else if (userposts === 'false' && search === '') {
            const othersPost = posts.filter(post => post.id !== id)
            return res.status(200).send(othersPost)
        } else if (userposts === 'true' && search !== '') {
            const othersPost = posts.filter(post => post.title.includes(search))
            return res.status(200).send(othersPost)
        }
        return res.status(404).send('No posts found')
    },
    getSinglePost: async(req, res) => {
        const { post_id } = req.params
        const id = parseInt(post_id)

        console.log("single post hit", post_id)
        const db = req.app.get('db')
        const [singlePost] = await db.get_single_post(id)
        console.log(singlePost)
        if (singlePost) {
            return res.status(200).send(singlePost)
        }
        res.status(404).send('No post found')
    },
    addPost: async(req, res) => {
        const { id } = req.session.user.id
            // const id = parseInt(userId)
        const { title, img, content } = req.body
        console.log("body: ", req.body)
        console.log("content: ", content)
        const db = req.app.get('db')
        const [newPost] = await db.add_post([id, title, img, content])
        if (newPost) {
            return res.status(200).send(newPost)
        }
        res.status(500).send('Something went wrong')
    },
    deletePost: async(req, res) => {
        const { post_id } = req.params
        const id = parseInt(post_id)
        const db = req.app.get('db')
        await db.delete_post(id)
        res.sendStatus(200)
    }
}