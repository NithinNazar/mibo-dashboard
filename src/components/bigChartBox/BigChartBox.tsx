import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";

const data = [
  {
    name: "Sun",
    mumbai: 4000,
    bangalore: 2400,
    kochi: 2400,
  },
  {
    name: "Mon",
    mumbai: 3000,
    bangalore: 1398,
    kochi: 2210,
  },
  {
    name: "Tue",
    mumbai: 2000,
    bangalore: 9800,
    kochi: 2290,
  },
  {
    name: "Wed",
    mumbai: 2780,
    bangalore: 3908,
    kochi: 2000,
  },
  {
    name: "Thu",
    mumbai: 1890,
    bangalore: 4800,
    kochi: 2181,
  },
  {
    name: "Fri",
    mumbai: 2390,
    bangalore: 3800,
    kochi: 2500,
  },
  {
    name: "Sat",
    mumbai: 3490,
    bangalore: 4300,
    kochi: 2100,
  },
];

const BigChartBox = () => {
  return (
    <div className="bigChartBox">
      <h1>Revenue Analytics</h1>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="kochi"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="bangalore"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="mumbai"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
