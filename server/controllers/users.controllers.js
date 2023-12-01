import { response } from "express";
import UsersService from "../service/users.service.js";

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
        try{
            let response = await this.service.readOne(req.params.email);
            return res.status(200).json(response);
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
            let response = await this.service.destroy(req.params.email);
            return res.status(200).json(response);
        } catch(error){
            next(error);
        }
    }
}