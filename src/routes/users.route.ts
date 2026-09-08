import express, { Request, Response } from "express";

export const userRoutes = express.Router();

interface User {
    id: number,
    nome: string,
    email: string
};

let id = 0;
const users: User[] = [];

userRoutes.get("/users", (req: Request, res: Response) => {
    res.send(users)
});

userRoutes.get("/users/:id", (req: Request, res: Response) => {
    let userId = Number(req.params.id);
    let user = users.find(user => user.id === userId);
    res.send(user)
});

userRoutes.post("/users", (req, res) => {
    const user = req.body;
    user.id = ++id;
    users.push(user);
    res.send("Usuario criado com sucesso!")
});

userRoutes.put("/users/:id", (req: Request, res: Response) => {
    let userId = Number(req.params.id);
    let user = req.body;
    let indeOf = users.findIndex((_user: User) => _user.id === userId)
    users[indeOf].nome = user.nome;
    users[indeOf].email = user.email;
    res.send({
        message: "Usuario editado com sucesso!"
    });
});

userRoutes.delete("/users/:id", (req: Request, res: Response) => {
    let userId = Number(req.params.id);
    let indeOf = users.findIndex((_user: User) => _user.id === userId);
    users.splice(indeOf, 1)
    res.send("Deletado com sucesso")
})
