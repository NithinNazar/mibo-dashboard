// src/components/menu/Menu.tsx
import { Link } from "react-router-dom";
import "./menu.scss";
import { menu } from "../../data";
import { useEffect, useState } from "react";

const Menu = () => {
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.role);
    }
  }, []);

  // Filter menu items based on role
  const filteredMenu = menu.filter((item) => {
    if (userRole === "Admin") return true; // Admin sees everything
    if (userRole === "Doctor") {
      // Show only the items meant for Doctor (for example, appointments)
      return item.title === "Appointments"; // Adjust this based on your menu structure
    }
    return false;
  });

  return (
    <div className="menu">
      {filteredMenu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link to={listItem.url} className="listItem" key={listItem.id}>
              <img src={listItem.icon} alt="" />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;

// import { Link } from "react-router-dom";
// import "./menu.scss";
// import { menu } from "../../data";

// const Menu = () => {
//   return (
//     <div className="menu">
//       {menu.map((item) => (
//         <div className="item" key={item.id}>
//           <span className="title">{item.title}</span>
//           {item.listItems.map((listItem) => (
//             <Link to={listItem.url} className="listItem" key={listItem.id}>
//               <img src={listItem.icon} alt="" />
//               <span className="listItemTitle">{listItem.title}</span>
//             </Link>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Menu;
