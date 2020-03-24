const User = require('../../models/users/users');

class LoginUserController {
    async Login(req, res){
        try {
            const user = await User.findUserByCredentials(req.body.email, req.body.password);
            const token = await user.generateAuthToken();
            res.send({
                success: true,
                result: user,
                token
            })

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