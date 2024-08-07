import React, { useState } from 'react';

function SettingModal({ onClose, currentValue }) {
  const [maxAppointments, setMaxAppointments] = useState(currentValue);
  const [error, setError] = useState("");

  const handleSave = () => {
    if (maxAppointments <= 0) {
      setError("Value must be greater than 0");
      return;
    }

    onClose(maxAppointments);
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Max Appointments per Hour</h5>
            <button type="button" className="btn-close" onClick={() => onClose()}></button>
          </div>
          <div className="modal-body">
            <input 
              type="number" 
              className="form-control"
              value={maxAppointments} 
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (value > 0) {
                  setMaxAppointments(value);
                  setError("");
                } else {
                  setError("Value must be greater than 0");
                }
              }} 
            />
            {error && <div className="alert alert-danger mt-2">{error}</div>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => onClose()}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingModal;
