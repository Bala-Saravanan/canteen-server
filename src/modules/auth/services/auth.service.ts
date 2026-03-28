import { UserModel, IUser } from "../models";
import { RegisterInput, LoginInput, AuthResponse } from "../types";
import { generateToken } from "../../../utils/JWT";

export const registerUser = async (
  input: RegisterInput,
): Promise<AuthResponse> => {
  const existing = await UserModel.findOne({ email: input.email });
  if (existing) {
    throw new Error("Email already registered");
  }

  const user: IUser = await UserModel.create({
    name: input.name,
    email: input.email,
    password: input.password,
    role: input.role || "user",
  });

  const token = generateToken({ userId: user._id.toString(), role: user.role });

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const loginUser = async (input: LoginInput): Promise<AuthResponse> => {
  const user = await UserModel.findOne({ email: input.email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparePassword(input.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({ userId: user._id.toString(), role: user.role });

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};
