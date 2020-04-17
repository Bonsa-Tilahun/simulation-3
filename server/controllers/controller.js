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
        console.log(existingUser)
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
    getAllpost: async(req, res) => {
        const db = req.app.get('db')
        const { userId } = req.params
        const { userposts, search } = req.query
        console.log('params: ', req.params)
        console.log('query: ', req.query)
        console.log(userId, userposts, search)
        if (userposts === 'true' && search === '') {
            const posts = await db.get_all_posts()
            console.log(posts)
            return res.status(200).send(posts)
        } else if (userposts === 'false' && search !== '') {
            const posts = await db.get_others_post([userId, `'%${search}%'`])
            console.log(posts, `'%${search}%'`)
            return res.status(200).send(posts)
        } else if (userposts === 'false' && search === '') {
            const posts = await db.get_others_no_search(userId)
            console.log(posts)
            return res.status(200).send(posts)
        } else if (userposts === 'true' && search !== '') {
            const posts = await db.get_all_searched([`'%${search}%'`])
            console.log("searched with mine", posts, `'%${search}%'`)
            return res.status(200).send(posts)
        }
        return res.status(404).send('No posts found')
    }
}