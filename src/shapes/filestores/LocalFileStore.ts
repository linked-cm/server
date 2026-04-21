import {
  relativeFileSystemUploadPath,
  getUploadTarget,
} from '@_linked/server-utils/utils/Upload';
import { IFileStore } from '@_linked/core/interfaces/IFileStore';
import { Shape } from '@_linked/core/shapes/Shape';
import * as fsSync from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';

export class LocalFileStore extends Shape implements IFileStore {
  private readonly basePath: string;

  public readonly accessURL: string;

  constructor(
    n: string | { id: string },
    basePath: string = relativeFileSystemUploadPath
  ) {
    if (typeof n === 'string') {
      const uri = `${process.env.DATA_ROOT}/local-filestore/${n}`;
      super({ id: uri });
    } else {
      super(n);
    }

    this.accessURL = process.env.SITE_ROOT;
    this.basePath = basePath;
  }

  /**
   * Delete a file from the local filesystem
   * @param filePath The path to the file to delete, relative to the base upload folder
   * @returns A promise that resolves when the file is deleted
   */
  deleteFile(filePath: string): Promise<void> {
    const fileToDelete = path.join(this.basePath, filePath);

    return fs.rm(fileToDelete);
  }

  /**
   * Check if a file exists on the local filesystem
   * @param filePath The path to the file to check, relative to the base upload folder
   * @returns A promise that resolves to true if the file exists, false otherwise
   */
  fileExists(filePath: string): Promise<boolean> {
    const fileToCheck = path.join(this.basePath, filePath);

    return fs
      .access(fileToCheck)
      .then(() => true)
      .catch(() => false);
  }

  /**
   * Get a file from the local filesystem
   * @param filePath The path to the file to get, relative to the base upload folder
   * @returns A promise that resolves to the file contents as a buffer, or null if the file does not exist
   */
  getFile(filePath: string): Promise<Buffer | null> {
    const fileToGet = path.join(this.basePath, filePath);

    return fs.readFile(fileToGet).catch(() => null);
  }

  /**
   * List all files in the local filesystem, relative to the base upload folder
   * @param recursive Whether or not to search all subdirectories recursively
   * @returns A promise that resolves to a list of file paths, relative to the base upload folder
   * @todo Think about taking an options parameter instead of positional args
   * @todo Take a path parameter to list files in a subdirectory
   */
  async listFiles(prefix?: string): Promise<string[]> {
    let files = await fs.readdir(this.basePath);

    // if (recursive) {
    const allFiles = await Promise.all(
      files.map((file) => {
        const filePath = path.join(this.basePath, file);

        return fs
          .stat(filePath)
          .then((stat) => {
            if (stat.isDirectory()) {
              return this.listFiles(prefix).then((files) =>
                files.map((file) => path.join(filePath, file))
              );
            } else {
              return [filePath];
            }
          })
          .catch((err) => {
            console.warn('Error during listFiles', err);
            return [];
          });
      })
    );

    return allFiles.flat();
  }

  /**
   * Save a file to the local filesystem
   * @param filePath The path to save the file to, relative to the base upload folder
   * @param fileContent The contents of the file as a buffer
   * @returns A promise that resolves to the public URL of the file
   */
  async saveFile(
    filePath: string,
    fileContent: Buffer,
    mimeType?: string
  ): Promise<string> {
    const { publicURL, targetFilePath } = getUploadTarget(
      filePath,
      mimeType,
      null,
      '',
      this.accessURL
    );

    //make sure the target folder exists
    if (!fsSync.existsSync(path.dirname(targetFilePath))) {
      fsSync.mkdirSync(path.dirname(targetFilePath), { recursive: true });
    }
    await fs.writeFile(targetFilePath, fileContent);

    return publicURL;
  }
}
