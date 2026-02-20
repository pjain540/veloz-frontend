import { Router } from "express";
import { createFile } from "./file.controller";
import { uploadMultipleFiles, uploadSingleFile } from "../../helpers/fileHelper";
import { routeConstants } from "../../config/route.constants";

const router = Router();

router.post(routeConstants.FILE.CREATE, uploadSingleFile, createFile);
router.post(routeConstants.FILE.CREATE_MULTIPLE, uploadMultipleFiles, createFile);

export default router;