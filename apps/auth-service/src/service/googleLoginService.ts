import jwt from "jsonwebtoken"; // Fix: Default import-ah mathியாச்சு
import { User } from "../model/loginModel";
import { client } from "../utils/googleLogin";
import dotenv from "dotenv";

dotenv.config();

export const googleLoginService = async (data: any) => {
  const { code, role } = data;

  if (!code) {
    throw new Error("Authorization code required from google");
  }

  const { tokens } = await client.getToken(code);

  if (!tokens || !tokens.id_token) {
    throw new Error("Failed to exchange code for google tokens");
  }

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Invalid Google Token Payload");
  }

  const { email, name, picture, sub: googleId } = payload;

  let user = await User.findOne({ email });

  if (!user) {
    const assignedRole = ["job_seeker", "employer"].includes(role) ? role : "job_seeker";

    user = await User.create({
      email,
      name,
      role: assignedRole,
      profile: picture, 
      is_google_login: true,
      googleId,
    });
  }

  const accessToken = jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.ACCESS_SECRET_KEY as string,
    { expiresIn: "1h" } 
  );

  const refreshToken = jwt.sign({id: user._id, role: user.role, name: user.name },
    process.env.REFRESH_SECRET_KEY as string ,
    {expiresIn:"7d"})

  return {
    user,
    accessToken,
    refreshToken
  };
};