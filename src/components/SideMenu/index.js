import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

const SideMenu = () => {
  const navigate = useNavigate();

  const onClick = async (menuItem) => {
    if (menuItem.key === "signOut") {
      await Auth.signOut();
      window.location.reload();
    } else {
      navigate(menuItem.key);
    }
  };

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
    {
      key: "signOut",
      label: "sign out",
      danger: "true", // this will make the font red
    },
  ];

  return <Menu items={menuItems} onClick={onClick} />;
};

export default SideMenu;
