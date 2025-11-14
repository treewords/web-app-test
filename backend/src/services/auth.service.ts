import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';

const userRepository = AppDataSource.getRepository(User);

export class AuthService {
  static async register(email: string, password: string, firstName: string, lastName: string): Promise<Partial<User>> {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User();
    user.email = email;
    user.passwordHash = passwordHash;
    user.firstName = firstName;
    user.lastName = lastName;

    const newUser = await userRepository.save(user);
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  static async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  static async refreshToken(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: string };
      const user = await userRepository.findOne({ where: { id: decoded.userId } });

      if (!user) {
        throw new Error('User not found');
      }

      const accessToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '15m' });
      return accessToken;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
