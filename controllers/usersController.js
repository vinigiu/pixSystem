const usersService= require('../services/user/usersService')

const usersController = {
    registerExec: async (req,res) => {
        //Criando usuário
        const user = usersService.userRegistration(req)
        res.status(200).json({user:await user})
    },

    userAll : async (req,res) => {
        const users = usersService.userAll()
        res.status(200).json({users: await users})
    } 
}

module.exports = usersController;