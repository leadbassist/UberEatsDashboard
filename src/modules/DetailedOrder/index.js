import { Card, Descriptions, Divider, List, Button } from "antd";
import dishes from "../../assets/data/dishes.json";
import { useParams } from "react-router-dom";

const DetailedOrder = () => {
  const { id } = useParams();
  return (
    <Card title={`Order ${id}`} style={styles.root}>
      <Descriptions bordered column={{ lg: 1, md: 1, sm: 1 }}>
        <Descriptions.Item label="Customer">Dave Mustaine</Descriptions.Item>
        <Descriptions.Item label="Customer Address">
          123 A Secret Place
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <List
        dataSource={dishes}
        renderItem={(dishItem) => (
          <List.Item>
            <div style={styles.dishNames}>
              {dishItem.name} x {dishItem.quantity}
            </div>
            <div>${dishItem.price}</div>
          </List.Item>
        )}
      />
      <Divider />
      <div style={styles.totalContainer}>
        <h2>Total:</h2>
        <h2 style={styles.totalPrice}>$42.96</h2>
      </div>
      <Divider />
      <div style={styles.buttonContainer}>
        <Button block type="danger" size="large" style={styles.button}>
          Decline Order
        </Button>
        <Button block type="primary" size="large" style={styles.button}>
          Accept Order
        </Button>
      </div>
      <Button block type="primary" size="large" style={styles.button}>
        Food Prepared
      </Button>
    </Card>
  );
};

const styles = {
  root: {
    margin: 20,
  },
  dishNames: {
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between", // or choose marginLeft: "auto" for totalPrice
  },
  totalPrice: {
    // marginLeft:"auto",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    paddingBottom: 30,
  },
  button: {
    marginRight: 20,
    marginLeft: 20,
  },
};

export default DetailedOrder;