import { expect } from "chai";
/* import { dropCarts } from "./utils/setup.test.js"; */
import supertest from "supertest";

const requester = supertest("http://localhost:8080/api");

describe("test cart", async () => {
    it("[GET] /api/carts -get all carts", async () => {
        const response = await requester.get('/api/carts')
        expect(response.statusCode).to.be.eql(404)
    })
    it("[GET] /api/carts/:cid -get a cart for id", async () => {
        let response = await requester.get("/api/carts/:cid");
        expect(response.statusCode).to.be.eql(404);
    })
    it("[GET] /api/carts/:cid/purchase -get gerenate purchase", async () => {
        const response =  await requester.get("/api/carts/:cid/purchase")
        expect(response.statusCode).to.be.eql(404);
    })
    it("[POST] /api/carts -post create a cart", async () => {
        const response = await requester.post('/api/carts')
        expect(response.statusCode).to.be.eql(404);
    })
    it("[POST] /api/carts/:cid/product/:pid -post add product to cart", async () => {
        const response = await requester.post('/api/carts/:cid/product/:pid');
        expect(response.statusCode).to.be.eql(404);
    })
    it("[DELETE] /api/carts/:cid -delete cart id", async () => {
        const response = await requester.del('/api/carts/:cid');
        expect(response.statusCode).to.be.eql(404);
    })
    it("[DELETE] /api/carts/:cid/product/:pid -delete product in cart", async () => {
        const response = await requester.del('/api/carts/:cid/product/:pid');
        expect(response.statusCode).to.be.eql(404);
    })
    
    
})