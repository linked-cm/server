/// <reference types="node" />
/// <reference types="node" />
import { IFileStore } from '@_linked/core/interfaces/IFileStore';
import { Shape } from '@_linked/core/shapes/Shape';
export declare class LocalFileStore extends Shape implements IFileStore {
    private readonly basePath;
    readonly accessURL: string;
    constructor(n: string | {
        id: string;
    }, basePath?: string);
    /**
     * Delete a file from the local filesystem
     * @param filePath The path to the file to delete, relative to the base upload folder
     * @returns A promise that resolves when the file is deleted
     */
    deleteFile(filePath: string): Promise<void>;
    /**
     * Check if a file exists on the local filesystem
     * @param filePath The path to the file to check, relative to the base upload folder
     * @returns A promise that resolves to true if the file exists, false otherwise
     */
    fileExists(filePath: string): Promise<boolean>;
    /**
     * Get a file from the local filesystem
     * @param filePath The path to the file to get, relative to the base upload folder
     * @returns A promise that resolves to the file contents as a buffer, or null if the file does not exist
     */
    getFile(filePath: string): Promise<Buffer | null>;
    /**
     * List all files in the local filesystem, relative to the base upload folder
     * @param recursive Whether or not to search all subdirectories recursively
     * @returns A promise that resolves to a list of file paths, relative to the base upload folder
     * @todo Think about taking an options parameter instead of positional args
     * @todo Take a path parameter to list files in a subdirectory
     */
    listFiles(prefix?: string): Promise<string[]>;
    /**
     * Save a file to the local filesystem
     * @param filePath The path to save the file to, relative to the base upload folder
     * @param fileContent The contents of the file as a buffer
     * @returns A promise that resolves to the public URL of the file
     */
    saveFile(filePath: string, fileContent: Buffer, mimeType?: string): Promise<string>;
}
