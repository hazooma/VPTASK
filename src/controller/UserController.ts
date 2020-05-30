import { getRepository, EntityManager, getManager } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Post } from "../entity/Post";
import { Role } from "../entity/Role";
import { Tag } from "../entity/Tag";

export class UserController {

    private userRepository = getRepository(User);
    private postRepository = getRepository(Post);
    private roleRepository = getRepository(Role);
    private tagRepository = getRepository(Tag);


    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

    async exec(request: Request, response: Response) {

        if (!request.body.Joins.length) {
            const tables = {
                Post: "post",
                Tag: "tag",
                User: "user",
                Role: "role"
            }
            const entities = {
                Post: this.postRepository,
                Tag: this.tagRepository,
                User: this.userRepository,
                Role: this.roleRepository
            }
            const x = await entities[request.body.Push[0].name].find()

            return response.send(x)


        } else {
            const tables = {
                Post: "post",
                Tag: "tag",
                User: "user",
                Role: "role"
            }

            const n = request.body.Push.length
            let temp = await getManager();
            let temp2 = temp.createQueryBuilder(tables[request.body.Push[0].name], request.body.Push[0].name)

            for (let i = 1; i < n; i++) {
                temp2 = temp2.innerJoin(tables[request.body.Push[i].name], request.body.Push[i].name)

            }



            let stringc = ""
            for (let i = 0; i < request.body.Joins.length; i++) {
                const cnt = request.body.Joins[i];
                const e1 = tables[cnt.E1]
                const e2 = tables[cnt.E2]
                const uu = cnt.Joins
                console.log(uu)

                for (let j = 0; j < uu.length; j++) {
                    let rr = uu[j][0]
                    let rrr = uu[j][1]
                    if (typeof rr === "object") {
                        rr = rr.name;
                    }
                    if (typeof rrr === "object") {
                        rrr = rrr.name;
                    }

                    temp2 = temp2.where(`${e1}.${rr} = ${e2}.${rrr}`)

                }


            }
            return response.send(await temp2
                .getRawMany())


        }

    }

}
