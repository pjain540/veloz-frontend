import Router from "express"
import { routeConstants } from "./config/route.constants"
import fileRoutes from "./modules/files/file.routes"
import categoryRoutes from "./modules/categories/category.routes"
import productRoutes from "./modules/products/product.routes"
import customerRoutes from "./modules/customer/customer.routes"
import orderRoutes from "./modules/orders/order.routes"
import contactRoutes from "./modules/contacts/contact.routes"
import reviewRoutes from "./modules/reviews/review.routes"
import settingRoutes from "./modules/settings/setting.route"

const router = Router()

router.use(routeConstants.FILE.BASE, fileRoutes)
router.use(routeConstants.CATEGORY.BASE, categoryRoutes)
router.use(routeConstants.PRODUCT.BASE, productRoutes)
router.use(routeConstants.CUSTOMER.BASE, customerRoutes)
router.use(routeConstants.ORDER.BASE, orderRoutes)
router.use(routeConstants.CONTACT.BASE, contactRoutes)
router.use(routeConstants.REVIEW.BASE, reviewRoutes)
router.use(routeConstants.SETTING.BASE, settingRoutes)

export default router