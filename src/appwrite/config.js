import { Client, TablesDB, ID, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  storage;
  tablesDb;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);

    this.storage = new Storage();
    this.tablesDb = new TablesDB();
  }

  async createPost({ title, content, slug, featuredImage, status, userID }) {
    try {
      await this.tablesDb.createRow(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        ID.unique,
        {
          slug,
          title,
          content,
          featuredImage,
          status,
          userID,
        },
      );
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
      return false;
    }
  }

  async getPost(id) {
    try {
      await this.tablesDb.getRow(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        id,
      );
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
      return false;
    }
  }

  async getActivePosts([queries = [Query.equal("status", "active")]]) {
    try {
      await this.tablesDb.getRows(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        queries,
      );
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
      return false;
    }
  }

  async updatePost(id, { title, content, featuredImage, slug, status }) {
    try {
      await this.tablesDb.updateRow(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        id,
        {
          title,
          content,
          slug,
          featuredImage,
          status,
        },
      );
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
      return false;
    }
  }

  async deletePost(id) {
    try {
      await this.tablesDb.deleteRow(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        id,
      );
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
      return false;
    }
  }

  // file upload methods

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteStorageId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    try {
      return await this.bucket.getFileView(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
      return false;
    }
  }
}

const appwriteService = new Service();

export default appwriteService;
