import {useState} from "react";
import AlertContext from "./alertContext";

const AlertState = (props) => {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const removeChild = () => {
    setAlert(null);
  }
  return (
    <AlertContext.Provider value={{ alert, showAlert, removeChild }}>
      {props.children}
    </AlertContext.Provider>
  );
}

export default AlertState;
