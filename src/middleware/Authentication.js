const Users = require('../models/users/users');
const Responses = require('../utils/Responses');
const jwt = require('jsonwebtoken');

class Authentication{
   static async auth(req, res, next){
        try {
            const token = req.header('Authorization').replace('Bearer ','');
            const decoded = jwt.verify(token, Responses.jwtSecretKey);
            //find a user with the token
            const user = await Users.findOne({_id: decoded._id, 'tokens.token' : token});

            if (!user){
                return res.status(401).send({
                    success: false,
                    result: 'No shop found '
                })
            }

            req.user = user;
            next()
        }catch (e) {
            res.status(401).send({
                success: false,
                result: 'Please Authenticate'
            })
        }
    }
}

module.exports = {
  authenticate: Authentication.auth
};