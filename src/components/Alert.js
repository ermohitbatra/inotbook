import React, { useContext } from "react";
import alertContext from "../context/alert/alertContext";

function Alert(props) {
  const context = useContext(alertContext)
  const {alert, removeChild} = context;
  return (
    <div>
      {alert &&(
      <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
        {alert.msg}
        <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={removeChild} aria-label="Close"></button>
      </div>
      )}
    </div>
  );
}

export default Alert;
