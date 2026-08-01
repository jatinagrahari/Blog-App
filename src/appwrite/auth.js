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
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
  }

  async login({ email, password }) {
    try {
      const loginSession = await this.account.createEmailPasswordSession(
        email,
        password,
      );
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
      return false;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
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
