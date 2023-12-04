import { response } from "express";
import UsersService from "../service/users.service.js";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs'

export default class UserController {
    constructor(){
        this.service = new UsersService();
    }

    create = async (req, res, next) => {
        try{
            let response = await this.service.create(req.body);
            return res.status(201).json(response);
            console.log(response)
        } catch(error){
            next(error);
        }
    }
    read = async (req, res, next) => {
        try{
            let response = await this.service.read();
            return res.status(200).json(response);
        } catch(error){
            next(error);
        }
    }
    readOne = async (req, res, next) => {
        const { email, password } = req.body;
                       
        try{
            let response = await this.service.readOne(email);
            if(response.message === "user read"){
                const validUser = await bcryptjs.compare(password, response.response.password);
                if(validUser){
                    const token = jwt.sign({ email: response.response.email }, process.env.SECRET, { expiresIn: '1h' });
                    return res.status(200).json({ message: "user read", response: token });
                } else {
                    return res.status(401).json({ message: "Invalid password" });
                }
            }
        } catch(error){
            next(error);
        }
    }
    update = async (req, res, next) => {
        try{
            let response = await this.service.update(req.params.email, req.body);
            return res.status(201).json(response);
        } catch(error){
            next(error);
        }
    }
    destroy = async (req, res, next) => {
        try{
            let response = await this.service.destroy(req.params.id);
            return res.status(200).json(response);
        } catch(error){
            next(error);
        }
    }
}