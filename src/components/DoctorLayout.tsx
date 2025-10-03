import React from "react";
import BookSlotPage from "../pages/BookSlotPage";
import "./DoctorLayout.scss";

const DoctorLayout: React.FC = () => {
  const user =
    (JSON.parse(localStorage.getItem("user") || "null") as {
      name?: string;
      role?: string;
    } | null) ?? null;

  if (!user) {
    window.location.href = "/login";
    return null;
  }

  const isDoctor = user.role === "Doctor";

  return (
    <div className="doctor-layout">
      <header className="doctor-header">
        <span>Logged in as {user.name}</span>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </header>
      <main className="doctor-content">
        {/* pass doctor's name so BookSlotPage filters to only show their slots */}
        <BookSlotPage doctorName={isDoctor ? user.name : undefined} />
      </main>
    </div>
  );
};

export default DoctorLayout;

// // src/components/DoctorLayout.tsx
// import React from "react";
// import BookSlotPage from "../pages/BookSlotPage";
// import "./DoctorLayout.scss";

// const DoctorLayout: React.FC = () => {
//   const user = JSON.parse(localStorage.getItem("user") || "null") as {
//     name?: string;
//     role?: string;
//   } | null;

//   if (!user) {
//     window.location.href = "/login";
//     return null;
//   }

//   const isDoctor = user.role === "Doctor";

//   return (
//     <div className="doctor-layout">
//       <header className="doctor-header">
//         <span>Logged in as {user.name}</span>
//         <button
//           className="logout-btn"
//           onClick={() => {
//             localStorage.removeItem("user");
//             window.location.href = "/login";
//           }}
//         >
//           Logout
//         </button>
//       </header>
//       <main className="doctor-content">
//         <BookSlotPage doctorName={isDoctor ? user.name : undefined} />
//       </main>
//     </div>
//   );
// };

// export default DoctorLayout;
