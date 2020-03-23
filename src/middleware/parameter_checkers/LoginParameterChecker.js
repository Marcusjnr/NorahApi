const Responses = require('../../utils/Responses');

class LoginParameterChecker {

   static async checker(req, res, next){
        if (req.body.email == null || req.body.password == null){
            return res.send({
                success: false,
                result: Responses.parameterCheckGeneralResponse,
                server_error: Responses.parameterCheckGeneralResponse
            });
        }

        next();
    }

}

module.exports = {
  LoginParamChecker: LoginParameterChecker.checker
};