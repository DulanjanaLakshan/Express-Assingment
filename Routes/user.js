const express = require('express')
const app = express();
const router = express.Router()
const User = require('../Model/user.model')

app.use(express.json())

// get all users
router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.send('Err ' + err)
    }
})

// save users
router.post('/', async (req, res) => {
    const users = new User({
        userId: req.body.userId,
        firstName: req.body.firstName,
        surName: req.body.surName,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
    })

    try {
        const saveUser = await users.save()
        res.json(saveUser)
    } catch (err) {
        res.send('Err:' + err)
    }
})

// get id by users
router.get('/:id', async (req, res) => {
    try {
        const userId = await User.findById(req.params.id)
        res.json(userId)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

// update users
router.put('/:id', async (req, res) => {
    try {
        const userUpdate = await User.findById(req.params.id)
        userUpdate.userId = req.body.userId
        userUpdate.firstName = req.body.firstName
        userUpdate.surName = req.body.surName
        userUpdate.gender = req.body.gender
        userUpdate.dateOfBirth = req.body.dateOfBirth
        userUpdate.password = req.body.password
        userUpdate.phoneNo = req.body.phoneNo
        userUpdate.email = req.body.email

        const update = await userUpdate.save()
        res.json(update)

    } catch (err) {
        res.send('Err: ' + err)
    }
})

//delete user
router.delete('/:id', async (req, res) => {
    try {
        const userId = await User.findById(req.params.id)
        const response = await userId.remove();
        res.json(response)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

// get user login 
router.get('/login', async (req, res) => {
    try {
        const user = await User.findByPasswordAndEmail(req.params.email, req.params.password)
        res.json(user)
    } catch (err) {
        res.send('Err:' + err)
    }
})


module.exports = router;