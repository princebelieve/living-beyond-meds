//client/src/components/MeasurementForm.jsx
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function MeasurementForm() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    outfitType: "",

    chest: "",
    waist: "",
    shoulder: "",
    sleeve: "",
    neck: "",
    length: "",

    hip: "",
    thigh: "",
    trouserLength: "",

    notes: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/api/measurements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to submit measurement");
      return;
    }

    alert("Measurement submitted successfully!");

    setForm({
      fullName: "",
      phone: "",
      outfitType: "",
      chest: "",
      waist: "",
      shoulder: "",
      sleeve: "",
      neck: "",
      length: "",
      hip: "",
      thigh: "",
      trouserLength: "",
      notes: "",
    });
  }

  return (
    <form className="measurement-form hover-lift" onSubmit={handleSubmit}>
      <div className="measurement-header">
        <span className="eyebrow">CUSTOM FIT FORM</span>
        <h2>Send Your Measurements</h2>
        <p>Fill in your body measurements and preferred outfit type.</p>
      </div>

      <div className="measurement-grid two-col">
        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          value={form.fullName}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          value={form.phone}
          required
        />
      </div>

      <select
        name="outfitType"
        onChange={handleChange}
        value={form.outfitType}
        required
      >
        <option value="">Select Outfit Type</option>
        <option value="Senator Wear">Senator Wear</option>
        <option value="Suit">Suit</option>
        <option value="Native Wear">Native Wear</option>
        <option value="Gown">Gown</option>
        <option value="Kaftan">Kaftan</option>
      </select>

      <div className="measurement-section luxury-card">
        <h3>Upper Body Measurements</h3>

        <div className="measurement-grid three-col">
          <input
            name="chest"
            placeholder="Chest"
            onChange={handleChange}
            value={form.chest}
          />

          <input
            name="waist"
            placeholder="Waist"
            onChange={handleChange}
            value={form.waist}
          />

          <input
            name="shoulder"
            placeholder="Shoulder"
            onChange={handleChange}
            value={form.shoulder}
          />

          <input
            name="sleeve"
            placeholder="Sleeve"
            onChange={handleChange}
            value={form.sleeve}
          />

          <input
            name="neck"
            placeholder="Neck"
            onChange={handleChange}
            value={form.neck}
          />

          <input
            name="length"
            placeholder="Top Length"
            onChange={handleChange}
            value={form.length}
          />
        </div>
      </div>

      <div className="measurement-section luxury-card">
        <h3>Lower Body Measurements</h3>

        <div className="measurement-grid three-col">
          <input
            name="hip"
            placeholder="Hip"
            onChange={handleChange}
            value={form.hip}
          />

          <input
            name="thigh"
            placeholder="Thigh"
            onChange={handleChange}
            value={form.thigh}
          />

          <input
            name="trouserLength"
            placeholder="Trouser Length"
            onChange={handleChange}
            value={form.trouserLength}
          />
        </div>
      </div>

      <textarea
        name="notes"
        placeholder="Extra Notes, fabric preference, style reference, special request..."
        onChange={handleChange}
        value={form.notes}
        rows="5"
      />

      <button type="submit" className="measurement-submit">
        Submit Measurement
      </button>
    </form>
  );
}
