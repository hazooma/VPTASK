import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
import { Tag } from "./entity/Tag";
import { Role } from "./entity/Role";


createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(bodyParser.json());
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    /**
     * one table 
    *   {} 
     * 
     * 
     * 
     * joins 
     * 
     * 
     */

    // setup express app here
    // ...

    // start express server
    app.listen(5000);

    // insert new users for test
    await connection.manager.save(connection.manager.create(User, {
        id: 1,
        firstName: "Timber",
        lastName: "Saw",
        age: 27,

    }));
    await connection.manager.save(connection.manager.create(User, {
        id: 2,
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24
    }));

    // insert new users for test
    await connection.manager.save(connection.manager.create(User, {
        id: 3,
        firstName: "Hazem",
        lastName: "LOL",
        age: 27,

    }));
    await connection.manager.save(connection.manager.create(User, {
        id: 4,
        firstName: "Karim",
        lastName: "ibrahim",
        age: 23
    }));    // insert new users for test
    await connection.manager.save(connection.manager.create(User, {
        id: 5,
        firstName: "Ahmed",
        lastName: "Saw",
        age: 29,

    }));
    await connection.manager.save(connection.manager.create(User, {
        id: 6,
        firstName: "Hasdsdan",
        lastName: "Bahnsawy",
        age: 30
    }));

    // POSTS 
    // insert new users for test
    await connection.manager.save(connection.manager.create(Post, {
        id: 1,
        title: "Post1",
        body: "Saw",
        user_id: 1


    }));
    await connection.manager.save(connection.manager.create(Post, {
        id: 2,
        title: "Post2",
        body: "Saw3",
        user_id: 1

    })); await connection.manager.save(connection.manager.create(Post, {
        id: 3,
        title: "Post3",
        body: "Saw3",
        user_id: 3


    })); await connection.manager.save(connection.manager.create(Post, {
        id: 4,
        title: "Post4",
        body: "Sa4",
        user_id: 1

    })); await connection.manager.save(connection.manager.create(Post, {
        id: 5,
        title: "Post5",
        body: "Saw5",
        user_id: 4

    })); await connection.manager.save(connection.manager.create(Post, {
        id: 6,
        title: "Post6",
        body: "Saw6",
        user_id: 6

    }));

    // Tags

    await connection.manager.save(connection.manager.create(Tag, {
        id: 1,
        name: "Policy",
        post_id: 1

    }));
    await connection.manager.save(connection.manager.create(Tag, {
        id: 2,
        name: "Passion",
        post_id: 2


    })); await connection.manager.save(connection.manager.create(Tag, {
        id: 3,
        name: "Love",
        post_id: 1


    })); await connection.manager.save(connection.manager.create(Tag, {
        id: 4,
        name: "Football",
        post_id: 3


    })); await connection.manager.save(connection.manager.create(Tag, {
        id: 5,
        name: "Economcs",
        post_id: 4


    }));
    await connection.manager.save(connection.manager.create(Tag, {
        id: 6,
        name: "ART",
        post_id: 5


    }));
    await connection.manager.save(connection.manager.create(Tag, {
        id: 7,
        name: "Sport",
        post_id: 6


    }));

    // Roles 
    await connection.manager.save(connection.manager.create(Role, {
        id: 1,
        name: "Manager",
        user_id: 1

    }));
    await connection.manager.save(connection.manager.create(Role, {
        id: 2,
        name: "Normal User",
        user_id: 2

    })); await connection.manager.save(connection.manager.create(Role, {
        id: 3,
        name: "Moderator",
        user_id: 3

    })); await connection.manager.save(connection.manager.create(Role, {
        id: 4,
        name: "Client",
        user_id: 4

    })); await connection.manager.save(connection.manager.create(Role, {
        id: 5,
        name: "Student",
        user_id: 5

    }));
    await connection.manager.save(connection.manager.create(Role, {
        id: 6,
        name: "Manager",
        user_id: 6

    }));


    console.log("Express server has started on port 5000. Open http://localhost:5000/users to see results");

}).catch(error => console.log(error));
