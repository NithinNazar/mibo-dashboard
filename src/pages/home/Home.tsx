import BarChartBox from "../../components/barChartBox/BarChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieCartBox/PieChartBox";
import TopBox from "../../components/topBox/TopBox";
import TodayAppointments from "../../components/todayAppointment/TodayAppointments";
import UpcomingAppointments from "../../components/upcomingAppointment/UpcomingAppointments";
import BookAppointmentNow from "../../components/bookAppointment/BookAppointmentNow";
import DoctorAvailability from "../../components/doctorAvailability/DoctorAvailability";
import { Link } from "react-router-dom";

import {
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../data";

import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      {/* Column 1 */}
      <div className="col col1">
        <div className="box">
          <TopBox />
        </div>
        <div className="box">
          <ChartBox {...chartBoxUser} />
        </div>
        <div className="box">
          <ChartBox {...chartBoxProduct} />
        </div>
        <div className="box">
          <PieChartBox />
        </div>
      </div>

      {/* Column 2 */}
      <div className="col col2">
        <div className="box">
          <ChartBox {...chartBoxConversion} />
        </div>
        <div className="box">
          <ChartBox {...chartBoxRevenue} />
        </div>
        <div className="box">
          <BigChartBox />
        </div>
        <div className="box">
          <BarChartBox {...barChartBoxVisit} />
        </div>
        {/* <div className="box">
          <BarChartBox {...barChartBoxRevenue} />
        </div> */}
      </div>

      {/* Column 3 */}
      <div className="col col3">
        <div className="box">
          <TodayAppointments />
        </div>
        <div className="box">
          <UpcomingAppointments />
        </div>
        <div className="box small">
          <BookAppointmentNow />
        </div>
        <div className="box small">
          <DoctorAvailability />
        </div>

        {/* ✅ New Phone Enquiry navigation box */}
        <div className="box small phone-enquiry-box">
          <Link to="/phone-enquiry">
            <h3>Phone Enquiries</h3>
            <p>View & manage calls</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

// import {
//   // barChartBoxRevenue,
//   barChartBoxVisit,
//   chartBoxConversion,
//   chartBoxProduct,
//   chartBoxRevenue,
//   chartBoxUser,
// } from "../../data";

// import "./home.scss";

// const Home = () => {
//   return (
//     <div className="home">
//       {/* Column 1 */}
//       <div className="col col1">
//         <div className="box">
//           <TopBox />
//         </div>
//         <div className="box">
//           <ChartBox {...chartBoxUser} />
//         </div>
//         <div className="box">
//           <ChartBox {...chartBoxProduct} />
//         </div>
//         <div className="box">
//           <PieChartBox />
//         </div>
//       </div>

//       {/* Column 2 */}
//       <div className="col col2">
//         <div className="box">
//           <ChartBox {...chartBoxConversion} />
//         </div>
//         <div className="box">
//           <ChartBox {...chartBoxRevenue} />
//         </div>
//         <div className="box">
//           <BigChartBox />
//         </div>
//         <div className="box">
//           <BarChartBox {...barChartBoxVisit} />
//         </div>
//         {/* <div className="box">
//           <BarChartBox {...barChartBoxRevenue} />
//         </div> */}
//       </div>

//       {/* Column 3 */}
//       <div className="col col3">
//         <div className="box">
//           <TodayAppointments />
//         </div>
//         <div className="box">
//           <UpcomingAppointments />
//         </div>
//         <div className="box small">
//           <BookAppointmentNow />
//         </div>
//         <div className="box small">
//           <DoctorAvailability />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
