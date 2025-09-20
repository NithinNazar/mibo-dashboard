// src/pages/BookSlotPage.tsx
import React, { useState } from "react";
import { locations } from "../data";
import "./BookSlotPage.scss";

const BookSlotPage: React.FC = () => {
  const [expandedLocation, setExpandedLocation] = useState<string | null>(
    locations[0]?.name ?? null
  );
  const [expandedCentre, setExpandedCentre] = useState<
    Record<string, string | null>
  >({});

  const toggleLocation = (locName: string) => {
    setExpandedLocation((prev) => (prev === locName ? null : locName));
  };

  const toggleCentre = (locName: string, centreName: string) => {
    setExpandedCentre((prev) => ({
      ...prev,
      [locName]: prev[locName] === centreName ? null : centreName,
    }));
  };

  const handleBook = (
    doctorName: string,
    centreName: string,
    locName: string
  ) => {
    // placeholder action
    alert(
      `Booked slot!\nDoctor: ${doctorName}\nCentre: ${centreName}\nLocation: ${locName}`
    );
  };

  return (
    <div className="book-slot-page">
      <div className="page-header">
        <h2>Book Slot</h2>
        <p className="sub">
          Choose a location → centre → doctor to book a slot
        </p>
      </div>

      <div className="locations-grid">
        {locations.map((loc) => (
          <div
            key={loc.name}
            className={`location-card ${
              expandedLocation === loc.name ? "expanded" : ""
            }`}
          >
            <button
              className="loc-head"
              onClick={() => toggleLocation(loc.name)}
            >
              <div>
                <div className="loc-name">{loc.name}</div>
                <div className="loc-sub">{loc.centres.length} centres</div>
              </div>
              <div className="chev">
                {expandedLocation === loc.name ? "▾" : "▸"}
              </div>
            </button>

            {expandedLocation === loc.name && (
              <div className="centres-list">
                {loc.centres.map((c) => (
                  <div key={c.name} className="centre-card">
                    <button
                      className="centre-head"
                      onClick={() => toggleCentre(loc.name, c.name)}
                    >
                      <div>
                        <div className="centre-name">{c.name}</div>
                        <div className="centre-sub">
                          {c.doctors.length} doctors
                        </div>
                      </div>
                      <div className="chev">
                        {(expandedCentre[loc.name] ?? "") === c.name
                          ? "▾"
                          : "▸"}
                      </div>
                    </button>

                    {(expandedCentre[loc.name] ?? null) === c.name && (
                      <div className="doctors-list">
                        {c.doctors.map((d) => (
                          <div key={d.name} className="doctor-row">
                            <div className="doctor-info">
                              <div className="doctor-name">{d.name}</div>
                              <div className="doctor-meta">
                                <span className="special">
                                  {d.specialization}
                                </span>
                                <span
                                  className={`avail ${
                                    d.availability ? "on" : "off"
                                  }`}
                                >
                                  {d.availability ? "Available" : "Unavailable"}
                                </span>
                              </div>
                            </div>

                            <div className="doctor-actions">
                              {d.availability && d.nextAvailableTime ? (
                                <>
                                  <div className="next-time">
                                    Next: {d.nextAvailableTime}
                                  </div>
                                  <button
                                    className="btn primary"
                                    onClick={() =>
                                      handleBook(d.name, c.name, loc.name)
                                    }
                                  >
                                    Book Slot
                                  </button>
                                </>
                              ) : (
                                <div className="not-available">—</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSlotPage;
