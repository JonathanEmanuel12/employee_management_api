import User from "#models/user";
import { CreateUserDto } from "../dto/user_dto.js";

export default class UserRepository {
    public async create(userDto: CreateUserDto): Promise<User> {
        return await User.create(userDto)
    }
}