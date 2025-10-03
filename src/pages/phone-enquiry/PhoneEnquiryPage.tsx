import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "./PhoneEnquiryPage.scss";

type Enquiry = {
  id: string;
  date: string; // yyyy-MM-dd
  name: string;
  centre: string;
  answered: boolean;
};

function makeId(prefix = "") {
  return (
    prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
  );
}

export default function PhoneEnquiryPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [name, setName] = useState("");
  const [centre, setCentre] = useState("Kochi");
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("phoneEnquiries");
    if (stored) setEnquiries(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("phoneEnquiries", JSON.stringify(enquiries));
  }, [enquiries]);

  const addEnquiry = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name) return alert("Enter name");
    const newEntry: Enquiry = {
      id: makeId("pe_"),
      date,
      name,
      centre,
      answered,
    };
    setEnquiries((p) => [newEntry, ...p]);
    setName("");
    setAnswered(false);
    setDate(format(new Date(), "yyyy-MM-dd"));
  };

  const toggleAnswered = (id: string) => {
    setEnquiries((p) =>
      p.map((q) => (q.id === id ? { ...q, answered: !q.answered } : q))
    );
  };

  const removeEnquiry = (id: string) => {
    if (!window.confirm("Remove this enquiry?")) return;
    setEnquiries((p) => p.filter((q) => q.id !== id));
  };

  return (
    <div className="phone-enquiry-page">
      <h2>Phone Enquiries</h2>

      <form className="enquiry-form" onSubmit={addEnquiry}>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Centre</label>
        <select value={centre} onChange={(e) => setCentre(e.target.value)}>
          <option>Kochi</option>
          <option>Mumbai</option>
          <option>Bangalore</option>
        </select>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={answered}
            onChange={(e) => setAnswered(e.target.checked)}
          />{" "}
          Answered
        </label>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>

      <div className="enquiry-list">
        {enquiries.length === 0 ? (
          <div className="empty">No enquiries yet</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Centre</th>
                <th>Answered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((q) => (
                <tr key={q.id}>
                  <td>{q.date}</td>
                  <td>{q.name}</td>
                  <td>{q.centre}</td>
                  <td>{q.answered ? "Yes" : "No"}</td>
                  <td className="actions-col">
                    <button
                      className="btn small"
                      onClick={() => toggleAnswered(q.id)}
                    >
                      Toggle
                    </button>
                    <button
                      className="btn small danger"
                      onClick={() => removeEnquiry(q.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
