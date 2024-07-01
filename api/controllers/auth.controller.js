import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"

export const register = async(req,res,next)=>{

    const {email,username,password} = req.body
    const hashedPassword = bcryptjs.hashSync(password,10)
    
    try {
        const newUser = new User({email,username,password:hashedPassword})
        await newUser.save()
        res.status(200).json('Registered successfully')
    } 
    catch (error) {
        if(error.code === 11000){
            next(errorHandler(201,'username/email already exist'))
        }
        else{
            next(error)    
        }
    }
    
}