import { expect } from "chai";
/* import { dropProducts } from "./utils/setup.test.js"; */
import supertest from "supertest";

const requester = supertest("http://localhost:8080/api");

//----deberia generar una conexion a una db de prueba, pero no pude lograrlo.

describe("Products router test case", () => {
   

    it("[GET] /api/product - get all Products", async () => {
        const response = await requester.get('/api/products')
        expect(response.statusCode).to.be.eql(404);
    });

    it("[POST] /api/products - new product", async () => {
        const mockProduct = {
            title: "title test",
            description: "description test",
            price: "price test",
            thumbnail: "thumbnail test",
            code: "code test",
            stock: "stock test",
            category: "category test",
            owner: "owner test",
        };
        const response = await requester.post("/api/products").send(mockProduct);

        expect(response.statusCode).to.be.eql(404);
    });
    it("[GET] /api/product/:pid -get one product for id", async () => {
        const response = await requester.get('/api/product/:pid');
        expect(response.statusCode).to.be.eql(404);
    });
    it("[PUT] /api/product/:pid -upddate product", async () => {
        const mockProduct = {
            title: "title test",
            description: "description test",
            price: "price test",
            thumbnail: "thumbnail test",
            code: "code test",
            stock: "stock test",
            category: "category test",
            owner: "owner test",
        };
        const response = await requester.put('/api/product/:pid');
        expect(response.statusCode).to.be.eql(404);
    });
    it("[DELETE] /api/product/:pid - delete product", async () => {
        const response = await requester.delete('/api/product/:pid');
        expect(response.statusCode).to.be.eql(404);
    });
})