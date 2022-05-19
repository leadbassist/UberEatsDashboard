import React, { useState } from "react";
import { Form, Input, Card, Button } from "antd";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

const Settings = () => {
  const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const getAddressLatLng = async () => {
    setAddress(address);
    const geocodedByAddress = await geocodeByAddress(address.label);
    const latLng = await getLatLng(geocodedByAddress[0]);
    setCoordinates(latLng);
  };

  return (
    <Card title="Restaurant Details" style={{ margin: 20 }}>
      <Form layout="vertical" wrapperCol={{ span: 8 }}>
        <Form.Item label="Restaurant Name" required>
          <Input placeholder="Enter restaurant name here" />
        </Form.Item>
        <Form.Item label="Restaurant Address" required>
          <GooglePlacesAutocomplete
            apiKey="AIzaSyBEOKbS3hOU5kUJ8tjK92C3Vd-Sb_wdElo"
            selectProps={{
              value: address,
              onChange: getAddressLatLng,
            }}
          />
          {/* <Input placeholder="Enter restaurant address here" /> */}
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
      <span>
        lat {coordinates?.lat} and lng {coordinates?.lng}
      </span>
    </Card>
  );
};

export default Settings;
