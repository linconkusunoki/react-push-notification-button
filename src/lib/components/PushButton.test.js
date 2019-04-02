import React from "react";
import ReactDOM from "react-dom";
import PushButton from "./PushButton";

global.Notification = {
  permission: "default"
};

it("PushButton renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PushButton />, div);
});
