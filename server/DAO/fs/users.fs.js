import fs from "fs";

export default class UsersFS {
    constructor() {
        this.users = [];
        this.path = "./server/DAO/fs/files/users.fs.json";
        this.init();
    }
    init(){
        let file = fs.existsSync(this.path);
        if(!file) {
            fs.writeFileSync(this.path, "[]");
        }else{
            this.users = JSON.parse(fs.readFileSync(this.path, "UTF-8"));
        }
        return true;
    }
    create(data) {
        try {
            this.users.push(data);
            let data_json = JSON.stringify(this.users, null, 2);
            fs.writeFileSync(this.path, data_json);
            return {
                message: "user add",
                response: user,
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
            let all = this.users;
            return all;
        } catch (error) {
            console.log(error);
            return {
                message: error.message,
                response: error.fileName + ": " + error.lineNumber,
            };
        }
    }
    readOne(email) {
        try {
            let one = this.users.find((each) => each.email == email);
            if (one) {
                return {
                    message: "user read",
                    response: one,
                };
            } else {
                return {
                    message: "user not found",
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
    update(email) {
        try {
            let index = this.users.findIndex((each) => each.email == user.email);
            if (index != -1) {
                this.users[index] = user;
                let data_json = JSON.stringify(this.users, null, 2);
                fs.writeFileSync(this.path, data_json);
                return {
                    message: "user update",
                    response: user,
                };
            } else {
                return {
                    message: "user not found",
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
    destroy(email) {
        try {
            let index = this.users.findIndex((each) => each.email == email);
            if (index != -1) {
                let user = this.users[index];
                this.users.splice(index, 1);
                let data_json = JSON.stringify(this.users, null, 2);
                fs.writeFileSync(this.path, data_json);
                return {
                    message: "user delete",
                    response: user,
                };
            } else {
                return {
                    message: "user not found",
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