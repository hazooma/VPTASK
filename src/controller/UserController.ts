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
            let temp = await getManager();
            let temp2 = temp.createQueryBuilder(tables[request.body.Push[0].name], request.body.Push[0].name)

            for (let j = 0; j < request.body.Push.length; j++) {
                const element = request.body.Push[j];
                const x = element.properties
                const tablename = tables[element.name]


                for (let i = 0; i < x.length; i++) {
                    const element = x[i];
                    if (!element.value) continue
                    if (element.type === "s") {
                        if (element.op === "=") {
                            if (element.type === "s")
                                temp2 = temp2.andWhere(`${tablename}.${element.name} = :param`, { param: element.value })
                            else if (element.type === "b")
                                temp2 = temp2.andWhere(`${tablename}.${element.name} = :param`, { param: element.value })

                        }
                        if (element.op === "LIKE") {

                            temp2 = temp2.andWhere(`${tablename}.${element.name} LIKE :param`, { param: "%" + element.value + "%" })

                        }

                    }
                    if (element.type === "b") {
                        temp2 = temp2.andWhere(`${tablename}.${element.name} = :param`, { param: element.value === "true" ? 1 : 0 })


                    }
                    if (element.type === "i") {
                        if (element.op === "<") {
                            temp2 = temp2.andWhere(`${tablename}.${element.name} < :param`, { param: +element.value })
                        }
                        if (element.op === ">") {
                            temp2 = temp2.andWhere(`${tablename}.${element.name} > :param`, { param: +element.value })
                        } if (element.op === "<=") {
                            temp2 = temp2.andWhere(`${tablename}.${element.name} <= :param`, { param: +element.value })
                        } if (element.op === ">=") {
                            temp2 = temp2.andWhere(`${tablename}.${element.name} >=:param`, { param: +element.value })
                        }
                        if (element.op === "=") {
                            temp2 = temp2.andWhere(`${tablename}.${element.name} = :param`, { param: +element.value })
                        }


                    }



                }
            }


            return response.send(await temp2
                .getRawMany())


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
                temp2 = temp2.leftJoin(tables[request.body.Push[i].name], request.body.Push[i].name)

            }



            let stringc = ""
            for (let i = 0; i < request.body.Joins.length; i++) {
                const cnt = request.body.Joins[i];
                const e1 = tables[cnt.E1]
                const e2 = tables[cnt.E2]
                const uu = cnt.Joins

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

            for (let j = 0; j < request.body.Push.length; j++) {
                const element = request.body.Push[j];
                const x = element.properties
                const tablename = tables[element.name]


                for (let i = 0; i < x.length; i++) {
                    const element = x[i];
                    if (!element.value) continue
                    if (element.type === "s") {
                        console.log(`${element.value}`)
                        if (element.op === "=") {
                            if (element.type === "s")
                                temp2 = temp2.andWhere(`${tablename}.${element.name} = :param`, { param: element.value })
                            else if (element.type === "b")
                                temp2 = temp2.andWhere(`${tablename}.${element.name} = :param`, { param: element.value })

                        }
                        if (element.op === "LIKE") {

                            temp2 = temp2.andWhere(`${tablename}.${element.name} LIKE :param`, { param: "%" + element.value + "%" })

                        }

                    }
                    if (element.type === "b") {
                        temp2 = temp2.andWhere(`${tablename}.${element.name} = :param`, { param: element.value === "true" ? 1 : 0 })


                    }
                    if (element.type === "i") {
                        if (element.op === "<") {
                            temp2 = temp2.andWhere(`${tablename}.${element.name} < :param`, { param: +element.value })
                        }
                        if (element.op === ">") {
                            temp2 = temp2.andWhere(`${tablename}.${element.name} > :param`, { param: +element.value })
                        } if (element.op === "<=") {
                            temp2 = temp2.andWhere(`${tablename}.${element.name} <= :param`, { param: +element.value })
                        } if (element.op === ">=") {
                            temp2 = temp2.andWhere(`${tablename}.${element.name} >=:param`, { param: +element.value })
                        }
                        if (element.op === "=") {
                            temp2 = temp2.andWhere(`${tablename}.${element.name} = :param`, { param: +element.value })
                        }


                    }



                }
            }

            return response.send(await temp2
                .getRawMany())


        }

    }

}
