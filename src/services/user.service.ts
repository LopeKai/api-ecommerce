import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/use.model";
import { UserRepository } from "../repositories/user.repository";

export class UserService {

    private userRepository: UserRepository; // assim eu deixo ele global

    constructor() {
        this.userRepository = new UserRepository();
    };

    async getAll(): Promise<User[]> {
        return this.userRepository.getAll();
    };

    async getById(id: string): Promise<User> {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new NotFoundError("Usuário não encontrado!") // é indicado deixar os tratamente de error no service. inves de deixar no resposity
        };
        return user;
    };

    async save(user: User): Promise<void> {
        return this.userRepository.save(user);
    };

    async update(id: string, user: User): Promise<void> {
        const _user = await this.userRepository.getById(id);

        if (!_user) {
            throw new NotFoundError("Usuário não encontrado!")
        };

        _user.nome = user.nome;
        _user.email = user.email;

        return this.userRepository.update(_user);
    };

    async delete(id: string): Promise<void> {
        return this.userRepository.delete(id);
    };
}
