import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./routes/error-page.tsx";
import UsersTable from "./routes/users-table.tsx";
import PersonalPage from "./routes/personal-page.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Layout from "./layout/layout.tsx";

const router = createBrowserRouter([
  {
    path: "/users-task/",
    element: (
      <Layout>
        <UsersTable />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "users-task/user/:userId",
    element: (
      <Layout>
        <PersonalPage />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
