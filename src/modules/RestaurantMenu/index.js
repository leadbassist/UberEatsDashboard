import { Card, Table, Button, Popconfirm } from "antd";
import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
import { Dish } from "../../models";

const RestaurantMenu = () => {
  const [dishes, setDishes] = useState([]);
  const { restaurant } = useRestaurantContext();

  useEffect(() => {
    if (restaurant?.id) {
      DataStore.query(Dish, (c) => c.restaurantID("eq", restaurant.id)).then(
        setDishes
      );
    }
  }, [restaurant?.id]);

  console.log(dishes);

  const deleteDish = (dish) => {
    DataStore.delete(dish);
    setDishes(dishes.filter((d) => d.id !== dish.id));
  };

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
      render: (_, item) => (
        <Popconfirm
          placement="topLeft"
          title="Are you sure to delete this dish?"
          onConfirm={() => deleteDish(item)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Remove</Button>
        </Popconfirm>
      ),
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
