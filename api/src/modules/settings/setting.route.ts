import { Router } from "express";
import { createSettingController, getAllSettingsController, getSettingBySlugController, updateSettingBySlugController } from "./setting.controller";
import { routeConstants } from "../../config/route.constants";

const router = Router()

router.post(routeConstants.SETTING.CREATE, createSettingController)

router.get(routeConstants.SETTING.GET_SLUG, getSettingBySlugController)

router.put(routeConstants.SETTING.UPDATE, updateSettingBySlugController)

router.get(routeConstants.SETTING.GET_ALL, getAllSettingsController)

export default router