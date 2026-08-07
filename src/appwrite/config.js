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

    this.storage = new Storage(this.client);
    this.tablesDb = new TablesDB(this.client);
  }

  async createPost({ title, content, slug, featuredImage, status, userId }) {
    try {
      return await this.tablesDb.createRow(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        ID.unique(),
        {
          slug,
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      );
    } catch (error) {
      throw error;
      return false;
    }
  }

  async getPost(id) {
    try {
      return await this.tablesDb.getRow(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        id,
      );
    } catch (error) {
      throw error;
      return false;
    }
  }

  async getActivePosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.tablesDb.listRows(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        queries,
      );
    } catch (error) {
      throw error;
      return false;
    }
  }

  async getPosts() {
    try {
      return await this.tablesDb.listRows(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
      );
    } catch (error) {
      throw error;
      return false;
    }
  }

  async createDelete({ title, deleteRequested, deleteRequestedAt, userId }) {
    try {
      return await this.tablesDb.createRow(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        ID.unique(),
        {
          title,
          deleteRequested,
          deleteRequestedAt,
          userId,
        },
      );
    } catch (error) {
      throw error;
      return false;
    }
  }

  async updatePost(id, { title, content, featuredImage, slug, status }) {
    try {
      return await this.tablesDb.updateRow(
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
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }

  async deletePost(id) {
    try {
      return await this.tablesDb.deleteRow(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        id,
      );
    } catch (error) {
      throw error;
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
      throw error;
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.storage.getFileView(conf.appwriteStorageId, fileId);
    } catch (error) {
      throw error;
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteStorageId, fileId);
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }
}

const appwriteService = new Service();

export default appwriteService;
