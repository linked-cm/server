"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessUrlLocalFileStore = void 0;
/**
 * get access url for frontend to set FileStorage
 *
 * @returns frontend access url
 */
const getAccessUrlLocalFileStore = () => {
    return process.env.SITE_ROOT;
};
exports.getAccessUrlLocalFileStore = getAccessUrlLocalFileStore;
//# sourceMappingURL=accessUrl.js.map