
const Responses = require('../../utils/Responses');
const Users = require('../../models/users/users');

class RegisterUserController {
    async Register(req, res){
        try {
            const user = new Users(req.body);

            await user.save(async (err, response)=>{
                if (err){
                    return res.send({
                        success: false,
                        result: Responses.errorMessage,
                        server_error: err.toString()
                    })
                }
                const token = await user.generateAuthToken();
                res.send({
                    success: true,
                    result: response,
                    token
                });
            })
        }catch (e) {
            res.status(500).send({
                success: false,
                result: Responses.serverError,
                server_error: e.toString()
            })
        }
    }
}

let registerController = new RegisterUserController();
module.exports = {
    Register: registerController.Register
};