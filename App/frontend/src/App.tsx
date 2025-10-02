// import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "./index.css";

// Import pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserProfilePage from "./pages/UserProfilePage";
import AnimeInfoPage from "./pages/AnimeInfoPage";

// Layout Components
import AuthLayout from "./layouts/AuthLayout";
import RootLayout from "./layouts/RootLayout";

// Fetching functions to get data for the HomePage

// Create router configuration with layouts
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        // Main Page
        index: true,
        element: <HomePage />,
        // TODO: add in a loader to help with loading the anime on the page
        // use the animeFetching functions to get the data for the carousel and the cards
      },
      {
        // Profile page
        path: "profile",
        element: <UserProfilePage />,
      },
      // NOTE: might make anime layout for all the anime pages
      {
        // info about the anime (might route into it's parent route)
        path: "anime/:id",
        element: <AnimeInfoPage />,
      },
    ],
  },

  {
    // NOTE: route auth/login and auth/signup
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
