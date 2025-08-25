import { RouterProvider } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router/router";

// const queryClient = new QueryClient({
//   defaultOptions: { queries: { refetchOnWindowFocus: false, staleTime: 60_000 } },
// });

export default function App() {
  return (
    // <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    // </QueryClientProvider>
  );
}
