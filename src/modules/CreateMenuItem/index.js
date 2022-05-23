import { Form, Input, Button, Card, InputNumber, message } from "antd";
import { DataStore } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
import { Dish } from "../../models";

const { TextArea } = Input;

const CreateMenuItem = () => {
  const { restaurant } = useRestaurantContext();
  const navigation = useNavigate();

  const onFinish = ({ name, description, price }) => {
    DataStore.save(
      new Dish({
        name,
        description,
        price,
        restaurantID: restaurant.id,
      })
    );
    message.success("Dish created!");
    navigation("/menu");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card title="New Menu Item" style={{ margin: 20 }}>
      <Form
        layout="vertical"
        wrapperCol={{ span: 15 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Dish Name"
          name="name"
          rules={[{ required: true }]}
          required
        >
          <Input placeholder="Enter dish name" />
        </Form.Item>
        <Form.Item
          label="Dish Description"
          name="description"
          rules={[{ required: true }]}
          required
        >
          <TextArea rows={4} placeholder="Enter dish description" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true }]}
          required
        >
          <InputNumber placeholder="0.00" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateMenuItem;
