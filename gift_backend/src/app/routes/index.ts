import { Router } from 'express';
import { UserRoutes } from '../module/user/user.route';
import { AuthRoutes } from '../module/auth/auth.route';
import { GiftRoutes } from '../module/gift/gift.route';
import { SaleRoutes } from '../module/sales/sales.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/gifts',
    route: GiftRoutes,
  },
  {
    path: '/sales',
    route: SaleRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
