import React, { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./BookSlotPage.scss";

type Slot = {
  id: string;
  time: string;
  patientName?: string;
  status?: "booked" | "cancelled" | "postponed";
  date: string; // e.g. "2025-09-22"
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

function makeId(prefix = "") {
  return (
    prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
  );
}

// --- Dummy Data Setup ---
const KOCHI_DOCTORS = [
  "Dr. Meera Nair",
  "Dr. Arun Menon",
  "Dr. Kavya Suresh",
  "Dr. Raghav Pillai",
  "Dr. Sneha Thomas",
  "Dr. Devika George",
  "Dr. Ajay Varma",
];
const BANGALORE_DOCTORS = [
  "Dr. Priya Iyer",
  "Dr. Karthik Rao",
  "Dr. Shalini Gupta",
  "Dr. Vivek Reddy",
  "Dr. Ananya Sharma",
  "Dr. Manish Jain",
  "Dr. Rohit Shetty",
];
const MUMBAI_DOCTORS = [
  "Dr. Neha Desai",
  "Dr. Rajiv Kapoor",
  "Dr. Sunita Mehta",
  "Dr. Arjun Khanna",
  "Dr. Alisha Patel",
  "Dr. Sameer Joshi",
  "Dr. Pooja Bhatia",
];

const TODAY = format(new Date(), "yyyy-MM-dd");

const DUMMY_SLOTS: Record<string, string[][]> = {
  kochi: [
    ["09:00 - 09:30", "11:00 - 11:30"],
    ["10:15 - 10:45"],
    ["14:00 - 14:30"],
    ["13:00 - 13:30", "15:15 - 15:45"],
    ["16:00 - 16:30"],
    ["12:00 - 12:30"],
    ["17:00 - 17:30"],
  ],
  bangalore: [
    ["09:30 - 10:00"],
    ["11:15 - 11:45"],
    ["15:00 - 15:30", "16:15 - 16:45"],
    ["10:45 - 11:15"],
    ["14:30 - 15:00"],
    ["13:30 - 14:00"],
    ["17:30 - 18:00"],
  ],
  mumbai: [
    ["10:00 - 10:30", "12:15 - 12:45"],
    ["09:15 - 09:45"],
    ["11:30 - 12:00"],
    ["15:45 - 16:15"],
    ["14:00 - 14:30", "16:30 - 17:00"],
    ["13:00 - 13:30"],
    ["17:15 - 17:45"],
  ],
};

export default function BookSlotPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [centres, setCentres] = useState<Centre[]>(() => {
    const buildCentre = (
      name: string,
      doctorNames: string[],
      slotKey: keyof typeof DUMMY_SLOTS
    ): Centre => ({
      id: makeId("centre_"),
      name,
      doctors: doctorNames.map((doc, idx) => ({
        id: makeId("doc_"),
        name: doc,
        slots: DUMMY_SLOTS[slotKey][idx].map((time) => ({
          id: makeId("slot_"),
          time,
          date: TODAY,
          status: "booked",
        })),
      })),
    });

    return [
      buildCentre("Kochi", KOCHI_DOCTORS, "kochi"),
      buildCentre("Bangalore", BANGALORE_DOCTORS, "bangalore"),
      buildCentre("Mumbai", MUMBAI_DOCTORS, "mumbai"),
    ];
  });

  // Modal states
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalCentreId, setModalCentreId] = useState<string | null>(null);
  const [modalDoctorId, setModalDoctorId] = useState<string | null>(null);
  const [modalTime, setModalTime] = useState<string>("");
  const [modalPatientName, setModalPatientName] = useState<string>("");

  // Slot action states
  const [activeSlot, setActiveSlot] = useState<Slot | null>(null);
  const [isPostponeModal, setIsPostponeModal] = useState(false);
  const [postponeDate, setPostponeDate] = useState<Date | null>(new Date());
  const [postponeTime, setPostponeTime] = useState("");

  const selectedDateKey = useMemo(
    () => (selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""),
    [selectedDate]
  );
  const selectedDateLabel = useMemo(
    () => (selectedDate ? format(selectedDate, "EEE, MMM d yyyy") : "No date"),
    [selectedDate]
  );

  // --- Booking Modal ---
  function openBookingModal(centreId: string) {
    setModalCentreId(centreId);
    const centre = centres.find((c) => c.id === centreId);
    setModalDoctorId(centre?.doctors[0]?.id ?? null);
    setModalTime("");
    setModalPatientName("");
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
  }
  function handleConfirmBooking(e?: React.FormEvent) {
    e?.preventDefault();
    if (!modalCentreId || !modalDoctorId || !modalTime) {
      alert("Please choose doctor and time.");
      return;
    }

    alert(`Booking placeholder confirmed`);

    setCentres((prev) =>
      prev.map((c) =>
        c.id === modalCentreId
          ? {
              ...c,
              doctors: c.doctors.map((d) =>
                d.id === modalDoctorId
                  ? {
                      ...d,
                      slots: [
                        ...d.slots,
                        {
                          id: makeId("slot_"),
                          time: modalTime,
                          patientName: modalPatientName || undefined,
                          date: selectedDateKey,
                          status: "booked",
                        },
                      ],
                    }
                  : d
              ),
            }
          : c
      )
    );

    setModalOpen(false);
  }

  // --- Cancel / Postpone ---
  function handleCancel(slot: Slot) {
    alert("Appointment cancelled");
    setCentres((prev) =>
      prev.map((c) => ({
        ...c,
        doctors: c.doctors.map((d) => ({
          ...d,
          slots: d.slots.map((s) =>
            s.id === slot.id ? { ...s, status: "cancelled" } : s
          ),
        })),
      }))
    );
    setActiveSlot(null);
  }

  function openPostpone(slot: Slot) {
    setActiveSlot(slot);
    setIsPostponeModal(true);
    setPostponeDate(new Date());
    setPostponeTime("");
  }

  function confirmPostpone(e?: React.FormEvent) {
    e?.preventDefault();
    if (!activeSlot || !postponeDate || !postponeTime) return;

    const newDateKey = format(postponeDate, "yyyy-MM-dd");
    alert(
      `Slot postponed to ${format(
        postponeDate,
        "dd MMM yyyy"
      )} at ${postponeTime}`
    );

    setCentres((prev) =>
      prev.map((c) => ({
        ...c,
        doctors: c.doctors.map((d) => {
          if (!d.slots.find((s) => s.id === activeSlot.id)) return d;
          return {
            ...d,
            slots: d.slots.map((s) =>
              s.id === activeSlot.id
                ? {
                    ...s,
                    time: postponeTime,
                    date: newDateKey,
                    status: "postponed",
                  }
                : s
            ),
          };
        }),
      }))
    );

    setIsPostponeModal(false);
    setActiveSlot(null);
  }

  function renderCentre(c: Centre) {
    return (
      <div className="centre-card card" key={c.id}>
        <div className="centre-header">
          <h3>{c.name}</h3>
          <button
            className="btn btn-primary"
            onClick={() => openBookingModal(c.id)}
          >
            Book Slot
          </button>
        </div>

        <div className="doctors-list">
          {c.doctors.map((d) => (
            <div className="doctor-row" key={d.id}>
              <div className="doctor-meta">
                <div className="doctor-name">{d.name}</div>
              </div>
              <div className="slots">
                {d.slots.filter((s) => s.date === selectedDateKey).length ===
                0 ? (
                  <div className="no-slots">No bookings for this doctor</div>
                ) : (
                  <>
                    <div className="slots-label">Booked Slots:</div>
                    {d.slots
                      .filter((s) => s.date === selectedDateKey)
                      .map((s) => (
                        <div
                          className={`slot-pill ${s.status}`}
                          key={s.id}
                          onClick={() =>
                            setActiveSlot(activeSlot?.id === s.id ? null : s)
                          }
                        >
                          <span className="slot-time">{s.time}</span>
                          {s.patientName && (
                            <span className="slot-patient">
                              — {s.patientName}
                            </span>
                          )}
                          {s.status === "cancelled" && (
                            <span className="slot-tag">Cancelled</span>
                          )}
                          {s.status === "postponed" && (
                            <span className="slot-tag">Postponed</span>
                          )}

                          {activeSlot?.id === s.id && (
                            <div className="slot-actions">
                              <button
                                className="btn-action cancel"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCancel(s);
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                className="btn-action postpone"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openPostpone(s);
                                }}
                              >
                                Postpone
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
            placeholderText="Select a date"
          />
          <div className="selected-date">
            Selected: <strong>{selectedDateLabel}</strong>
          </div>
        </div>
      </div>

      <div className="centres-container">
        {centres.map((c) => renderCentre(c))}
      </div>

      {/* Booking Modal */}
      {isModalOpen && modalCentreId && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={(ev) => ev.stopPropagation()}>
            <h3>Book Slot</h3>
            <form onSubmit={handleConfirmBooking}>
              <div className="form-row">
                <label>Doctor</label>
                <select
                  value={modalDoctorId ?? ""}
                  onChange={(e) => setModalDoctorId(e.target.value)}
                >
                  {centres
                    .find((c) => c.id === modalCentreId)!
                    .doctors.map((d) => (
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
                  value={modalTime}
                  onChange={(e) => setModalTime(e.target.value)}
                />
              </div>

              <div className="form-row">
                <label>Patient name</label>
                <input
                  type="text"
                  value={modalPatientName}
                  onChange={(e) => setModalPatientName(e.target.value)}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
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

      {/* Postpone Modal */}
      {isPostponeModal && activeSlot && (
        <div
          className="modal-backdrop"
          onClick={() => setIsPostponeModal(false)}
        >
          <div className="modal" onClick={(ev) => ev.stopPropagation()}>
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
                  placeholder="e.g. 14:00 - 14:30"
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsPostponeModal(false)}
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
