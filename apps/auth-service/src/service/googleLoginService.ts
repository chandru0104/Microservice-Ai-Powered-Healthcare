import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../model/loginModel";
import { client } from "../utils/googleLogin";

dotenv.config();

interface GoogleLoginData {
  code: string;
  role: "user";
}

export const googleLoginService = async (data: GoogleLoginData) => {
  const { code, role } = data;

  // Validate input
  if (!code) {
    throw new Error("Authorization code is required");
  }

  // Exchange authorization code for tokens
  const { tokens } = await client.getToken(code);

  if (!tokens.id_token) {
    throw new Error("Failed to get Google ID Token");
  }

  // Verify Google ID Token
  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Invalid Google Token");
  }

  const {
    email,
    name,
    sub,
  } = payload;

  if (!email) {
    throw new Error("Email not found from Google");
  }


  // Check existing account
  let account = await User.findOne({ email });

  // Create account if not exists
  if (!account) {
    account = await User.create({
      email,
      name,
      role,
      is_google_login: true,
      google_id: sub,
    });
  }

  // Generate Access Token
  const accessToken = jwt.sign(
    {
      id: account._id,
      role: account.role,
      name: account.name,
    },
    process.env.ACCESS_SECRET_KEY as string,
    {
      expiresIn: "1h",
    }
  );

  // Generate Refresh Token
  const refreshToken = jwt.sign(
    {
      id: account._id,
      role: account.role,
      name: account.name,
    },
    process.env.REFRESH_SECRET_KEY as string,
    {
      expiresIn: "7d",
    }
  );

  return {
    user: account,
    accessToken,
    refreshToken,
  };
};