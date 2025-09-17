import "./doctorAvailability.scss";
import { doctorAvailability } from "../../data";

const DoctorAvailability = () => {
  return (
    <div className="doctorAvailability">
      <h2>Doctor Availability</h2>
      <ul>
        {doctorAvailability.map((doc, index) => (
          <li key={index}>
            <span className="doctor">{doc.name}</span>
            <span className="centre">{doc.centre}</span>
            <span className={`status ${doc.status.toLowerCase()}`}>
              {doc.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorAvailability;
