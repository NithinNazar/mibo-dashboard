import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import BookSlotPage from "./pages/BookSlotPage";
import Login from "./pages/login/Login";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DoctorLayout from "./components/DoctorLayout";
import PhoneEnquiryPage from "./pages/phone-enquiry/PhoneEnquiryPage";
import "./styles/global.scss";

const queryClient = new QueryClient();

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AdminLayout = () => (
  <div className="main">
    <Navbar />
    <div className="container">
      <div className="menuContainer">
        <Menu />
      </div>
      <div className="contentContainer">
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </div>
    </div>
    <Footer />
  </div>
);

const LoginLayout = () => (
  <div className="login-page">
    <Outlet />
  </div>
);

const App = () => {
  const router = createBrowserRouter([
    // Public login route
    {
      element: <LoginLayout />,
      children: [{ path: "/login", element: <Login /> }],
    },

    // Admin dashboard routes
    {
      element: (
        <RequireAuth>
          <AdminLayout />
        </RequireAuth>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/users", element: <Users /> },
        { path: "/products", element: <Products /> },
        { path: "/users/:id", element: <User /> },
        { path: "/products/:id", element: <Product /> },
        { path: "/book-slot", element: <BookSlotPage /> },
        { path: "/phone-enquiry", element: <PhoneEnquiryPage /> },
      ],
    },

    // Doctor route (no admin navbar/footer)
    {
      path: "/doctor/book-slot",
      element: (
        <RequireAuth>
          <DoctorLayout />
        </RequireAuth>
      ),
    },

    // Fallback: redirect unknown paths to login
    { path: "*", element: <Navigate to="/login" replace /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

// // src/App.tsx
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Outlet,
//   Navigate,
// } from "react-router-dom";
// import Home from "./pages/home/Home";
// import Users from "./pages/users/Users";
// import Products from "./pages/products/Products";
// import User from "./pages/user/User";
// import Product from "./pages/product/Product";
// import BookSlotPage from "./pages/BookSlotPage";
// import Login from "./pages/login/Login";
// import Navbar from "./components/navbar/Navbar";
// import Footer from "./components/footer/Footer";
// import Menu from "./components/menu/Menu";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import DoctorLayout from "./components/DoctorLayout"; // <-- new import
// import "./styles/global.scss";

// const queryClient = new QueryClient();

// // --- Auth Wrapper ---
// const RequireAuth = ({ children }: { children: JSX.Element }) => {
//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   if (!user) return <Navigate to="/login" replace />;
//   return children;
// };

// // --- Admin Dashboard Layout ---
// const AdminLayout = () => (
//   <div className="main">
//     <Navbar />
//     <div className="container">
//       <div className="menuContainer">
//         <Menu />
//       </div>
//       <div className="contentContainer">
//         <QueryClientProvider client={queryClient}>
//           <Outlet />
//         </QueryClientProvider>
//       </div>
//     </div>
//     <Footer />
//   </div>
// );

// // --- Login Layout ---
// const LoginLayout = () => (
//   <div className="login-page">
//     <Outlet />
//   </div>
// );

// const App = () => {
//   const router = createBrowserRouter([
//     // Public login route
//     {
//       element: <LoginLayout />,
//       children: [{ path: "/login", element: <Login /> }],
//     },

//     // Admin dashboard routes
//     {
//       element: (
//         <RequireAuth>
//           <AdminLayout />
//         </RequireAuth>
//       ),
//       children: [
//         { path: "/", element: <Home /> },
//         { path: "/users", element: <Users /> },
//         { path: "/products", element: <Products /> },
//         { path: "/users/:id", element: <User /> },
//         { path: "/products/:id", element: <Product /> },
//         { path: "/book-slot", element: <BookSlotPage /> },
//       ],
//     },

//     // Doctor route (no admin navbar/footer)
//     {
//       path: "/doctor/book-slot",
//       element: (
//         <RequireAuth>
//           <DoctorLayout />
//         </RequireAuth>
//       ),
//     },

//     // Fallback: redirect unknown paths to login
//     { path: "*", element: <Navigate to="/login" replace /> },
//   ]);

//   return <RouterProvider router={router} />;
// };

// export default App;

// // src/App.tsx
// import React from "react";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Outlet,
//   Navigate,
// } from "react-router-dom";
// import Home from "./pages/home/Home";
// import Users from "./pages/users/Users";
// import Products from "./pages/products/Products";
// import User from "./pages/user/User";
// import Product from "./pages/product/Product";
// import BookSlotPage from "./pages/BookSlotPage";
// import Login from "./pages/login/Login";
// import Navbar from "./components/navbar/Navbar";
// import Footer from "./components/footer/Footer";
// import Menu from "./components/menu/Menu";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import "./styles/global.scss";

// const queryClient = new QueryClient();

// // --- Auth Wrapper ---
// const RequireAuth = ({ children }: { children: JSX.Element }) => {
//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   if (!user) return <Navigate to="/login" replace />;
//   return children;
// };

// // --- Admin Layout ---
// const AdminLayout = () => (
//   <div className="main">
//     <Navbar />
//     <div className="container">
//       <div className="menuContainer">
//         <Menu />
//       </div>
//       <div className="contentContainer">
//         <Outlet />
//       </div>
//     </div>
//     <Footer />
//   </div>
// );

// // --- Doctor Layout (full-width, no sidebar) ---
// const DoctorLayout = () => {
//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   return (
//     <div className="doctor-dashboard">
//       <div className="doctor-header">
//         <div className="doctor-header-left">{/* Optional left content */}</div>
//         <div className="doctor-header-right">
//           <span className="doctor-name">Logged in as {user?.name}</span>
//           <button
//             className="btn btn-logout"
//             onClick={() => {
//               localStorage.removeItem("user");
//               window.location.href = "/login";
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       <div className="doctor-content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// // --- Login Layout ---
// const LoginLayout = () => (
//   <div className="login-page">
//     <Outlet />
//   </div>
// );

// const App = () => {
//   const router = createBrowserRouter([
//     // Public login route
//     {
//       element: <LoginLayout />,
//       children: [{ path: "/login", element: <Login /> }],
//     },

//     // Admin routes (with full dashboard layout)
//     {
//       element: (
//         <RequireAuth>
//           <AdminLayout />
//         </RequireAuth>
//       ),
//       children: [
//         { path: "/", element: <Home /> },
//         { path: "/users", element: <Users /> },
//         { path: "/products", element: <Products /> },
//         { path: "/users/:id", element: <User /> },
//         { path: "/products/:id", element: <Product /> },
//         { path: "/book-slot", element: <BookSlotPage /> }, // Admin sees full dashboard
//       ],
//     },

//     // Doctor route (full-width)
//     {
//       path: "/doctor",
//       element: (
//         <RequireAuth>
//           <DoctorLayout />
//         </RequireAuth>
//       ),
//       children: [{ path: "book-slot", element: <BookSlotPage /> }],
//     },

//     // Fallback: redirect unknown paths to login
//     { path: "*", element: <Navigate to="/login" replace /> },
//   ]);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <RouterProvider router={router} />
//     </QueryClientProvider>
//   );
// };

// export default App;

// // // src/App.tsx
// // import {
// //   createBrowserRouter,
// //   RouterProvider,
// //   Outlet,
// //   Navigate,
// // } from "react-router-dom";
// // import Home from "./pages/home/Home";
// // import Users from "./pages/users/Users";
// // import Products from "./pages/products/Products";
// // import User from "./pages/user/User";
// // import Product from "./pages/product/Product";
// // import BookSlotPage from "./pages/BookSlotPage";
// // import Login from "./pages/login/Login";
// // import Navbar from "./components/navbar/Navbar";
// // import Footer from "./components/footer/Footer";
// // import Menu from "./components/menu/Menu";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import "./styles/global.scss";

// // const queryClient = new QueryClient();

// // // --- Auth Wrapper ---
// // const RequireAuth = ({ children }: { children: JSX.Element }) => {
// //   const user = JSON.parse(localStorage.getItem("user") || "null");
// //   if (!user) return <Navigate to="/login" replace />;
// //   return children;
// // };

// // // --- Admin Layout ---
// // const AdminLayout = () => (
// //   <div className="main">
// //     <Navbar />
// //     <div className="container">
// //       <div className="menuContainer">
// //         <Menu />
// //       </div>
// //       <div className="contentContainer">
// //         <QueryClientProvider client={queryClient}>
// //           <Outlet />
// //         </QueryClientProvider>
// //       </div>
// //     </div>
// //     <Footer />
// //   </div>
// // );

// // // --- Doctor Layout ---
// // const DoctorLayout = () => {
// //   const user = JSON.parse(localStorage.getItem("user") || "null");
// //   return (
// //     <div className="doctor-dashboard">
// //       <div className="doctor-header">
// //         <span>Logged in as {user?.name}</span>
// //         <button
// //           className="logout-btn"
// //           onClick={() => {
// //             localStorage.removeItem("user");
// //             window.location.href = "/login";
// //           }}
// //         >
// //           Logout
// //         </button>
// //       </div>
// //       <div className="doctor-content">
// //         <BookSlotPage />
// //       </div>
// //     </div>
// //   );
// // };

// // // --- Login Layout ---
// // const LoginLayout = () => (
// //   <div className="login-page">
// //     <Outlet />
// //   </div>
// // );

// // const App = () => {
// //   const router = createBrowserRouter([
// //     // Public login route
// //     {
// //       element: <LoginLayout />,
// //       children: [{ path: "/login", element: <Login /> }],
// //     },

// //     // Admin dashboard routes
// //     {
// //       element: (
// //         <RequireAuth>
// //           <AdminLayout />
// //         </RequireAuth>
// //       ),
// //       children: [
// //         { path: "/", element: <Home /> },
// //         { path: "/users", element: <Users /> },
// //         { path: "/products", element: <Products /> },
// //         { path: "/users/:id", element: <User /> },
// //         { path: "/products/:id", element: <Product /> },
// //         { path: "/book-slot", element: <BookSlotPage /> },
// //       ],
// //     },

// //     // Doctor route (full-width)
// //     {
// //       path: "/doctor/book-slot",
// //       element: (
// //         <RequireAuth>
// //           <DoctorLayout />
// //         </RequireAuth>
// //       ),
// //     },

// //     // Fallback: redirect unknown paths to login
// //     { path: "*", element: <Navigate to="/login" replace /> },
// //   ]);

// //   return <RouterProvider router={router} />;
// // };

// // export default App;

// // // import {
// // //   createBrowserRouter,
// // //   RouterProvider,
// // //   Outlet,
// // //   Navigate,
// // // } from "react-router-dom";
// // // import Home from "./pages/home/Home";
// // // import Users from "./pages/users/Users";
// // // import Products from "./pages/products/Products";
// // // import User from "./pages/user/User";
// // // import Product from "./pages/product/Product";
// // // import BookSlotPage from "./pages/BookSlotPage";
// // // import Login from "./pages/login/Login";
// // // import Navbar from "./components/navbar/Navbar";
// // // import Footer from "./components/footer/Footer";
// // // import Menu from "./components/menu/Menu";
// // // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // // import "./styles/global.scss";

// // // const queryClient = new QueryClient();

// // // // --- Auth Wrapper ---
// // // const RequireAuth = ({ children }: { children: JSX.Element }) => {
// // //   const user = JSON.parse(localStorage.getItem("user") || "null");
// // //   if (!user) return <Navigate to="/login" replace />;
// // //   return children;
// // // };

// // // // --- Admin Dashboard Layout ---
// // // const AdminLayout = () => (
// // //   <div className="main">
// // //     <Navbar />
// // //     <div className="container">
// // //       <div className="menuContainer">
// // //         <Menu />
// // //       </div>
// // //       <div className="contentContainer">
// // //         <QueryClientProvider client={queryClient}>
// // //           <Outlet />
// // //         </QueryClientProvider>
// // //       </div>
// // //     </div>
// // //     <Footer />
// // //   </div>
// // // );

// // // // --- Login Layout ---
// // // const LoginLayout = () => (
// // //   <div className="login-page">
// // //     <Outlet />
// // //   </div>
// // // );

// // // const App = () => {
// // //   const router = createBrowserRouter([
// // //     // Public login route
// // //     {
// // //       element: <LoginLayout />,
// // //       children: [{ path: "/login", element: <Login /> }],
// // //     },

// // //     // Admin routes (with full dashboard layout)
// // //     {
// // //       element: (
// // //         <RequireAuth>
// // //           <AdminLayout />
// // //         </RequireAuth>
// // //       ),
// // //       children: [
// // //         { path: "/", element: <Home /> },
// // //         { path: "/users", element: <Users /> },
// // //         { path: "/products", element: <Products /> },
// // //         { path: "/users/:id", element: <User /> },
// // //         { path: "/products/:id", element: <Product /> },
// // //         { path: "/book-slot", element: <BookSlotPage /> }, // Admin sees full dashboard
// // //       ],
// // //     },

// // //     // Doctor route (filtered, standalone)
// // //     {
// // //       path: "/doctor/book-slot",
// // //       element: (
// // //         <RequireAuth>
// // //           <BookSlotPage />
// // //         </RequireAuth>
// // //       ),
// // //     },

// // //     // Fallback
// // //     { path: "*", element: <Navigate to="/login" replace /> },
// // //   ]);

// // //   return <RouterProvider router={router} />;
// // // };

// // // export default App;
