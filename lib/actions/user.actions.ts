"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, [Query.equal("email", [email])]);

  return result.total > 0 ? result.documents[0] : null;
};

export const getAvatarUrl = async (name: string) => {
  return `${appwriteConfig.endpointUrl}/avatars/initials?name=${encodeURIComponent(name)}`;
};

export const sendEmailOTP = async (email: string) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Error sending email OTP");
  }
};

export const createAccount = async ({ fullName, email }: { fullName: string; email: string }) => {
  const exsistingUser = await getUserByEmail(email);

  const accountId = await sendEmailOTP(email);

  if (!accountId) throw new Error("Error sending email OTP");

  if (!exsistingUser) {
    const { databases } = await createAdminClient();

    const avatarUrl = getAvatarUrl(fullName);

    await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, ID.unique(), {
      fullName,
      email,
      avatar: avatarUrl,
      accountId,
    });
  }

  return parseStringify({ accountId });
};

export const verifySecret = async ({ accountId, password }: { accountId: string; password: string }) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Error verifying OTP");
  }
};

export const getCurrentUser = async () => {
  const { account, databases } = await createSessionClient();

  const result = await account.get();

  const user = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, [Query.equal("accountId", result.$id)]);

  if (user.total <= 0) return null;

  return parseStringify(user.documents[0]);
};
