// import { useNavigate } from "react-router-dom";
// import "./bookAppointmentNow.scss";

// const BookAppointmentNow = () => {
//   return (
//     <div className="bookAppointmentNow">
//       <h2>Book Appointment Now</h2>
//       <button className="bookBtn">Book Slot</button>
//     </div>
//   );
// };

// export default BookAppointmentNow;
import { useNavigate } from "react-router-dom";
import "./bookAppointmentNow.scss";

const BookAppointmentNow = () => {
  const navigate = useNavigate();

  return (
    <div className="bookAppointmentNow">
      <button className="bookBtn" onClick={() => navigate("/book-slot")}>
        Book Slot
      </button>
    </div>
  );
};

export default BookAppointmentNow;
