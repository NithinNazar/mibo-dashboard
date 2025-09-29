// src/pages/BookSlotPage.tsx
import React, { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import seedrandom from "seedrandom";
import "react-datepicker/dist/react-datepicker.css";
import "./BookSlotPage.scss";

type Slot = {
  id: string;
  time: string;
  patientName?: string;
  status: "booked" | "cancelled" | "postponed";
  date: string;
  sessionLength: number;
};

type Doctor = {
  id: string;
  name: string;
  slots: Slot[];
};

type Centre = {
  id: string;
  name: string;
  doctors: Doctor[];
};

type Props = {
  doctorName?: string; // only for doctor
};

function makeId(prefix = "") {
  return (
    prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
  );
}

const TODAY = format(new Date(), "yyyy-MM-dd");

// --- Dummy doctors and slots ---
const DOCTORS = [
  "Dr. Meera Nair",
  "Dr. Arun Menon",
  "Dr. Kavya Suresh",
  "Dr. Raghav Pillai",
];

const DUMMY_SLOTS: string[][] = [
  ["09:00 - 09:30", "11:00 - 11:30"],
  ["10:00 - 10:30", "12:00 - 12:30"],
  ["09:15 - 09:45", "13:00 - 13:30"],
  ["14:00 - 14:30", "15:15 - 15:45"],
];

function generateRandomSlots(seed: string, sessionLength: number): string[] {
  const rng = seedrandom(seed);
  const slots: string[] = [];
  let hour = 8;
  while (hour < 19) {
    const minute = rng() < 0.5 ? 0 : 30;
    const endH = hour + Math.floor((minute + sessionLength) / 60);
    const endM = (minute + sessionLength) % 60;
    if (endH >= 19) break;
    const timeStr = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")} - ${endH.toString().padStart(2, "0")}:${endM
      .toString()
      .padStart(2, "0")}`;
    slots.push(timeStr);
    hour = endH + (rng() < 0.5 ? 0 : 1);
    if (slots.length >= 5) break;
  }
  return slots;
}

export default function BookSlotPage({ doctorName }: Props) {
  const user = JSON.parse(localStorage.getItem("user") || "null") as {
    name?: string;
    role?: string;
  } | null;
  const isDoctor = !!doctorName;
  const isAdmin = user?.role === "Admin";

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const selectedDateKey = useMemo(
    () => (selectedDate ? format(selectedDate, "yyyy-MM-dd") : TODAY),
    [selectedDate]
  );
  const selectedDateLabel = useMemo(
    () => (selectedDate ? format(selectedDate, "EEE, MMM d yyyy") : "No date"),
    [selectedDate]
  );

  // --- Initialize centres with doctors and dummy slots ---
  const [centres, setCentres] = useState<Centre[]>(() => [
    {
      id: makeId("centre_"),
      name: "Kochi",
      doctors: DOCTORS.map((d, i) => ({
        id: makeId("doc_"),
        name: d,
        slots: DUMMY_SLOTS[i].map((t) => ({
          id: makeId("slot_"),
          time: t,
          date: TODAY,
          status: "booked",
          sessionLength: 30,
        })),
      })),
    },
  ]);

  // --- Admin booking modal state ---
  const [isBookingOpen, setBookingOpen] = useState(false);
  const [bookingCentreId, setBookingCentreId] = useState<string | null>(null);
  const [bookingDoctorId, setBookingDoctorId] = useState<string | null>(null);
  const [bookingTime, setBookingTime] = useState("");
  const [bookingPatientName, setBookingPatientName] = useState("");
  const [bookingSessionLength, setBookingSessionLength] = useState(30);

  // --- Admin slot actions ---
  const [activeSlot, setActiveSlot] = useState<Slot | null>(null);
  const [isPostponeOpen, setPostponeOpen] = useState(false);
  const [postponeDate, setPostponeDate] = useState<Date | null>(new Date());
  const [postponeTime, setPostponeTime] = useState("");
  const [postponeSessionLength, setPostponeSessionLength] = useState(30);

  // --- Filter centres for doctor ---
  const visibleCentres = useMemo(() => {
    if (!isDoctor) return centres;
    return centres
      .map((c) => ({
        ...c,
        doctors: c.doctors.filter((d) => d.name === doctorName),
      }))
      .filter((c) => c.doctors.length > 0);
  }, [centres, doctorName]);

  // --- Get slots for doctor & date ---
  const getSlotsForDoctor = (d: Doctor, dateKey: string): Slot[] => {
    const existing = d.slots.filter((s) => s.date === dateKey);
    if (existing.length) return existing;
    const dummyTimes = generateRandomSlots(`${d.id}_${dateKey}`, 30);
    return dummyTimes.map((t) => ({
      id: makeId("slot_"),
      time: t,
      date: dateKey,
      status: "booked",
      sessionLength: 30,
    }));
  };

  // --- Admin handlers ---
  const openBookingModal = (centreId: string) => {
    setBookingCentreId(centreId);
    const centre = centres.find((c) => c.id === centreId);
    setBookingDoctorId(centre?.doctors[0]?.id ?? null);
    setBookingTime("");
    setBookingPatientName("");
    setBookingSessionLength(30);
    setBookingOpen(true);
  };

  const handleConfirmBooking = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!bookingCentreId || !bookingDoctorId || !bookingTime)
      return alert("Please select doctor and time.");

    const newSlot: Slot = {
      id: makeId("slot_"),
      time: bookingTime,
      patientName: bookingPatientName || undefined,
      date: selectedDateKey,
      status: "booked",
      sessionLength: bookingSessionLength,
    };

    setCentres((prev) =>
      prev.map((c) =>
        c.id === bookingCentreId
          ? {
              ...c,
              doctors: c.doctors.map((d) =>
                d.id === bookingDoctorId
                  ? { ...d, slots: [...d.slots, newSlot] }
                  : d
              ),
            }
          : c
      )
    );

    setBookingOpen(false);
  };

  const handleCancel = (s: Slot) => {
    if (!window.confirm("Are you sure you want to cancel this slot?")) return;
    setCentres((prev) =>
      prev.map((c) => ({
        ...c,
        doctors: c.doctors.map((d) => ({
          ...d,
          slots: d.slots.map((slot) =>
            slot.id === s.id ? { ...slot, status: "cancelled" } : slot
          ),
        })),
      }))
    );
    setActiveSlot(null);
  };

  const openPostpone = (s: Slot) => {
    setActiveSlot(s);
    setPostponeOpen(true);
    setPostponeDate(new Date());
    setPostponeTime(s.time);
    setPostponeSessionLength(s.sessionLength || 30);
  };

  const confirmPostpone = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!activeSlot || !postponeDate || !postponeTime) return;

    const newDateKey = format(postponeDate, "yyyy-MM-dd");
    setCentres((prev) =>
      prev.map((c) => ({
        ...c,
        doctors: c.doctors.map((d) => ({
          ...d,
          slots: d.slots.map((slot) =>
            slot.id === activeSlot.id
              ? {
                  ...slot,
                  date: newDateKey,
                  time: postponeTime,
                  sessionLength: postponeSessionLength,
                  status: "postponed",
                }
              : slot
          ),
        })),
      }))
    );

    setPostponeOpen(false);
    setActiveSlot(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const renderCentre = (c: Centre) => (
    <div className="centre-card card" key={c.id}>
      <div className="centre-header">
        <h3>{c.name}</h3>
        {isAdmin && (
          <button
            className="btn-primary"
            onClick={() => openBookingModal(c.id)}
          >
            Book Slot
          </button>
        )}
      </div>
      <div className="doctors-list">
        {c.doctors.map((d) => {
          const slots = getSlotsForDoctor(d, selectedDateKey);
          return (
            <div className="doctor-row" key={d.id}>
              <div className="doctor-meta">{d.name}</div>
              <div className="slots">
                {slots.length === 0 ? (
                  <div className="no-slots">No bookings</div>
                ) : (
                  slots.map((s) => (
                    <div
                      className={`slot-pill ${s.status}`}
                      key={s.id}
                      onClick={() => {
                        if (isAdmin)
                          setActiveSlot(activeSlot?.id === s.id ? null : s);
                      }}
                    >
                      <span className="slot-time">{s.time}</span>
                      {s.patientName && (
                        <span className="slot-patient"> — {s.patientName}</span>
                      )}
                      {s.status === "cancelled" && (
                        <span className="slot-tag">Cancelled</span>
                      )}
                      {s.status === "postponed" && (
                        <span className="slot-tag">Postponed</span>
                      )}
                      {isAdmin && activeSlot?.id === s.id && (
                        <div className="slot-actions">
                          <button
                            className="btn-action cancel"
                            onClick={() => handleCancel(s)}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn-action postpone"
                            onClick={() => openPostpone(s)}
                          >
                            Postpone
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="book-slot-page">
      <div className="page-header">
        <h1>Book Slots</h1>
        <div className="date-picker-wrap">
          <label className="small-label">Select Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(d) => setSelectedDate(d)}
            minDate={new Date()}
            dateFormat="dd MMM yyyy"
            className="date-input"
          />
          <div className="selected-date">
            Selected: <strong>{selectedDateLabel}</strong>
          </div>
        </div>
        <div className="header-right">
          {user && (
            <div className="logged-in-info">
              <span className="small">Logged in as </span>
              <strong>{user.name}</strong>
              <button
                className="btn btn-logout small-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="centres-container">
        {visibleCentres.map(renderCentre)}
      </div>

      {/* Admin booking modal */}
      {isBookingOpen && bookingCentreId && (
        <div className="modal-backdrop" onClick={() => setBookingOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Book Slot</h3>
            <form onSubmit={handleConfirmBooking}>
              <div className="form-row">
                <label>Doctor</label>
                <select
                  value={bookingDoctorId ?? ""}
                  onChange={(e) => setBookingDoctorId(e.target.value)}
                >
                  {centres
                    .find((c) => c.id === bookingCentreId)
                    ?.doctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-row">
                <label>Time</label>
                <input
                  type="text"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  placeholder="14:00 - 14:30"
                />
              </div>
              <div className="form-row">
                <label>Patient Name</label>
                <input
                  type="text"
                  value={bookingPatientName}
                  onChange={(e) => setBookingPatientName(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>Session Length</label>
                <select
                  value={bookingSessionLength}
                  onChange={(e) =>
                    setBookingSessionLength(Number(e.target.value))
                  }
                >
                  <option value={30}>30 mins</option>
                  <option value={45}>45 mins</option>
                  <option value={60}>1 hr</option>
                </select>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setBookingOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin postpone modal */}
      {isPostponeOpen && activeSlot && (
        <div className="modal-backdrop" onClick={() => setPostponeOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Postpone Slot</h3>
            <form onSubmit={confirmPostpone}>
              <div className="form-row">
                <label>New Date</label>
                <DatePicker
                  selected={postponeDate}
                  onChange={(d) => setPostponeDate(d)}
                  minDate={new Date()}
                  dateFormat="dd MMM yyyy"
                  className="date-input"
                />
              </div>
              <div className="form-row">
                <label>New Time</label>
                <input
                  type="text"
                  value={postponeTime}
                  onChange={(e) => setPostponeTime(e.target.value)}
                  placeholder="14:00 - 14:30"
                />
              </div>
              <div className="form-row">
                <label>Session Length</label>
                <select
                  value={postponeSessionLength}
                  onChange={(e) =>
                    setPostponeSessionLength(Number(e.target.value))
                  }
                >
                  <option value={30}>30 mins</option>
                  <option value={45}>45 mins</option>
                  <option value={60}>1 hr</option>
                </select>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setPostponeOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// // src/pages/BookSlotPage.tsx
// import React, { useMemo, useState } from "react";
// import DatePicker from "react-datepicker";
// import { format } from "date-fns";
// import "react-datepicker/dist/react-datepicker.css";
// import "./BookSlotPage.scss";
// import seedrandom from "seedrandom";

// type Slot = {
//   id: string;
//   time: string;
//   patientName?: string;
//   status: "booked" | "cancelled" | "postponed";
//   date: string;
//   sessionLength: number;
// };

// type Doctor = {
//   id: string;
//   name: string;
//   slots: Slot[];
// };

// type Centre = {
//   id: string;
//   name: string;
//   doctors: Doctor[];
// };

// function makeId(prefix = "") {
//   return (
//     prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
//   );
// }

// const KOCHI_DOCTORS = [
//   "Dr. Meera Nair",
//   "Dr. Arun Menon",
//   "Dr. Kavya Suresh",
//   "Dr. Raghav Pillai",
//   "Dr. Sneha Thomas",
//   "Dr. Devika George",
//   "Dr. Ajay Varma",
// ];
// const BANGALORE_DOCTORS = [
//   "Dr. Priya Iyer",
//   "Dr. Karthik Rao",
//   "Dr. Shalini Gupta",
//   "Dr. Vivek Reddy",
//   "Dr. Ananya Sharma",
//   "Dr. Manish Jain",
//   "Dr. Rohit Shetty",
// ];
// const MUMBAI_DOCTORS = [
//   "Dr. Neha Desai",
//   "Dr. Rajiv Kapoor",
//   "Dr. Sunita Mehta",
//   "Dr. Arjun Khanna",
//   "Dr. Alisha Patel",
//   "Dr. Sameer Joshi",
//   "Dr. Pooja Bhatia",
// ];

// const TODAY = format(new Date(), "yyyy-MM-dd");

// const DUMMY_SLOTS: Record<string, string[][]> = {
//   kochi: [
//     ["09:00 - 09:30", "11:00 - 11:30", "13:30 - 14:00"],
//     ["10:15 - 10:45", "12:00 - 12:30"],
//     ["09:00 - 09:30", "11:15 - 11:45"],
//     ["13:00 - 13:30", "15:15 - 15:45"],
//     ["09:30 - 10:00", "12:00 - 12:30"],
//     ["12:00 - 12:30", "14:15 - 14:45"],
//     ["08:30 - 09:00", "10:30 - 11:00"],
//   ],
//   bangalore: [
//     ["09:30 - 10:00", "12:00 - 12:30"],
//     ["11:15 - 11:45", "13:00 - 13:30"],
//     ["15:00 - 15:30", "16:15 - 16:45"],
//     ["10:45 - 11:15", "12:30 - 13:00"],
//     ["14:30 - 15:00", "16:00 - 16:30"],
//     ["13:30 - 14:00", "15:15 - 15:45"],
//     ["17:30 - 18:00", "09:00 - 09:30"],
//   ],
//   mumbai: [
//     ["10:00 - 10:30", "12:15 - 12:45"],
//     ["09:15 - 09:45", "11:00 - 11:30"],
//     ["11:30 - 12:00", "13:00 - 13:30"],
//     ["15:45 - 16:15", "17:00 - 17:30"],
//     ["14:00 - 14:30", "16:30 - 17:00"],
//     ["13:00 - 13:30", "15:15 - 15:45"],
//     ["17:15 - 17:45", "10:30 - 11:00"],
//   ],
// };

// function generateRandomSlots(seed: string, sessionLength: number): string[] {
//   const rng = seedrandom(seed);
//   const slots: string[] = [];
//   let currentHour = 8;
//   const endHour = 19;

//   while (currentHour < endHour) {
//     const minute = rng() < 0.5 ? 0 : 30;
//     const totalMinutes = minute + sessionLength;
//     const endH = currentHour + Math.floor(totalMinutes / 60);
//     const endM = totalMinutes % 60;
//     if (endH >= endHour) break;
//     const formatTime = (h: number, m: number) =>
//       `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
//     const timeStr = `${formatTime(currentHour, minute)} - ${formatTime(
//       endH,
//       endM
//     )}`;
//     if (!slots.includes(timeStr)) slots.push(timeStr);
//     currentHour = endH + (rng() < 0.5 ? 0 : 1);
//     if (slots.length >= 5) break;
//   }

//   return slots;
// }

// export default function BookSlotPage(): JSX.Element {
//   const user = JSON.parse(localStorage.getItem("user") || "null") as {
//     role?: string;
//     name?: string;
//   } | null;
//   const isDoctor = user?.role === "Doctor";

//   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

//   // Centres initialised once
//   const [centres, setCentres] = useState<Centre[]>(() => {
//     const buildCentre = (
//       name: string,
//       doctorNames: string[],
//       slotKey: keyof typeof DUMMY_SLOTS
//     ): Centre => ({
//       id: makeId("centre_"),
//       name,
//       doctors: doctorNames.map((doc, idx) => ({
//         id: makeId("doc_"),
//         name: doc,
//         slots: (DUMMY_SLOTS[slotKey][idx] ?? []).map((time) => ({
//           id: makeId("slot_"),
//           time,
//           date: TODAY,
//           status: "booked" as const,
//           sessionLength: 30,
//         })),
//       })),
//     });

//     return [
//       buildCentre("Kochi", KOCHI_DOCTORS, "kochi"),
//       buildCentre("Bangalore", BANGALORE_DOCTORS, "bangalore"),
//       buildCentre("Mumbai", MUMBAI_DOCTORS, "mumbai"),
//     ];
//   });

//   // Booking modal state (admin only)
//   const [isBookingOpen, setBookingOpen] = useState(false);
//   const [bookingCentreId, setBookingCentreId] = useState<string | null>(null);
//   const [bookingDoctorId, setBookingDoctorId] = useState<string | null>(null);
//   const [bookingTime, setBookingTime] = useState<string>("");
//   const [bookingPatientName, setBookingPatientName] = useState<string>("");
//   const [bookingSessionLength, setBookingSessionLength] = useState<number>(30);

//   // Active slot (for showing actions) and postpone modal
//   const [activeSlot, setActiveSlot] = useState<Slot | null>(null);
//   const [isPostponeOpen, setPostponeOpen] = useState(false);
//   const [postponeDate, setPostponeDate] = useState<Date | null>(new Date());
//   const [postponeTime, setPostponeTime] = useState<string>("");
//   const [postponeSessionLength, setPostponeSessionLength] =
//     useState<number>(30);

//   const selectedDateKey = useMemo(
//     () => (selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""),
//     [selectedDate]
//   );
//   const selectedDateLabel = useMemo(
//     () => (selectedDate ? format(selectedDate, "EEE, MMM d yyyy") : "No date"),
//     [selectedDate]
//   );

//   // Filter centres for doctor -> only centres where doctor exists
//   const visibleCentres = useMemo(() => {
//     if (!isDoctor) return centres;
//     return centres
//       .map((c) => ({
//         ...c,
//         doctors: c.doctors.filter((d) => d.name === user?.name),
//       }))
//       .filter((c) => c.doctors.length > 0);
//   }, [centres, isDoctor, user?.name]);

//   // --- Booking handlers (Admin only) ---
//   function openBookingModal(centreId: string) {
//     setBookingCentreId(centreId);
//     const centre = centres.find((c) => c.id === centreId);
//     setBookingDoctorId(centre?.doctors[0]?.id ?? null);
//     setBookingTime("");
//     setBookingPatientName("");
//     setBookingSessionLength(30);
//     setBookingOpen(true);
//   }
//   function closeBookingModal() {
//     setBookingOpen(false);
//     setBookingCentreId(null);
//     setBookingDoctorId(null);
//   }
//   function handleConfirmBooking(e?: React.FormEvent) {
//     e?.preventDefault();
//     if (!bookingCentreId || !bookingDoctorId || !bookingTime) {
//       alert("Please choose doctor and time.");
//       return;
//     }

//     const newSlot: Slot = {
//       id: makeId("slot_"),
//       time: bookingTime,
//       patientName: bookingPatientName || undefined,
//       date: selectedDateKey || TODAY,
//       status: "booked",
//       sessionLength: bookingSessionLength,
//     };

//     setCentres((prev) =>
//       prev.map((c) =>
//         c.id === bookingCentreId
//           ? {
//               ...c,
//               doctors: c.doctors.map((d) =>
//                 d.id === bookingDoctorId
//                   ? { ...d, slots: [...d.slots, newSlot] }
//                   : d
//               ),
//             }
//           : c
//       )
//     );

//     closeBookingModal();
//   }

//   // --- Cancel / Postpone (Admin only) ---
//   function handleCancel(slot: Slot) {
//     setCentres((prev) =>
//       prev.map((c) => ({
//         ...c,
//         doctors: c.doctors.map((d) => ({
//           ...d,
//           slots: d.slots.map((s) =>
//             s.id === slot.id ? { ...s, status: "cancelled" } : s
//           ),
//         })),
//       }))
//     );
//     setActiveSlot(null);
//   }

//   function openPostpone(slot: Slot) {
//     setActiveSlot(slot);
//     setPostponeOpen(true);
//     setPostponeDate(new Date());
//     setPostponeTime(slot.time);
//     setPostponeSessionLength(slot.sessionLength || 30);
//   }

//   function confirmPostpone(e?: React.FormEvent) {
//     e?.preventDefault();
//     if (!activeSlot || !postponeDate || !postponeTime) return;
//     const newDateKey = format(postponeDate, "yyyy-MM-dd");

//     setCentres((prev) =>
//       prev.map((c) => ({
//         ...c,
//         doctors: c.doctors.map((d) => ({
//           ...d,
//           slots: d.slots.map((s) =>
//             s.id === activeSlot.id
//               ? {
//                   ...s,
//                   time: postponeTime,
//                   date: newDateKey,
//                   status: "postponed",
//                   sessionLength: postponeSessionLength,
//                 }
//               : s
//           ),
//         })),
//       }))
//     );

//     setPostponeOpen(false);
//     setActiveSlot(null);
//   }

//   // --- Slot retrieval / dummy generator ---
//   function getSlotsForDoctor(d: Doctor, dateKey: string): Slot[] {
//     if (dateKey === TODAY) return d.slots;

//     const existing = d.slots.filter((s) => s.date === dateKey);
//     if (existing.length > 0) return existing;

//     const dummyTimes = generateRandomSlots(`${d.id}_${dateKey}`, 30);
//     return dummyTimes.map<Slot>((time) => ({
//       id: makeId("slot_"),
//       time,
//       date: dateKey,
//       status: "booked",
//       sessionLength: 30,
//     }));
//   }

//   function renderCentre(c: Centre) {
//     return (
//       <div className="centre-card card" key={c.id}>
//         <div className="centre-header">
//           <h3>{c.name}</h3>
//           {!isDoctor && (
//             <button
//               className="btn btn-primary"
//               onClick={() => openBookingModal(c.id)}
//             >
//               Book Slot
//             </button>
//           )}
//         </div>

//         <div className="doctors-list">
//           {c.doctors.map((d) => {
//             const slots = getSlotsForDoctor(d, selectedDateKey);
//             return (
//               <div className="doctor-row" key={d.id}>
//                 <div className="doctor-meta">
//                   <div className="doctor-name">{d.name}</div>
//                 </div>
//                 <div className="slots">
//                   {slots.length === 0 ? (
//                     <div className="no-slots">No bookings for this doctor</div>
//                   ) : (
//                     <>
//                       <div className="slots-label">Booked Slots:</div>
//                       {slots.map((s) => (
//                         <div
//                           className={`slot-pill ${s.status}`}
//                           key={s.id}
//                           onClick={() => {
//                             // toggle active slot only for admins
//                             if (!isDoctor)
//                               setActiveSlot(activeSlot?.id === s.id ? null : s);
//                           }}
//                         >
//                           <span className="slot-time">{s.time}</span>
//                           {s.patientName && (
//                             <span className="slot-patient">
//                               {" "}
//                               — {s.patientName} ({s.sessionLength} mins)
//                             </span>
//                           )}
//                           {s.status === "cancelled" && (
//                             <span className="slot-tag">Cancelled</span>
//                           )}
//                           {s.status === "postponed" && (
//                             <span className="slot-tag">Postponed</span>
//                           )}

//                           {/* Admin-only actions shown when this slot is active */}
//                           {!isDoctor && activeSlot?.id === s.id && (
//                             <div className="slot-actions">
//                               <button
//                                 className="btn-action cancel"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleCancel(s);
//                                 }}
//                               >
//                                 Cancel
//                               </button>
//                               <button
//                                 className="btn-action postpone"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   openPostpone(s);
//                                 }}
//                               >
//                                 Postpone
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }

//   // --- Logout helper (for DoctorLayout top button already exists; we keep this here optional) ---
//   function handleLogout() {
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   }

//   return (
//     <div className="book-slot-page">
//       <div className="page-header">
//         <h1>Book Slots</h1>

//         <div className="date-picker-wrap">
//           <label className="small-label">Select Date</label>
//           <DatePicker
//             selected={selectedDate}
//             onChange={(d) => setSelectedDate(d)}
//             minDate={new Date()}
//             dateFormat="dd MMM yyyy"
//             className="date-input"
//           />
//           <div className="selected-date">
//             Selected: <strong>{selectedDateLabel}</strong>
//           </div>
//         </div>

//         <div className="header-right">
//           {user && (
//             <div className="logged-in-info">
//               <span className="small">Logged in as </span>
//               <strong>{user.name}</strong>
//               <button
//                 className="btn btn-logout small-logout"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="centres-container">
//         {visibleCentres.map((c) => renderCentre(c))}
//       </div>

//       {/* Booking Modal (Admin only) */}
//       {isBookingOpen && bookingCentreId && (
//         <div className="modal-backdrop" onClick={closeBookingModal}>
//           <div className="modal" onClick={(ev) => ev.stopPropagation()}>
//             <h3>Book Slot</h3>
//             <form onSubmit={handleConfirmBooking}>
//               <div className="form-row">
//                 <label>Doctor</label>
//                 <select
//                   value={bookingDoctorId ?? ""}
//                   onChange={(e) => setBookingDoctorId(e.target.value)}
//                 >
//                   {centres
//                     .find((c) => c.id === bookingCentreId)!
//                     .doctors.map((d) => (
//                       <option key={d.id} value={d.id}>
//                         {d.name}
//                       </option>
//                     ))}
//                 </select>
//               </div>

//               <div className="form-row">
//                 <label>Time</label>
//                 <input
//                   type="text"
//                   value={bookingTime}
//                   onChange={(e) => setBookingTime(e.target.value)}
//                   placeholder="e.g. 14:00 - 14:30"
//                 />
//               </div>

//               <div className="form-row">
//                 <label>Patient name</label>
//                 <input
//                   type="text"
//                   value={bookingPatientName}
//                   onChange={(e) => setBookingPatientName(e.target.value)}
//                 />
//               </div>

//               <div className="form-row">
//                 <label>Session length</label>
//                 <select
//                   value={bookingSessionLength}
//                   onChange={(e) =>
//                     setBookingSessionLength(Number(e.target.value))
//                   }
//                 >
//                   <option value={30}>30 mins</option>
//                   <option value={45}>45 mins</option>
//                   <option value={60}>1 hr</option>
//                 </select>
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={closeBookingModal}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   Confirm
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Postpone Modal (Admin only) */}
//       {isPostponeOpen && activeSlot && (
//         <div className="modal-backdrop" onClick={() => setPostponeOpen(false)}>
//           <div className="modal" onClick={(ev) => ev.stopPropagation()}>
//             <h3>Postpone Slot</h3>
//             <form onSubmit={confirmPostpone}>
//               <div className="form-row">
//                 <label>New Date</label>
//                 <DatePicker
//                   selected={postponeDate}
//                   onChange={(d) => setPostponeDate(d)}
//                   minDate={new Date()}
//                   dateFormat="dd MMM yyyy"
//                   className="date-input"
//                 />
//               </div>

//               <div className="form-row">
//                 <label>New Time</label>
//                 <input
//                   type="text"
//                   value={postponeTime}
//                   onChange={(e) => setPostponeTime(e.target.value)}
//                   placeholder="e.g. 14:00 - 14:30"
//                 />
//               </div>

//               <div className="form-row">
//                 <label>Session length</label>
//                 <select
//                   value={postponeSessionLength}
//                   onChange={(e) =>
//                     setPostponeSessionLength(Number(e.target.value))
//                   }
//                 >
//                   <option value={30}>30 mins</option>
//                   <option value={45}>45 mins</option>
//                   <option value={60}>1 hr</option>
//                 </select>
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setPostponeOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   Confirm
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // // src/pages/BookSlotPage.tsx
// // import React, { useMemo, useState } from "react";
// // import DatePicker from "react-datepicker";
// // import { format } from "date-fns";
// // import "react-datepicker/dist/react-datepicker.css";
// // import "./BookSlotPage.scss";
// // import seedrandom from "seedrandom";

// // type Slot = {
// //   id: string;
// //   time: string;
// //   patientName?: string;
// //   status: "booked" | "cancelled" | "postponed";
// //   date: string;
// //   sessionLength: number; // in minutes
// // };

// // type Doctor = {
// //   id: string;
// //   name: string;
// //   slots: Slot[];
// // };

// // type Centre = {
// //   id: string;
// //   name: string;
// //   doctors: Doctor[];
// // };

// // function makeId(prefix = "") {
// //   return (
// //     prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
// //   );
// // }

// // // --- Dummy Data Setup ---
// // const KOCHI_DOCTORS = [
// //   "Dr. Meera Nair",
// //   "Dr. Arun Menon",
// //   "Dr. Kavya Suresh",
// //   "Dr. Raghav Pillai",
// //   "Dr. Sneha Thomas",
// //   "Dr. Devika George",
// //   "Dr. Ajay Varma",
// // ];
// // const BANGALORE_DOCTORS = [
// //   "Dr. Priya Iyer",
// //   "Dr. Karthik Rao",
// //   "Dr. Shalini Gupta",
// //   "Dr. Vivek Reddy",
// //   "Dr. Ananya Sharma",
// //   "Dr. Manish Jain",
// //   "Dr. Rohit Shetty",
// // ];
// // const MUMBAI_DOCTORS = [
// //   "Dr. Neha Desai",
// //   "Dr. Rajiv Kapoor",
// //   "Dr. Sunita Mehta",
// //   "Dr. Arjun Khanna",
// //   "Dr. Alisha Patel",
// //   "Dr. Sameer Joshi",
// //   "Dr. Pooja Bhatia",
// // ];

// // const TODAY = format(new Date(), "yyyy-MM-dd");

// // const DUMMY_SLOTS: Record<string, string[][]> = {
// //   kochi: [
// //     ["09:00 - 09:30", "11:00 - 11:30", "13:30 - 14:00"],
// //     ["10:15 - 10:45", "12:00 - 12:30"],
// //     ["09:00 - 09:30", "11:15 - 11:45"],
// //     ["13:00 - 13:30", "15:15 - 15:45"],
// //     ["09:30 - 10:00", "12:00 - 12:30"],
// //     ["12:00 - 12:30", "14:15 - 14:45"],
// //     ["08:30 - 09:00", "10:30 - 11:00"],
// //   ],
// //   bangalore: [
// //     ["09:30 - 10:00", "12:00 - 12:30"],
// //     ["11:15 - 11:45", "13:00 - 13:30"],
// //     ["15:00 - 15:30", "16:15 - 16:45"],
// //     ["10:45 - 11:15", "12:30 - 13:00"],
// //     ["14:30 - 15:00", "16:00 - 16:30"],
// //     ["13:30 - 14:00", "15:15 - 15:45"],
// //     ["17:30 - 18:00", "09:00 - 09:30"],
// //   ],
// //   mumbai: [
// //     ["10:00 - 10:30", "12:15 - 12:45"],
// //     ["09:15 - 09:45", "11:00 - 11:30"],
// //     ["11:30 - 12:00", "13:00 - 13:30"],
// //     ["15:45 - 16:15", "17:00 - 17:30"],
// //     ["14:00 - 14:30", "16:30 - 17:00"],
// //     ["13:00 - 13:30", "15:15 - 15:45"],
// //     ["17:15 - 17:45", "10:30 - 11:00"],
// //   ],
// // };

// // // --- Generate random slots for dummy ---
// // function generateRandomSlots(seed: string, sessionLength: number): string[] {
// //   const rng = seedrandom(seed);
// //   const slots: string[] = [];
// //   const startHour = 8;
// //   const endHour = 19;

// //   let currentHour = startHour;
// //   while (currentHour < endHour) {
// //     const minute = rng() < 0.5 ? 0 : 30;
// //     const totalMinutes = minute + sessionLength;
// //     const endH = currentHour + Math.floor(totalMinutes / 60);
// //     const endM = totalMinutes % 60;
// //     if (endH >= endHour) break;

// //     const formatTime = (h: number, m: number) =>
// //       `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;

// //     const timeStr = `${formatTime(currentHour, minute)} - ${formatTime(
// //       endH,
// //       endM
// //     )}`;
// //     if (!slots.includes(timeStr)) slots.push(timeStr);

// //     currentHour = endH + (rng() < 0.5 ? 0 : 1);
// //     if (slots.length >= 5) break;
// //   }

// //   return slots;
// // }

// // export default function BookSlotPage() {
// //   const user = JSON.parse(localStorage.getItem("user") || "null");
// //   const isDoctor = user?.role === "Doctor";

// //   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

// //   const [centres, setCentres] = useState<Centre[]>(() => {
// //     const buildCentre = (
// //       name: string,
// //       doctorNames: string[],
// //       slotKey: keyof typeof DUMMY_SLOTS
// //     ): Centre => ({
// //       id: makeId("centre_"),
// //       name,
// //       doctors: doctorNames.map((doc, idx) => ({
// //         id: makeId("doc_"),
// //         name: doc,
// //         slots: DUMMY_SLOTS[slotKey][idx].map((time) => ({
// //           id: makeId("slot_"),
// //           time,
// //           date: TODAY,
// //           status: "booked" as const,
// //           sessionLength: 30,
// //         })),
// //       })),
// //     });

// //     return [
// //       buildCentre("Kochi", KOCHI_DOCTORS, "kochi"),
// //       buildCentre("Bangalore", BANGALORE_DOCTORS, "bangalore"),
// //       buildCentre("Mumbai", MUMBAI_DOCTORS, "mumbai"),
// //     ];
// //   });

// //   const selectedDateKey = useMemo(
// //     () => (selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""),
// //     [selectedDate]
// //   );

// //   function getSlotsForDoctor(d: Doctor, dateKey: string): Slot[] {
// //     if (dateKey === TODAY) return d.slots;

// //     const existing = d.slots.filter((s) => s.date === dateKey);
// //     if (existing.length > 0) return existing;

// //     const dummyTimes = generateRandomSlots(`${d.id}_${dateKey}`, 30);
// //     return dummyTimes.map<Slot>((time) => ({
// //       id: makeId("slot_"),
// //       time,
// //       date: dateKey,
// //       status: "booked",
// //       sessionLength: 30,
// //     }));
// //   }

// //   function renderCentre(c: Centre) {
// //     let doctorsToShow = c.doctors;

// //     if (isDoctor) {
// //       doctorsToShow = doctorsToShow.filter((d) => d.name === user.name);
// //       if (doctorsToShow.length === 0) return null;
// //     }

// //     return (
// //       <div className="centre-card card" key={c.id}>
// //         <div className="centre-header">
// //           <h3>{c.name}</h3>
// //           {!isDoctor && (
// //             <button
// //               className="btn btn-primary"
// //               onClick={() => alert("Booking placeholder")}
// //             >
// //               Book Slot
// //             </button>
// //           )}
// //         </div>

// //         <div className="doctors-list">
// //           {doctorsToShow.map((d) => {
// //             const slots = getSlotsForDoctor(d, selectedDateKey);
// //             return (
// //               <div className="doctor-row" key={d.id}>
// //                 <div className="doctor-meta">
// //                   <div className="doctor-name">{d.name}</div>
// //                 </div>
// //                 <div className="slots">
// //                   {slots.length === 0 ? (
// //                     <div className="no-slots">No bookings for this doctor</div>
// //                   ) : (
// //                     <>
// //                       <div className="slots-label">Booked Slots:</div>
// //                       {slots.map((s) => (
// //                         <div className={`slot-pill ${s.status}`} key={s.id}>
// //                           <span className="slot-time">{s.time}</span>
// //                           {s.patientName && (
// //                             <span className="slot-patient">
// //                               — {s.patientName} ({s.sessionLength} mins)
// //                             </span>
// //                           )}
// //                           {s.status === "cancelled" && (
// //                             <span className="slot-tag">Cancelled</span>
// //                           )}
// //                           {s.status === "postponed" && (
// //                             <span className="slot-tag">Postponed</span>
// //                           )}
// //                         </div>
// //                       ))}
// //                     </>
// //                   )}
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="book-slot-page">
// //       <div className="page-header">
// //         <h1>Book Slots</h1>
// //         <div className="date-picker-wrap">
// //           <label className="small-label">Select Date</label>
// //           <DatePicker
// //             selected={selectedDate}
// //             onChange={(d) => setSelectedDate(d)}
// //             minDate={new Date()}
// //             dateFormat="dd MMM yyyy"
// //             className="date-input"
// //           />
// //           <div className="selected-date">
// //             Selected:{" "}
// //             <strong>
// //               {format(selectedDate || new Date(), "EEE, MMM d yyyy")}
// //             </strong>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="centres-container">
// //         {centres.map((c) => renderCentre(c))}
// //       </div>
// //     </div>
// //   );
// // }
