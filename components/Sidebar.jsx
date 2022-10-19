import React from 'react';
import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaFire, FaPoo } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 flex flex-col w-16 h-screen m-0 text-white border-r-2 shadow-lg bg-primary">
      <SideBarIcon icon={<FaFire size="28" />} />
      <SideBarIcon icon={<BsPlus size="32" />} />

      <Divider />
      <div className="justify-end mt-auto">
        <SideBarIcon icon={<BsGearFill size="22" />} />
      </div>
    </div>
  );
};

const SideBarIcon = ({ icon, text = 'tooltip' }) => {
  return (
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

const Divider = () => <hr className="sidebar-hr" />;

export default Navbar;
