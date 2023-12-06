import { response } from "express";
import UsersService from "../service/users.service.js";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs'
import 'dotenv/config'
import passport from "passport";
import { isValidPassword } from "../utils/utils.js";

export default class UserController {
    constructor(){
        this.service = new UsersService();
    }

    create = async (req, res, next) => {
        try{
            let response = await this.service.create(req.body);
            return res.status(201).json(response);
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
            
            if(!response.response[0]) return res.status(400).send({ status: "error", error: "Invalid credentials" });
            let isValidPassword = await bcryptjs.compare(password, response.response[0].password);
            
            if(!isValidPassword) return res.status(400).send({ status: "error", error: "Invalid credentials" });
            let token = jwt.sign({ id: response.response[0]._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
            return res.status(200).json({ status: "success", token: token });
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