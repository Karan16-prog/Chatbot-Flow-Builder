import React, { useState, useEffect } from "react";
import "./CustomAlert.css"; // Import CSS file for styling

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
  });

  return visible ? (
    <div className="custom-alert">
      <span>{message}</span>
    </div>
  ) : null;
};

export default CustomAlert;
