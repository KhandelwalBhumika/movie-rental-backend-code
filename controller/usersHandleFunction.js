const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const {
    findUser,
    creatingNewUser,
    findOneUser
} = require('../services/user.services');

module.exports = {
    gettingAllUser: async (req, res) => {
        console.log('/get/gettingAllUser')
        try {
            const users = await findUser()
            return res.json(users)
        } catch (err) {
            res.json({
                message: err.message
            })
        }
    },

    gettingOneUser: async (req, res) => {
        console.log('/get/gettingOneUser')
        try {
            const user = await User.findById(req.params.id)
            return res.json(user)
        } catch (err) {
            return res.json({
                message: err.message
            })
        }
    },

    creatingSignUp: async (req, res) => {
        console.log('creatingSignUp')
        try {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: req.body.role,
                email: req.body.email,
                contactNumber: req.body.contactNumber,
                //hashed password
                password: await bcrypt.hash(req.body.password, saltRounds)

            }
            //store the new user (i.e. hashed password)
            const newUser = await creatingNewUser(user)
            return res.json({
                status: "Success",
                message: "User registerd successfully"
            })

        } catch (err) {
            res.json({
                message: err.message
            })
        }
    },

    creatingLogIn: async (req, res) => {
        console.log('creatingLogIn')
        try {
            if (req.body.email !== null && req.body.password !== null) {

                const pickUser = await findOneUser({
                    email: req.body.email
                })

                if (pickUser === null) {
                    return res.send({
                        message: "error",
                        message: "incorect pass or email"
                    })
                }
                //evaluate password
                if (pickUser) {
                    const passwordChecker = await bcrypt.compare(req.body.password, pickUser.password)

                    if (passwordChecker == false) {
                        return res.send({
                            message: "error",
                            message: "incorect pass or email"
                        })
                    }

                    // const roles = Object.values(pickUser.roles);
                    //Create JWTs
                    const accessToken = jwt.sign({
                            user: {
                                _id: pickUser._id,
                                role: pickUser.role
                            }
                        },
                        process.env.KEY, {
                            expiresIn: 60 * 60 * 24 * 7
                        })

                    // res.json({ accessToken: accessToken })
                    res.cookie('token', accessToken);
                    return res.json({
                        status: "success",
                        message: "user successfully login",
                        token: accessToken
                    })
                }
            }
            return res.json({
                status: "error",
                message: "plz send email and password"
            })
        } catch (err) {
            console.log(err)
            return res.json({
                message: err.message
            })

        }
    },

    // authenticateUser : (req, res) => {
    //     return res.json(posts.filter(post => post.username === req.user.name))
    // },

    // updatingUser: async (req, res) => {
    //     if (req.body.firstName != null) {
    //         res.user.firstName = req.body.firstName
    //     } if (req.body.lastName != null) {
    //         res.user.lastName = req.body.lastName
    //     } if (req.body.email != null) {
    //         res.user.email = req.body.email
    //     } if (req.body.password != null) {
    //         res.user.password = req.body.password
    //     } if (req.body.contactNumber != null) {
    //         res.user.contactNumber = req.body.contactNumber
    //     } if (req.body.timeStamp != null) {
    //         res.user.timeStamp = req.body.timeStamp
    //     }
    //     try {
    //         const updateUser = await saveUser()
    //         return res.json(updateUser)
    //     } catch (err) {
    //         res.json({message: err.message})
    //     }
    // },

    // deletingUser : async (req, res) => {
    //     try {
    //         return await removingUser()
    //     } catch (err) {
    //         res.send({message: err.message})
    //     }
    // }
}