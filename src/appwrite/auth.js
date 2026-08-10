import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      return user;
    } catch (error) {
      throw error;
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
  }

  async sendVerificationEmail() {
    try {
      const response = await this.account.createVerification(
        "https://appblogstack.netlify.app/verify-email",
      );

      return response;
    } catch (error) {
      console.log("Appwrite service :: sendVerificationEmail :: error", error);
      throw error;
    }
  }

  async verifyEmail(userId, secret) {
    try {
      const response = await this.account.updateVerification(userId, secret);

      return response;
    } catch (error) {
      console.log("Appwrite service :: verifyEmail :: error", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const loginSession = await this.account.createEmailPasswordSession(
        email,
        password,
      );
      return loginSession;
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      return false;
    }
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
      return false;
    }
  }
}

const authService = new AuthService();

export default authService;
