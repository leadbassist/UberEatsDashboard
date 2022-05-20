import { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Order } from "../../models";

import { Card, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { OrderStatus } from "../../models";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    DataStore.query(Order).then(setOrders);
  }, []);

  // console.log(orders);

  const renderOrderStatus = (orderStatus) => {
    const statusToColor = {
      [OrderStatus.NEW]: "green",
      [OrderStatus.COOKING]: "orange",
      [OrderStatus.READY_FOR_PICKUP]: "red",
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
      title: "Delivery Address",
      dataIndex: "deliveryAddress",
      key: "deliveryAddress",
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
        rowKey="orderID"
        onRow={(orderItem) => ({
          onClick: () => navigate(`order/${orderItem.orderID}`),
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
