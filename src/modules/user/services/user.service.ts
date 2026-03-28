import { UserModel } from "./../../auth/models";
import { UserProfile } from "./../types";

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  const user = await UserModel.findById(userId).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
};
