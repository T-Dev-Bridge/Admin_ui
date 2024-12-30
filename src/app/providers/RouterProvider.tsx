// Global Router
import { createElement } from "react";
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
import { Spinner } from "@/shared/ui/spinner";
import { loginPageRoute } from "@/pages/auth/login";
import { UserLayout } from "@/pages/layouts/userlayout";
import { page404Route } from "@/pages/page-404";

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

export function CustomBrowserRouter() {
  return <RouterProvider router={browserRouter} />;
}

const protectedAuthRoutes: RouteObject[] = [];

export const protectedAuthUrls = protectedAuthRoutes.map((route) => route.path);

// const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
//   const session = useSessionStore.use.session();
//   if (!session) {
//     return (
//       <Navigate
//         to={pathKeys.root}
//         replace
//       />
//     );
//   }
//   return element;
// };

const browserRouter = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: createElement(enhance(UserLayout)),
        children: [
          {
            path: pathKeys.root,
            element: <Navigate to={pathKeys.profile()} />,
          },
          loginPageRoute,
        ],
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
