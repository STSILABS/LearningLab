import React, { Component } from "react";
var request = require("request");

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
    this.getMessage();
  }

  getMessage() {
    const options = {
      url:
        "https://raw.githubusercontent.com/STSILABS/kiosk-data/master/messages.json",
      json: true
    };

    request(options, (err, res, body) => {
      console.log(res);
      this.setState({message: body[0].message})
    });
  }

  render() {
    return (
      <div
        style={{
          fontSize: "10em",
          lineHeight: "1em",
          width: "100%",
          height: "100%",
          padding: "0.5em",
          color: "white",
          textShadow: "4px 4px #333"
        }}
      >
        {this.state.message}
      </div>
    );
  }
}
