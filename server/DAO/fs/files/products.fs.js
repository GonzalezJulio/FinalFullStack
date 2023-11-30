import fs from "fs";

export default class ProductsFS {
  constructor() {
    this.products = [];
    this.path = "./products.fs.json";
    this.init();
  }

  init() {
    let file = fs.existsSync(this.path);
    if (!file) {
      fs.writeFileSync(this.path, "[]");
    } else {
      this.products = JSON.parse(fs.readFileSync(this.path, "UTF-8"));
    }
    return true;
  }

  async create(data) {
    try {
        this.products.push(data);
        let data_json = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, data_json);
        return {
            message: "product not found",
            response: data,
          };
      } catch (error) {
        console.log(error);
        return {
          message: error.message,
          response: error.fileName + ": " + error.lineNumber,
        };
      }
  }

  read() {
    try {
      let all = this.products;
      if (this.products.length > 0) {
        return {
          message: "product read",
          response: all,
        };
      } else {
        return {
          message: "product not found",
          response: all,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }

  async update(id, data) {
    try {
      let one = this.products.find((each) => each._id == id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        let data_json = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, data_json);
        return {
          message: "product updated",
          response: data_json,
        };
      } else {
        return {
          message: "product not found",
          response: all,
        };
      }
    } catch (error) {
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }
  async destroy(id) {
    try {
      let one = this.products.find((each) => each._id == id);
      if (one) {
        this.products = this.products.filter((each) => each._id !== id);
        let data_json = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, data_json);
        return {
          message: "product deleted",
          response: data_json,
        };
      } else {
        return {
          message: "product not found",
          response: one._id,
        };
      }
    } catch (error) {
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }
}
