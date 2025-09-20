export const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Dashboard",
        url: "/",
        icon: "home.svg",
      },
      {
        id: 2,
        title: "Centres",
        url: "/",
        icon: "centre.svg",
      },
      {
        id: 3,
        title: "Doctors",
        url: "/users/1",
        icon: "doctor.svg",
      },
    ],
  },
  {
    id: 2,
    title: "actions",
    listItems: [
      {
        id: 1,
        title: "Registered Patients",
        url: "/users",
        icon: "user.svg",
      },
      {
        id: 2,
        title: "Appointments",
        url: "/users",
        icon: "appointment.svg",
      },
      {
        id: 3,
        title: "Slots Management",
        url: "/orders",
        icon: "order.svg",
      },
      {
        id: 4,
        title: "Reports",
        url: "/posts",
        icon: "reports.svg",
      },
    ],
  },
  {
    id: 3,
    title: "staffs",
    listItems: [
      {
        id: 1,
        title: "Admin",
        url: "/",
        icon: "admin.svg",
      },
      {
        id: 2,
        title: "Manager",
        url: "/",
        icon: "manager.svg",
      },
      {
        id: 3,
        title: "Centre Manager",
        url: "/",
        icon: "form.svg",
      },
      {
        id: 4,
        title: "Care Coordinator",
        url: "/",
        icon: "calendar.svg",
      },
      {
        id: 4,
        title: "Front Desk",
        url: "/",
        icon: "calendar.svg",
      },
    ],
  },
  {
    id: 4,
    title: "Maintenance",
    listItems: [
      {
        id: 1,
        title: "Settings",
        url: "/",
        icon: "setting.svg",
      },
      {
        id: 2,
        title: "Backups",
        url: "/",
        icon: "backup.svg",
      },
    ],
  },
  {
    id: 5,
    title: "analytics",
    listItems: [
      {
        id: 1,
        title: "Charts",
        url: "/",
        icon: "chart.svg",
      },
      {
        id: 2,
        title: "Logs",
        url: "/",
        icon: "log.svg",
      },
    ],
  },
];

export const topDealUsers = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    username: "Dr.Elva Thomas",
    email: "Adult Therapist",
    amount: "366",
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Dr.Linnie Nelson",
    email: "Child Therapist",
    amount: "325",
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Dr.Ranjit Singh",
    email: "Psychiatrist",
    amount: "299",
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Dr.Nyla Gupta",
    email: "Couple Therapist",
    amount: "251",
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Dr.Dev Patel",
    email: "Psychologist",
    amount: "213",
  },
  // {
  //   id: 6,
  //   img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   username: "Ajith Kumar",
  //   email: "Behavioral Therapist",
  //   amount: "193",
  // },
  // {
  //   id: 7,
  //   img: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   username: "Angel Thomas",
  //   email: "Deaddiction Therapist",
  //   amount: "156",
  // },
];

export const chartBoxUser = {
  color: "#8884d8",
  icon: "/userIcon.svg",
  title: "Total Patients",
  number: "11238",
  dataKey: "users",
  percentage: 45,
  chartData: [
    { name: "Sun", users: 400 },
    { name: "Mon", users: 600 },
    { name: "Tue", users: 500 },
    { name: "Wed", users: 700 },
    { name: "Thu", users: 400 },
    { name: "Fri", users: 500 },
    { name: "Sat", users: 450 },
  ],
};

export const chartBoxProduct = {
  color: "skyblue",
  icon: "/productIcon.svg",
  title: "Active Doctors",
  number: "238",
  dataKey: "products",
  percentage: 21,
  chartData: [
    { name: "Sun", products: 400 },
    { name: "Mon", products: 600 },
    { name: "Tue", products: 500 },
    { name: "Wed", products: 700 },
    { name: "Thu", products: 400 },
    { name: "Fri", products: 500 },
    { name: "Sat", products: 450 },
  ],
};
export const chartBoxRevenue = {
  color: "teal",
  icon: "/revenueIcon.svg",
  title: "Total Revenue",
  number: "₹1643205",
  dataKey: "revenue",
  percentage: -12,
  chartData: [
    { name: "Sun", revenue: 400 },
    { name: "Mon", revenue: 600 },
    { name: "Tue", revenue: 500 },
    { name: "Wed", revenue: 700 },
    { name: "Thu", revenue: 400 },
    { name: "Fri", revenue: 500 },
    { name: "Sat", revenue: 450 },
  ],
};
export const chartBoxConversion = {
  color: "gold",
  icon: "/conversionIcon.svg",
  title: "Follow Ups Booked",
  number: "182",
  dataKey: "ratio",
  percentage: 12,
  chartData: [
    { name: "Sun", ratio: 400 },
    { name: "Mon", ratio: 600 },
    { name: "Tue", ratio: 500 },
    { name: "Wed", ratio: 700 },
    { name: "Thu", ratio: 400 },
    { name: "Fri", ratio: 500 },
    { name: "Sat", ratio: 450 },
  ],
};

export const barChartBoxRevenue = {
  title: "Profit Earned",
  color: "#8884d8",
  dataKey: "profit",
  chartData: [
    {
      name: "Sun",
      profit: 4000,
    },
    {
      name: "Mon",
      profit: 3000,
    },
    {
      name: "Tue",
      profit: 2000,
    },
    {
      name: "Wed",
      profit: 2780,
    },
    {
      name: "Thu",
      profit: 1890,
    },
    {
      name: "Fri",
      profit: 2390,
    },
    {
      name: "Sat",
      profit: 3490,
    },
  ],
};

export const barChartBoxVisit = {
  title: "Total Visit",
  color: "#FF8042",
  dataKey: "visit",
  chartData: [
    {
      name: "Sun",
      visit: 4000,
    },
    {
      name: "Mon",
      visit: 3000,
    },
    {
      name: "Tue",
      visit: 2000,
    },
    {
      name: "Wed",
      visit: 2780,
    },
    {
      name: "Thu",
      visit: 1890,
    },
    {
      name: "Fri",
      visit: 2390,
    },
    {
      name: "Sat",
      visit: 3490,
    },
  ],
};

export const userRows = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    lastName: "Hubbard",
    firstName: "Eula",
    email: "kewez@@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    verified: true,
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Manning",
    firstName: "Stella",
    email: "comhuhmit@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    verified: true,
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Greer",
    firstName: "Mary",
    email: "ujudokon@hottmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    verified: true,
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Williamson",
    firstName: "Mildred",
    email: "tinhavabe@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    verified: true,
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Gross",
    firstName: "Jose",
    email: "gobtagbes@yahoo.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 6,
    img: "https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Sharp",
    firstName: "Jeremy",
    email: "vulca.eder@mail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    verified: true,
  },
  {
    id: 7,
    img: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Lowe",
    firstName: "Christina",
    email: "reso.bilic@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 8,
    img: "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Dean",
    firstName: "Garrett",
    email: "codaic@mail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    verified: true,
  },
  {
    id: 9,
    img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Parsons",
    firstName: "Leah",
    email: "uzozor@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 10,
    img: "https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Reid",
    firstName: "Elnora",
    email: "tuhkabapu@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    verified: true,
  },
  {
    id: 11,
    img: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Dunn",
    firstName: "Gertrude",
    email: "gibo@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    verified: true,
  },
  {
    id: 12,
    img: "https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Williams",
    firstName: "Mark",
    email: "tic.harvey@hotmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 13,
    img: "https://images.pexels.com/photos/761977/pexels-photo-761977.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Cruz",
    firstName: "Charlotte",
    email: "ceuc@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 14,
    img: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Harper",
    firstName: "Sara",
    email: "bafuv@hotmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 15,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    lastName: "Griffin",
    firstName: "Eric",
    email: "ubi@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
];

export const products = [];

export const singleUser = {
  id: 1,
  title: "John Doe",
  img: "https://images.pexels.com/photos/17397364/pexels-photo-17397364.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  info: {
    username: "Johndoe99",
    fullname: "John Doe",
    email: "johndoe@gmail.com",
    phone: "123 456 789",
    status: "verified",
  },
  chart: {
    dataKeys: [
      { name: "visits", color: "#82ca9d" },
      { name: "clicks", color: "#8884d8" },
    ],
    data: [
      {
        name: "Sun",
        visits: 4000,
        clicks: 2400,
      },
      {
        name: "Mon",
        visits: 3000,
        clicks: 1398,
      },
      {
        name: "Tue",
        visits: 2000,
        clicks: 3800,
      },
      {
        name: "Wed",
        visits: 2780,
        clicks: 3908,
      },
      {
        name: "Thu",
        visits: 1890,
        clicks: 4800,
      },
      {
        name: "Fri",
        visits: 2390,
        clicks: 3800,
      },
      {
        name: "Sat",
        visits: 3490,
        clicks: 4300,
      },
    ],
  },
  activities: [
    {
      text: "John Doe ",
      time: "3 day ago",
    },
    {
      text: "John Doe ",
      time: "1 week ago",
    },
    {
      text: "John Doe ",
      time: "2 weeks ago",
    },
    {
      text: "John Doe ",
      time: "1 month ago",
    },
    {
      text: "John Doe ",
      time: "1 month ago",
    },
    {
      text: "John Doe ",
      time: "2 months ago",
    },
  ],
};
export const singleProduct = {
  id: 1,
  title: "Playstation 5 Digital Edition",
  img: "https://store.sony.com.au/on/demandware.static/-/Sites-sony-master-catalog/default/dw1b537bbb/images/PLAYSTATION5W/PLAYSTATION5W.png",
  info: {
    Id: "Ps5SDF1156d",
    name: "white",
    doctor: "$250.99",
    producer: "Sony",
    export: "Japan",
  },
  chart: {
    dataKeys: [
      { name: "visits", color: "#82ca9d" },
      { name: "orders", color: "#8884d8" },
    ],
    data: [
      {
        name: "Sun",
        visits: 4000,
        orders: 2400,
      },
      {
        name: "Mon",
        visits: 3000,
        orders: 1398,
      },
      {
        name: "Tue",
        visits: 2000,
        orders: 3800,
      },
      {
        name: "Wed",
        visits: 2780,
        orders: 3908,
      },
      {
        name: "Thu",
        visits: 1890,
        orders: 4800,
      },
      {
        name: "Fri",
        visits: 2390,
        orders: 3800,
      },
      {
        name: "Sat",
        visits: 3490,
        orders: 4300,
      },
    ],
  },
  activities: [
    {
      text: "John Doe",
      time: "3 day ago",
    },
    {
      text: "Jane Doe",
      time: "1 week ago",
    },
    {
      text: "Mike Doe",
      time: "2 weeks ago",
    },
    {
      text: "Anna Doe ",
      time: "1 month ago",
    },
    {
      text: "Michael Doe",
      time: "1 month ago",
    },
    {
      text: "Helen Doe",
      time: "2 months ago",
    },
  ],
};
// ======================
// Today's Appointments
// ======================
export const todayAppointments = [
  { patient: "Anita Menon", doctor: "Dr. Elva Thomas", centre: "Kochi" },
  { patient: "Rahul Nair", doctor: "Dr. Linnie Nelson", centre: "Bangalore" },
  { patient: "Suresh Iyer", doctor: "Dr. Ranjit Singh", centre: "Mumbai" },
  { patient: "Meera Joseph", doctor: "Dr. Nyla Gupta", centre: "Kochi" },
  { patient: "Arjun Rao", doctor: "Dr. Dev Patel", centre: "Bangalore" },
];

// ======================
// Upcoming Appointments
// ======================
export const upcomingAppointments = [
  { patient: "Kavya Nair", doctor: "Dr. Elva Thomas", centre: "Mumbai" },
  { patient: "Rohit Menon", doctor: "Dr. Ajith Kumar", centre: "Kochi" },
  { patient: "Divya Iyer", doctor: "Dr. Angel Thomas", centre: "Bangalore" },
  { patient: "Neha Sharma", doctor: "Dr. Linnie Nelson", centre: "Mumbai" },
  { patient: "Vikram Singh", doctor: "Dr. Ranjit Singh", centre: "Kochi" },
  { patient: "Sneha Pillai", doctor: "Dr. Nyla Gupta", centre: "Bangalore" },
];

// ======================
// Doctor Availability
// ======================
export const doctorAvailability = [
  { name: "Dr. Elva Thomas", centre: "Kochi", status: "Available" },
  { name: "Dr. Linnie Nelson", centre: "Bangalore", status: "Unavailable" },
  { name: "Dr. Ranjit Singh", centre: "Mumbai", status: "Available" },
  { name: "Dr. Nyla Gupta", centre: "Kochi", status: "Available" },
  { name: "Dr. Dev Patel", centre: "Bangalore", status: "Unavailable" },
  { name: "Dr. Ajith Kumar", centre: "Mumbai", status: "Available" },
];

// src/data.ts
export type Specialization =
  | "Adult Psychiatrist"
  | "Child Psychiatrist"
  | "Psychologist"
  | "Couple Psychologist";

export interface Doctor {
  name: string;
  specialization: Specialization;
  availability: boolean;
  nextAvailableTime?: string;
}

export interface Centre {
  name: string;
  doctors: Doctor[];
}

export interface Location {
  name: string;
  centres: Centre[];
}

export const locations: Location[] = [
  {
    name: "Kochi",
    centres: [
      {
        name: "Centre 1",
        doctors: [
          {
            name: "Dr. Ranjit Singh",
            specialization: "Adult Psychiatrist",
            availability: true,
            nextAvailableTime: "10:30 AM",
          },
          {
            name: "Dr. Neha Sharma",
            specialization: "Child Psychiatrist",
            availability: false,
          },
          {
            name: "Dr. Ajay Menon",
            specialization: "Psychologist",
            availability: true,
            nextAvailableTime: "2:00 PM",
          },
          {
            name: "Dr. Sneha Pillai",
            specialization: "Couple Psychologist",
            availability: false,
          },
          {
            name: "Dr. Kiran Nair",
            specialization: "Adult Psychiatrist",
            availability: true,
            nextAvailableTime: "4:15 PM",
          },
        ],
      },
      {
        name: "Centre 2",
        doctors: [
          {
            name: "Dr. Anjali Varma",
            specialization: "Psychologist",
            availability: true,
            nextAvailableTime: "11:45 AM",
          },
          {
            name: "Dr. Rohit Nair",
            specialization: "Adult Psychiatrist",
            availability: false,
          },
          {
            name: "Dr. Kavya Rao",
            specialization: "Child Psychiatrist",
            availability: true,
            nextAvailableTime: "3:30 PM",
          },
          {
            name: "Dr. Dev Patel",
            specialization: "Couple Psychologist",
            availability: false,
          },
          {
            name: "Dr. Priya Suresh",
            specialization: "Adult Psychiatrist",
            availability: true,
            nextAvailableTime: "1:00 PM",
          },
        ],
      },
      {
        name: "Centre 3",
        doctors: [
          {
            name: "Dr. Elva Thomas",
            specialization: "Adult Psychiatrist",
            availability: true,
            nextAvailableTime: "9:15 AM",
          },
          {
            name: "Dr. Arjun Rao",
            specialization: "Psychologist",
            availability: false,
          },
          {
            name: "Dr. Lina Kurian",
            specialization: "Child Psychiatrist",
            availability: true,
            nextAvailableTime: "12:45 PM",
          },
          {
            name: "Dr. Sunil Bhat",
            specialization: "Couple Psychologist",
            availability: true,
            nextAvailableTime: "5:00 PM",
          },
          {
            name: "Dr. Maria Joseph",
            specialization: "Psychologist",
            availability: false,
          },
        ],
      },
    ],
  },
  {
    name: "Bangalore",
    centres: [
      {
        name: "Centre 1",
        doctors: [
          {
            name: "Dr. Vikram Singh",
            specialization: "Adult Psychiatrist",
            availability: true,
            nextAvailableTime: "11:00 AM",
          },
          {
            name: "Dr. Nisha Iyer",
            specialization: "Child Psychiatrist",
            availability: false,
          },
          {
            name: "Dr. Ajith Kumar",
            specialization: "Couple Psychologist",
            availability: true,
            nextAvailableTime: "2:30 PM",
          },
          {
            name: "Dr. Shruti Menon",
            specialization: "Psychologist",
            availability: true,
            nextAvailableTime: "4:00 PM",
          },
          {
            name: "Dr. Rajeev Pillai",
            specialization: "Adult Psychiatrist",
            availability: false,
          },
        ],
      },
      {
        name: "Centre 2",
        doctors: [
          {
            name: "Dr. Aditi Sharma",
            specialization: "Child Psychiatrist",
            availability: true,
            nextAvailableTime: "1:15 PM",
          },
          {
            name: "Dr. Manoj Varghese",
            specialization: "Psychologist",
            availability: false,
          },
          {
            name: "Dr. Sneha Rao",
            specialization: "Couple Psychologist",
            availability: true,
            nextAvailableTime: "3:45 PM",
          },
          {
            name: "Dr. Abhay Patil",
            specialization: "Adult Psychiatrist",
            availability: false,
          },
          {
            name: "Dr. Pooja Reddy",
            specialization: "Psychologist",
            availability: true,
            nextAvailableTime: "5:30 PM",
          },
        ],
      },
      {
        name: "Centre 3",
        doctors: [
          {
            name: "Dr. Sanjay Nair",
            specialization: "Adult Psychiatrist",
            availability: true,
            nextAvailableTime: "10:00 AM",
          },
          {
            name: "Dr. Kavitha Menon",
            specialization: "Couple Psychologist",
            availability: false,
          },
          {
            name: "Dr. Pradeep Rao",
            specialization: "Child Psychiatrist",
            availability: true,
            nextAvailableTime: "12:30 PM",
          },
          {
            name: "Dr. Meera Gupta",
            specialization: "Psychologist",
            availability: false,
          },
          {
            name: "Dr. Deepak Pillai",
            specialization: "Adult Psychiatrist",
            availability: true,
            nextAvailableTime: "6:00 PM",
          },
        ],
      },
    ],
  },
  {
    name: "Mumbai",
    centres: [
      {
        name: "Centre 1",
        doctors: [
          {
            name: "Dr. Ananya Kapoor",
            specialization: "Psychologist",
            availability: true,
            nextAvailableTime: "9:45 AM",
          },
          {
            name: "Dr. Kunal Deshmukh",
            specialization: "Child Psychiatrist",
            availability: false,
          },
          {
            name: "Dr. Ritu Singh",
            specialization: "Couple Psychologist",
            availability: true,
            nextAvailableTime: "2:15 PM",
          },
          {
            name: "Dr. Sameer Joshi",
            specialization: "Adult Psychiatrist",
            availability: true,
            nextAvailableTime: "4:30 PM",
          },
          {
            name: "Dr. Aparna Mehta",
            specialization: "Psychologist",
            availability: false,
          },
        ],
      },
      {
        name: "Centre 2",
        doctors: [
          {
            name: "Dr. Neeraj Sharma",
            specialization: "Adult Psychiatrist",
            availability: true,
            nextAvailableTime: "11:30 AM",
          },
          {
            name: "Dr. Kavita Iyer",
            specialization: "Child Psychiatrist",
            availability: false,
          },
          {
            name: "Dr. Rohan Patel",
            specialization: "Psychologist",
            availability: true,
            nextAvailableTime: "1:45 PM",
          },
          {
            name: "Dr. Snehal Shah",
            specialization: "Couple Psychologist",
            availability: false,
          },
          {
            name: "Dr. Ajay Kulkarni",
            specialization: "Adult Psychiatrist",
            availability: true,
            nextAvailableTime: "3:00 PM",
          },
        ],
      },
      {
        name: "Centre 3",
        doctors: [
          {
            name: "Dr. Devika Nair",
            specialization: "Psychologist",
            availability: true,
            nextAvailableTime: "10:15 AM",
          },
          {
            name: "Dr. Ramesh Bhat",
            specialization: "Adult Psychiatrist",
            availability: false,
          },
          {
            name: "Dr. Smita Desai",
            specialization: "Child Psychiatrist",
            availability: true,
            nextAvailableTime: "12:00 PM",
          },
          {
            name: "Dr. Vijay Rao",
            specialization: "Couple Psychologist",
            availability: true,
            nextAvailableTime: "5:15 PM",
          },
          {
            name: "Dr. Pallavi Joshi",
            specialization: "Psychologist",
            availability: false,
          },
        ],
      },
    ],
  },
];
