import { useEffect, useState } from "react";
import "./CustomAlert.css";

const CustomAlert = ({
  closeAlert,
  message,
}: {
  closeAlert: () => void;
  message: string;
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      closeAlert();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return visible ? (
    <div className="custom-alert">
      <span>{message}</span>
    </div>
  ) : null;
};

export default CustomAlert;
