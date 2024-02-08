import React, { useState } from "react";
import "./Drawer.css";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  const [isOpenState, setIsOpenState] = useState(isOpen);

  const handleClose = () => {
    setIsOpenState(false);
    onClose();
  };

  return (
    <>
      {isOpenState && <div className="overlay" onClick={handleClose}></div>}
      <div className={`drawer ${isOpenState ? "open" : ""}`}>
        <div className="content">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
