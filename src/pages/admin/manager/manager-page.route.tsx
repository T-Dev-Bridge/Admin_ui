import { createElement, lazy } from "react";
import { LoaderFunctionArgs, RouteObject } from "react-router";
import { compose, withSuspense } from "@/shared/lib/react";
import { pathKeys } from "@/shared/lib/react-router";
import { ManagerPageSkeleton } from "@/pages/admin/manager/manager-page.skeleton";

const managerPageLoader = (args: LoaderFunctionArgs) =>
  import("./manager-page.model").then((module) =>
    module.ManagerLoader.managerPage(args),
  );

const ManagerPage = lazy(() =>
  import("./manager-page.ui").then((module) => ({
    default: module.ManagerPage,
  })),
);

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: ManagerPageSkeleton }),
);

export const managerPageRoute: RouteObject = {
  path: pathKeys.admin.manager(),
  element: createElement(enhance(ManagerPage)),
  loader: managerPageLoader,
};
