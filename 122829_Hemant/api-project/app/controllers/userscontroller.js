const Config = require('../../config');
const Connection = require('../database/connection');
const Users = require('../models/users');
const bcrypt = require('bcryptjs');

var UsersController = {};

UsersController.getUsersData = (req, res)=>{
    res.send('Users Works');
};

UsersController.registerUser = (req,res) =>{
    console.log('route found');
    const db = Connection.connect(Config.databaseDetails.dbName);
    if(db!==undefined && db!==""){
        Users.findOne({email: req.body.email}).then(user=>{
            if(user){
                console.log('User already');
                return res.status(400).json({status: 'Email Already Exists', user:{}});
            }else{
                console.log(`New User...Registration Started: ${req.body.name}`);
                const newUser = new Users({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if(err){
                            throw err;
                        }
                        newUser.password = hash;
                        newUser.save()
                        .then(user =>res.status(200).json({status:'success', user:user}))
                        .catch(err=>console.log(err));
                    });
                });
            }
        });
    }
};

UsersController.loginUser = (req,res) =>{
    const db = Connection.connect(Config.databaseDetails.dbName);
    if(db!==undefined && db!==""){
        Users.findOne({email: req.body.email}).then(user=>{
            const email = req.body.email;
            const password = req.body.password;
            if(!user){
                console.log('User Not Found');
                return res.status(400).json({status: 'User does not Exists', user:{}});
            }else{
                console.log(`Creating User...Verifying password: ${req.body.email}, password: ${user.password}, originalpass: ${password}`);
                bcrypt.compare(password, user.password,(err, isMatch)=>{
                    if(err){
                        console.log(err);
                        throw err;
                    }
                    if(isMatch){
                        res.status(200).json({status: 'success', user:user});
                    }else{
                        res.status(400).json({status:'Password Mismatch', user:user});
                    }
                })
            }
        });
    }
}

module.exports = UsersController;