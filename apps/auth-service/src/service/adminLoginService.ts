import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Admin } from '../model/loginModel';


export const adminLoginService = async (data: any) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error('Please enter your required fields');
  }

  const user = await Admin.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  const userPassword = await bcrypt.compare(password, user.password as string);

  if (!userPassword) {
    throw new Error('Enter your password correctly');
  }

  const permission = user.permissions || [];
  
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.ACCESS_SECRET_KEY as string,
    {
      expiresIn: '5h',
    },
  );

  const refreshToken = jwt.sign(
    { id: user.id, name: user.name, role: user.role },
    process.env.REFRESH_SECRET_KEY as string,
    {
      expiresIn: '7d',
    },
  );

  return {
    id: user.id,
    name: user.name,
    role: user.role,
    userEmail: user.email,
    permission,
    accessToken,
    refreshToken,
  };
}; 