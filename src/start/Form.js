import React, { useState } from "react";
import "./Form.css"; // Import CSS file for styling
import Pi from "./pi.png";
import { Button, Input } from "antd";
import Maps from "./maps.png";
import { setData } from "./set";

const Form = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [content, setContent] = useState("");

  const [proxy, setProxy] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const setValues = async (proxy, lat, lon) => {
    // setLoading(true);
    await setData(proxy, lat, lon).then(async (dt) => {
      setContent(dt);
    });
  };

  const callConfig = async () => {
    await setValues(proxy, lat, lon);
  };

  const handleProxy = (e) => {
    const inputValue = e.target.value;
    setProxy(inputValue);
  };

  const handleLat = (e) => {
    const inputValue = e.target.value;
    setLat(inputValue);
  };

  const handleLon = (e) => {
    const inputValue = e.target.value;
    setLon(inputValue);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setIpAddress(inputValue);
    setErrorMessage(""); // Reset error message on input change

    // Perform live validation on input value
    if (inputValue.trim() === "") {
      setErrorMessage("Please enter a valid IP address");
    } else if (!isValidIpAddress(inputValue)) {
      setErrorMessage("Please enter a valid IP address format");
    } else {
      setErrorMessage("");
    }
  };

  const isValidIpAddress = (value) => {
    // Perform validation logic for IP address format
    // You can replace this with your own validation logic
    const ipAddressRegex =
      /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4})$/;
    return ipAddressRegex.test(value);
  };

  const handleButtonClick = () => {
    if (errorMessage === "") {
      // Call function to set configuration with the entered IP address
      // You can replace this with your actual logic for setting configuration
      alert(`Setting configuration with IP address: ${ipAddress}`);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-heading">Voltela Configuration</div>
        <div className="card-input">
          <div className="card-input-label">
            Public end point for Voltela Raspberry Pi <br />
            Steps to get the end point:
            <ul>
              <li>Login to https://app.remote.it</li>
              <li>Choose the PI to used from the listed devices</li>
              <li>Click on SSH under service tab</li>
              <li>Connect to the PI</li>
              <li>Copy the public endpoint</li>
            </ul>
          </div>
          <Input
            defaultValue=""
            placeholder="Public end point"
            onChange={handleProxy}
          />
        </div>
        <div className="card-input">
          <div className="card-input-label">
            Home gps value {"("}Reference point near flight region{")"}
            <br />
            Steps to get the Home gps coordinates:
            <ul>
              <li>Go to maps.google.com</li>
              <li>Zoom into the location near expected flight region</li>
              <li>Right click on the location</li>
              <li>
                Click on the first option mention lat and lon, This will copy
                the coordinates to clipboard
              </li>
            </ul>
          </div>
          <Input defaultValue="" placeholder="Latitude" onChange={handleLat} />
          <Input defaultValue="" placeholder="Longitude" onChange={handleLon} />
        </div>
        <div className="card-submit">
          <Button type="primary" onClick={callConfig}>
            Set Configuration
          </Button>
        </div>
        <div className="card-status">
          Status:{" "}
          <button
            className={`status-button`}
            disabled={true}
            // onClick={() => handleStatusChange("red")}
          ></button>
        </div>
        <div className="card-status">Log:{content}</div>
      </div>
    </div>
  );
};

export default Form;
