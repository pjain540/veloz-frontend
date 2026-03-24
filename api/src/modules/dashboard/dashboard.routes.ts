import Router from "express";
import { routeConstants } from "../../config/route.constants";
import * as dashboardController from "./dashboard.controller";

const router = Router();

router.get(routeConstants.DASHBOARD.GET_COUNTS, dashboardController.getCounts);
router.get(routeConstants.DASHBOARD.GET_RECENT_ORDERS, dashboardController.getRecentOrders);

export default router;
