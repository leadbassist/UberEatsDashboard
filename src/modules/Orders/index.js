import { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";

import { Card, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { Order, OrderStatus } from "../../models";
import { useRestaurantContext } from "../../contexts/RestaurantContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { restaurant } = useRestaurantContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!restaurant) {
      return;
    }
    DataStore.query(Order, (order) =>
      order
        .orderRestaurantId("eq", restaurant.id)
        .or((orderStatus) =>
          orderStatus
            .status("eq", "ACCEPTED")
            .status("eq", "NEW")
            .status("eq", "COOKING")
            .status("eq", "READY_FOR_PICKUP")
        )
    ).then(setOrders);
  }, [restaurant]);

  // console.log(orders);

  const renderOrderStatus = (orderStatus) => {
    const statusToColor = {
      [OrderStatus.NEW]: "green",
      [OrderStatus.COOKING]: "orange",
      [OrderStatus.READY_FOR_PICKUP]: "red",
      [OrderStatus.ACCEPTED]: "purple",
    };

    return <Tag color={statusToColor[orderStatus]}>{orderStatus}</Tag>;
  };
  const tableColumns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Price",
      dataIndex: "total",
      key: "total",
      render: (price) => `$ ${price}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderOrderStatus,
    },
  ];

  return (
    <Card title={"Orders"} style={styles.root}>
      <Table
        dataSource={orders}
        columns={tableColumns}
        rowKey="id"
        onRow={(orderItem) => ({
          onClick: () => navigate(`order/${orderItem.id}`),
        })}
      />
    </Card>
  );
};

const styles = {
  root: {
    margin: 20,
  },
};

export default Orders;
