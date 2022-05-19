import { Card, Table, Button } from "antd";
import dishes from "../../assets/data/dishes.json";
import { Link } from "react-router-dom";

const RestaurantMenu = () => {
  const tableColumns = [
    {
      title: "Menu Item",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$ ${price}`,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => <Button danger>Remove</Button>,
    },
  ];

  const renderNewItemButton = () => {
    return (
      <Link to={"create"}>
        <Button type="primary">+ item</Button>
      </Link>
    );
  };

  return (
    <Card title={"Menu"} styles={{ margin: 20 }} extra={renderNewItemButton()}>
      <Table dataSource={dishes} columns={tableColumns} rowKeys="id" />
    </Card>
  );
};

export default RestaurantMenu;
