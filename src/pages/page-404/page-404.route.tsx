import { createElement, lazy } from "react";
import { RouteObject } from "react-router";
import { compose, withSuspense } from "@/shared/lib/react";
import { pathKeys } from "@/shared/lib/react-router";
import { Spinner } from "@/shared/ui/spinner";

const Page404 = lazy(() =>
  import("./page-404.ui").then((module) => ({
    default: module.Page404,
  })),
);

const enhance = compose((component) =>
  withSuspense(component, {
    fallback: <Spinner />,
  }),
);

export const page404Route: RouteObject = {
  path: pathKeys.page404(),
  element: createElement(enhance(Page404)),
};
