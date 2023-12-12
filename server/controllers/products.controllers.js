import { response } from "express"
import ProductsService from "../service/products.service.js"
export default class ProductsController {
    constructor() {
        this.service = new ProductsService()
    }

    create = async (req, res, next) => {
        try{
            let response = await this.service.create(req.body)
            return res.status(201).json(response)
        } catch(error){
            next(error)
        }
    }

    read =  async (req, res, next) => {
        try{
            let response = await this.service.read(req.query)
            return res.status(200).json(response)
        } catch(error){
            next(error)
        }
    }
    readOne = async (req, res, next) => {
        try{
            let response = await this.service.read(req.params.id)
            return res.status(200).json(response)
        } catch(error){
            next(error)
        }
    }

    update =  async (req, res, next) => {
        try{
            let response = await this.service.update(req.params.id, req.body)
            return res.status(201).json(response)
        }catch(error){
            next(error)
        }
    }

    destroy =  async (req, res, next) => {
        try {
            let response = await this.service.destroy(req.params.id)
            return res.status(200).json(response)
        }catch(error){
            next(error)
        }
    }
}