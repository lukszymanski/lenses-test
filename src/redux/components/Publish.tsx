import React from "react";
import classnames from "classnames";

import { Button } from "./Button";

interface Props {
  publish: (params: any) => void;
  connection: any;
}

export const Publish = (props: Props) => {
  const [selectedTopic, setSelectedTopic] = React.useState("");
  const [pubKey, setPubKey] = React.useState("");
  const [pubValue, setPubValue] = React.useState("");

  const onPublishClick = () => {
    const request = {
      topic: selectedTopic,
      key: pubKey,
      value: pubValue,
    };

    props.publish(request);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    switch (name) {
      case "selectedTopic":
        setSelectedTopic(value);
      case "pubKey":
        setPubKey(value);
      case "pubValue":
        setPubValue(value);
        break;
      default:
        break;
    }
  };

  const btnStyle = classnames("button is-fullwidth is-success");

  return (
    <nav className="panel">
      <p className="panel-heading">Publish Message</p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            name="pubKey"
            className="input is-small"
            type="text"
            placeholder="Key"
            value={pubKey}
            onChange={onInputChange}
          />
          <span className="icon is-small is-left">
            <i className="fa fa-comment" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            name="pubValue"
            className="input is-small"
            type="text"
            placeholder="Message"
            value={pubValue}
            onChange={onInputChange}
          />
          <span className="icon is-small is-left">
            <i className="fa fa-comment" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            name="selectedTopic"
            className="input is-small"
            type="text"
            placeholder="Topic"
            value={selectedTopic}
            onChange={onInputChange}
          />
          <span className="icon is-small is-left">
            <i className="fa fa-comment" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <Button
          onClick={onPublishClick}
          className={btnStyle}
          disabled={!props.connection}
        >
          Publish
        </Button>
      </div>
    </nav>
  );
};
