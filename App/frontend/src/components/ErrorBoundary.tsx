import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    // Handle HTTP errors from loaders
    if (error.status === 404) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 space-y-4">
          <h1 className="text-4xl font-bold text-white">404 - Not Found</h1>
          <p className="text-slate-300">
            {error.data || "The page you're looking for doesn't exist."}
          </p>
          <Link
            to="/discussion"
            className="rounded-full bg-sky-500 px-6 py-2 text-sm font-semibold text-white hover:bg-sky-600"
          >
            Back to Discussions
          </Link>
        </div>
      );
    }

    if (error.status === 400) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 space-y-4">
          <h1 className="text-4xl font-bold text-white">400 - Bad Request</h1>
          <p className="text-slate-300">
            {error.data || "Invalid discussion ID provided."}
          </p>
          <Link
            to="/discussion"
            className="rounded-full bg-sky-500 px-6 py-2 text-sm font-semibold text-white hover:bg-sky-600"
          >
            Back to Discussions
          </Link>
        </div>
      );
    }
  }

  // Generic error fallback
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 space-y-4">
      <h1 className="text-4xl font-bold text-white">Oops!</h1>
      <p className="text-slate-300">Something went wrong.</p>
      <Link
        to="/discussion"
        className="rounded-full bg-sky-500 px-6 py-2 text-sm font-semibold text-white hover:bg-sky-600"
      >
        Back to Discussions
      </Link>
    </div>
  );
}
