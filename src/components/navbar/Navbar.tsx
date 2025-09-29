import "./navbar.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="mibocare.svg" alt="MiboCare" />
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>{user?.name || "User"}</span>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;

// import "./navbar.scss";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login", { replace: true });
//   };

//   return (
//     <div className="navbar">
//       <div className="logo">
//         <img src="mibocare.svg" alt="MiboCare" />
//       </div>
//       <div className="icons">
//         <img src="/search.svg" alt="" className="icon" />
//         <img src="/app.svg" alt="" className="icon" />
//         <img src="/expand.svg" alt="" className="icon" />
//         <div className="notification">
//           <img src="/notifications.svg" alt="" />
//           <span>1</span>
//         </div>
//         <div className="user">
//           <img
//             src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
//             alt=""
//           />
//           <span>{user?.name || "User"}</span>
//         </div>
//         <button className="btn-logout" onClick={handleLogout}>
//           Logout
//         </button>
//         <img src="/settings.svg" alt="" className="icon" />
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// // src/components/navbar/Navbar.tsx
// import "./navbar.scss";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [userRole, setUserRole] = useState<string>("");

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setUserRole(user.role);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user"); // Clear login info
//     navigate("/login"); // Redirect to login
//   };

//   return (
//     <div className="navbar">
//       <div className="logo">
//         <img src="/mibocare.svg" alt="logo" />
//       </div>
//       <div className="icons">
//         <img src="/search.svg" alt="" className="icon" />
//         <img src="/app.svg" alt="" className="icon" />
//         <img src="/expand.svg" alt="" className="icon" />
//         <div className="notification">
//           <img src="/notifications.svg" alt="" />
//           <span>1</span>
//         </div>
//         <div className="user">
//           <img
//             src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
//             alt="user"
//           />
//           <span>{userRole || "Guest"}</span>
//         </div>
//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//         <img src="/settings.svg" alt="" className="icon" />
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// import "./navbar.scss";

// const Navbar = () => {
//   return (
//     <div className="navbar">
//       <div className="logo">
//         <img src="mibocare.svg" alt="" />
//         {/* <span></span> */}
//       </div>
//       <div className="icons">
//         <img src="/search.svg" alt="" className="icon" />
//         <img src="/app.svg" alt="" className="icon" />
//         <img src="/expand.svg" alt="" className="icon" />
//         <div className="notification">
//           <img src="/notifications.svg" alt="" />
//           <span>1</span>
//         </div>
//         <div className="user">
//           <img
//             src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
//             alt=""
//           />
//           <span>Admin</span>
//         </div>
//         <img src="/settings.svg" alt="" className="icon" />
//       </div>
//     </div>
//   );
// };

// export default Navbar;
