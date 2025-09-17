import "./upcomingAppointments.scss";
import { upcomingAppointments } from "../../data";

const UpcomingAppointments = () => {
  return (
    <div className="upcomingAppointments">
      <h2>Upcoming Appointments</h2>
      <ul>
        {upcomingAppointments.map((appt, index) => (
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

export default UpcomingAppointments;
