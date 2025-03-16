"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, [Query.equal("email", [email])]);

  return result.total > 0 ? result.documents[0] : null;
};

const sendEmailOTP = async (email: string) => {
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

    const avatarUrl = `${appwriteConfig.endpointUrl}/v1/avatars/initials?name=${encodeURIComponent(fullName)}`;

    await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, ID.unique(), {
      fullName,
      email,
      avatar: avatarUrl,
      accountId,
    });
  }

  return parseStringify({ accountId });
};
