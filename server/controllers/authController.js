const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const {firstname, lastname, email, username, password} = req.body //make what you deconstruct consistent with database
        const db = req.app.get('db')
        const {session} = req
        const userFound = await db.check_user_email({email}) //passing in email as an OBJECT allows you to say $email instead of $1 in sql request
        // how do you know where to put await and when to use async?
        if(userFound[0]) return res.status(409).send(`Email already exists`)
        const salt = bcrypt.genSaltSync(10) //what does salt do?
        const hash = bcrypt.hashSync(password, salt)
        const createUser = await db.register_user({
            firstname,
            lastname,
            email,
            username,
            password: hash
        })
        session.user = {id: createUser[0].login_id, username: createdUser[0].username} //do not need to say req.session because it is pulled off already
        // need [0] notation because massive returns array, and we only need to check first item in array
        res.status(200).send(session.user)
        // use async when you want to use await. Use await when you make a big request that will take a long time (database and api requests)
        // salt generates random characters, hash mixes them in with the password, have pw set to hash in createUser so you can use what they generate
        // 10 in line 11 is max amount of rounds that's still effective to use in salting a password
    },
    login: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')
        const {session} = req
        const userFound = await db.check_username({username}) //in real app you wouldn't need a new sql request, you'd reuse the functionality from register section above
        if(!userFound[0]) return res.status(401).send(`User does not exist`)
        const authenticated = bcrypt.compareSync(password, userFound[0].password) //this will compare hashed pw with original pw and then return a boolean
        // use firebase if you want to use google, fb, github for authentication
        if(authenticated) {
            session.user = {id: userFound[0].login_id, username: userFound[0].username}
            res.status(200).send(session.user)
        } else {
            return res.status(401).send(`Incorrect username or password`)
        }
    }
}