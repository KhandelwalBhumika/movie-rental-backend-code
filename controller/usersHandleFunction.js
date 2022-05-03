const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const {
    findUser,
    creatingNewUser,
    findOneUser,
    updateUser
} = require('../services/user.services');
// const {OAuth2Client, GoogleAuth} = require ('google-auth-library');
// import User from “./user.model”;
// import HTTPStatus from “http-status”;

module.exports = {
    gettingAllUser: async (req, res) => {
        console.log('/get/gettingAllUser')
        try {
            const users = await findUser()
            return res.json(users)
        } catch (err) {
            res.json({
                status: "Error",
                message: err.message
            })
        }
    },

    gettingOneUser: async (req, res) => {
        console.log('/get/gettingOneUser')
        try {
            const user = await User.findById(req.params.id || req.user._id)
            return res.json(user)
        } catch (err) {
            return res.json({
                status: "Error",
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
                status: "Error",
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
                        status: "error",
                        message: "incorect pass or email"
                    })
                }
                //evaluate password
                if (pickUser) {
                    const passwordChecker = await bcrypt.compare(req.body.password, pickUser.password)

                    if (passwordChecker == false) {
                        return res.send({
                            status: "error",
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
                        token: accessToken,
                        role: pickUser.role,
                        name: `${pickUser.firstName} ${pickUser.lastName}`
                    })
                }
            }
            return res.json({
                status: "error",
                message: "plz send email and password"
            })
        } catch (err) {
            return res.json({
                status: "Error",
                message: err.message
            })

        }
    },

    googleLogin: async(req, res) => {
        console.log('googleLogin')
        try {
            //check if already registered
        const checkUser = await findOneUser({
            email: req.body.email
        })
        console.log('email', req.body.email)
        //if Yes
        if (checkUser) {
            const generateToken = jwt.sign({
                user: {
                    _id: checkUser._id
                }
            },
            process.env.KEY, {
                expiresIn: 60 * 60 * 24 * 7
            })
            res.cookie('token', generateToken);
                    return res.json({
                        status: "success",
                        message: "user successfully login",
                        token: generateToken,
                        role: 'user',
                        name: `${checkUser.name}`
                    })
                }

                //if No
                else (!checkUser) 
                    const newGoogleUser = {
                        name: req.body.firstName,
                        email: req.body.email,
                        //hashed password
                        password: await bcrypt.hash(`${req.body.email}+${req.body.firstName}+ process.env.KEY`, saltRounds)
                       }
                    const newUser = await creatingNewUser(newGoogleUser)
                        console.log('newUser', newUser)

                        const generateToken = jwt.sign({
                        user: {
                        _id: checkUser._id
                        }
                    },
                        process.env.KEY, {
                        expiresIn: 60 * 60 * 24 * 7
                        }
                        )
                        res.cookie('token', generateToken);
                        return res.json({
                            status: "success",
                            message: "user successfully login",
                            token: generateToken,
                            role: 'user',
                            name: `${newGoogleUser.name}`
                        })
                    
        } catch (err) {
            return res.json({
                status: "Error",
                message: err.message
            })
        }
    },

    // addMoney: async(req, res) => {
    //     console.log('addMoney');
    //     try{
    //         const updateBalance = req.body.balance;
    //         console.log('updateBalance', updateBalance, 'req.user._id', req.user._id)
    //         if(updateBalance == null){
    //                 return res.send({
    //                     status: "error",
    //                     message: "Please enter a valid amount!"
    //                 })
    //         } else {
    //             const newBalance = await User.updateOne(req.user._id, {$set: {balance: updateBalance}})
    //             return res.json({
    //                 status: "Success",
    //                 message: "YAY, balance updated successfully!"
    //             })
    //         }
    //     } catch (err) {
    //         return res.json({
    //             status: "Error",
    //             message: err.message
    //         })
    //     }

    // }


//        
    // authenticateUser : (req, res) => {
    //     return res.json(posts.filter(post => post.username === req.user.name))
    // },

    updatingUser: async (req, res) => {
        console.log('updatingUser')
      console.log("this is req_id //////////////////////////////////////",req.user)
        if (req.body.firstName != null) {
            req.user.firstName = req.body.firstName
        } if (req.body.lastName != null) {
            req.user.lastName = req.body.lastName
        } if (req.body.email != null) {
            req.user.email = req.body.email
        } if (req.body.password != null) {
            req.user.password = req.body.password
        } if (req.body.contactNumber != null) {
            req.user.contactNumber = req.body.contactNumber
        } if (req.body.balance != null) {
            req.user.balance = req.body.balance
        } if (req.body.timeStamp != null) {
            req.user.timeStamp = req.body.timeStamp
        }
        console.log(req.body)
        try {
            const updatedUser = await updateUser(req.user._id, req.body)
            return res.send({
                status: "success",
                // message: updatedUser
                message: "succesfully updated"
            })
        } catch (err) {
            console.log(err)
                    return res.json({
                        status: "Error",
                        message: err.res.message
                    })
                }
    },

    // deletingUser : async (req, res) => {
    //     try {
    //         return await removingUser()
    //     } catch (err) {
    //         res.send({message: err.message})
    //     }
    // }






    



}