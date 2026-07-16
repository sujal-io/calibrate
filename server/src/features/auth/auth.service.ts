import User from "../user/user.model.js";

interface SyncUserInput {
  clerkId: string;
  email: string;
  fullName: string;
}

export const syncUserService = async ({
  clerkId,
  email,
  fullName,
}: SyncUserInput) => {
  let user = await User.findOne({ clerkId });

  if (user) {
    return user;
  }

  user = await User.create({
    clerkId,
    email,
    fullName,
  });

  return user;
};