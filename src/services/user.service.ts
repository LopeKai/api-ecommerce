import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/use.model";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";

export class UserService {

    private userRepository: UserRepository; // Assim eu deixo ele global para ser usado em qualquer método da minha class
    private authService: AuthService;

    constructor() {
        this.userRepository = new UserRepository(); // aqui eu estou instanciando 
        this.authService = new AuthService();
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
        const userAuth = await this.authService.create(user);
        user.id = userAuth.uid;
        return this.userRepository.update(user);
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
