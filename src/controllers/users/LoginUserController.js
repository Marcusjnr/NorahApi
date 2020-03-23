const Users = require('../../models/users/users');

class LoginUserController {
    async Login(req, res){
        try {
            const user = await Users.findUserByCredentials(req.body.email, req.body.password);
            const token = await user.generateAuthToken();
            res.status(200).send({success: true, result: user, token})

        }catch (e) {
            res.send({
                success: false,
                result: e.toString(),
                server_error: e.toString()
            })


        }
    }

}

let loginUserController = new LoginUserController();
module.exports = {
  Login: loginUserController.Login
};