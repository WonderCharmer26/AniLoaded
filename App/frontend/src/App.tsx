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
import { homePageFetcher } from "./services/homePageLoader";
// import { Feather } from "lucide-react";
import { featuredAnimePrefetcher } from "./services/animePrefetchers";
import { queryClient } from "./services/queryClient";

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
        // NOTE: homePageFetcher get the raw calrousel data and also returns the anime queries for the showcase sections on the page
        loader: homePageFetcher(queryClient),
      },
      // TODO: need to add routing for the other pages home, discuss, list, show, communities, genres
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
        loader: async () => {
          await featuredAnimePrefetcher(queryClient);
        },

        // TODO: add in a loader function to preload the information for the anime page
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
