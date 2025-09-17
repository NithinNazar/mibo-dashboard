import "./todayAppointments.scss";
import { todayAppointments } from "../../data";

const TodayAppointments = () => {
  return (
    <div className="todayAppointments">
      <h2>Today's Appointments</h2>
      <ul>
        {todayAppointments.map((appt, index) => (
          <li key={index}>
            <span className="patient">{appt.patient}</span>
            <span className="doctor">{appt.doctor}</span>
            <span className="centre">{appt.centre}</span>
          </li>
        ))}
      </ul>
      <button className="manageBtn">Manage</button>
    </div>
  );
};

export default TodayAppointments;
