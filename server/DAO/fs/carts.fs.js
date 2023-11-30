import fs from "fs";

export default class CartsFS {
  constructor() {
    this.carts = [];
    this.path = "./server/DAO/fs/files/carts.fs.json";
    this.init();
  }

  init() {
    let file = fs.existsSync(this.path);
    if (!file) {
      fs.writeFileSync(this.path, "[]");
    } else {
      this.carts = JSON.parse(fs.readFileSync(this.path, "UTF-8"));
    }
    return true;
  }

  async create() {
    try {
      let newCart = {
        _id: this.carts.length + 1,
        products: [],
      };
      this.carts.push(newCart);
      let data_json = JSON.stringify(this.carts, null, 2);
      fs.writeFileSync(this.path, data_json);
      return {
        message: "cart created",
        response: newCart,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }
  async read() {
    try {
      let all = await this.carts;
      return {
        message: "cart read",
        response: all,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }
  read(id) {
    try {
      let one = this.carts.find((each) => each._id == id);
      if (one) {
        return {
          message: "cart read",
          response: one,
        };
      } else {
        return {
          message: "cart not found",
          response: {},
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
  update(id, data) {
    try {
      let index = this.carts.findIndex((each) => each._id == id);
      if (index != -1) {
        this.carts[index] = data;
        let data_json = JSON.stringify(this.carts, null, 2);
        fs.writeFileSync(this.path, data_json);
        return {
          message: "cart update",
          response: data,
        };
      } else {
        return {
          message: "cart not found",
          response: {},
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
  destroy(id) {
    try {
      let index = this.carts.findIndex((each) => each._id == id);
      if (index != -1) {
        this.carts.splice(index, 1);
        let data_json = JSON.stringify(this.carts, null, 2);
        fs.writeFileSync(this.path, data_json);
        return {
          message: "cart delete",
          response: {},
        };
      } else {
        return {
          message: "cart not found",
          response: {},
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
}
