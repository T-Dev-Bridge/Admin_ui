// Global Router
import { createElement, lazy } from "react";
import {
  Navigate,
  Outlet,
  redirect,
  RouteObject,
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router";
import { compose, withSuspense } from "@/shared/lib/react";
import { pathKeys } from "@/shared/lib/react-router";
import { useSessionStore } from "@/shared/store/session";
import { Spinner } from "@/shared/ui/spinner";
import { page404Route } from "@/pages/page-404";
import { loginPageRoute, managerPageRoute } from "@/pages";

function BubbleError() {
  const error = useRouteError();
  if (error) throw error;
  return null;
}

const LayoutSkeleton = () => {
  return <Spinner display />;
};

const enhance = compose(
  (component) => withSuspense(component, { FallbackComponent: LayoutSkeleton }), // Suspense기능을 component에 적용한다, 로딩중일 때 컴포넌트도 지정한다.
);

const GuestLayout = lazy(() =>
  import("@/pages/layouts").then((module) => ({
    default: module.GuestLayout,
  })),
);

const UserLayout = lazy(() =>
  import("@/pages/layouts").then((module) => ({
    default: module.UserLayout,
  })),
);

export function CustomBrowserRouter() {
  return <RouterProvider router={browserRouter} />;
}

const guestRoutes: RouteObject[] = [loginPageRoute];
const protectedAuthRoutes: RouteObject[] = [managerPageRoute];

export const protectedAuthUrls = protectedAuthRoutes.map((route) => route.path);

const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  const session = useSessionStore.use.session();
  if (!session) {
    return (
      <Navigate
        to={pathKeys.login()}
        replace
      />
    );
  }
  return element;
};

const browserRouter = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: createElement(ProtectedRoute, {
          element: createElement(enhance(UserLayout)),
        }),
        children: [
          {
            path: pathKeys.root,
            element: <Navigate to={pathKeys.admin.manager()} />,
          },
          ...protectedAuthRoutes,
        ],
      },
      {
        element: createElement(enhance(GuestLayout)),
        children: guestRoutes,
      },
      {
        element: createElement(Outlet),
        children: [page404Route],
      },
      {
        loader: async () => redirect(pathKeys.page404()),
        path: "*",
      },
    ],
  },
]);
