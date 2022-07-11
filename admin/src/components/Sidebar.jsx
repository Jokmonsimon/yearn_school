import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import icon from '../assets/icon.svg';

const Sidebar = () => {
  const activeMenu = true;

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={() => {}}
              className="items-center gap-3 ml-3 mt-4 flex text-3xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              {/* <SiShopware /> */}
              <img
                src={icon}
                alt="logo"
                className="w-8 h-8 items-center flex justify-center"
              />
              <span>Yearn</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="buttin"
                onClick={() => {}}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Sidebar;
