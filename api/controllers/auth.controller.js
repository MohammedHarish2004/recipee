import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

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

export const login = async(req,res,next)=>{

    const {email,password} = req.body
    
    try {
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(201,'Invalid Username'))

        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword) return next(errorHandler(201,'Invalid Password'))
        
        const token = jwt.sign({id:validUser._id,isAdmin:validUser.isAdmin},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie('access_token',token,{httpOnly:true,expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)})

        const {password:pass,...rest} = validUser._doc
        res.status(200).json(rest)
    } 
    catch (error) {
            next(error)    
    }
}