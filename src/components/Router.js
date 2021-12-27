import { lazy } from "react";

const DashBoard = lazy(() => import("./urlShortener/Dashboard"));
const URLShortener = lazy(() =>
  import("./urlShortener/URLShortener")
);
const DataTable = lazy(() => import("./urlShortener/DataTable"));
const NotFound = lazy(() => import("./urlShortener/notFound"));

export const Routes = [
  {
    path: "/",
    component: DashBoard,
    exact: true,
  },
  {
    path: "/dashboard",
    component: DashBoard,
    exact: true,
  },
  {
    path: "/urlshortener",
    component: URLShortener,
    exact: true,
  },
  {
    path: "/table",
    component: DataTable,
  },
  {
    path: "**",
    component: NotFound,
  }
];
