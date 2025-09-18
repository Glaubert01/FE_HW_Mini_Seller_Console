import React from "react";
import { RouteObject } from "react-router-dom";
import LeadsPage from "@/pages/LeadsPage";
import OpportunitiesPage from "@/pages/OpportunitiesPage";

export const routes: RouteObject[] = [
  {
    path: "/leads",
    element: <LeadsPage />,
  },
  {
    path: "/opportunities",
    element: <OpportunitiesPage />,
  },
  {
    path: "*",
    element: <div>Page not found</div>,
  },
];
