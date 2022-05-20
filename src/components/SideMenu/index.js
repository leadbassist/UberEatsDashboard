import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useRestaurantContext } from "../../contexts/RestaurantContext";

const SideMenu = () => {
  const navigate = useNavigate();
  const { restaurant } = useRestaurantContext();

  const onClick = async (menuItem) => {
    if (menuItem.key === "signOut") {
      await Auth.signOut();
      window.location.reload();
    } else {
      navigate(menuItem.key);
    }
  };

  const mainMenuItems = [
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
  ];

  const menuItems = [
    ...(restaurant ? mainMenuItems : []),
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

  return (
    <>
      {restaurant && <h3>{restaurant.name}</h3>}
      <Menu items={menuItems} onClick={onClick} />
    </>
  );
};

export default SideMenu;
