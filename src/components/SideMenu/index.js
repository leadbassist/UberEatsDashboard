import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();
  const menuItems = [
    {
      key: "/",
      label: "Orders",
    },
    {
      key: "menu",
      label: "Menu",
    },
    {
      key: "order-history",
      label: "Orders History",
    },
    {
      key: "settings",
      label: "Settings",
    },
  ];

  const onMenuItemClicked = (menuItem) => {
    navigate(menuItem.key);
  };
  return <Menu items={menuItems} onClick={onMenuItemClicked} />;
};

export default SideMenu;
