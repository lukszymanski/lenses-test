import React from "react";

import { useSelector } from "react-redux";
import classnames from "classnames";

import { sessionSelector } from "@app/reducers";

import { Button } from "../components/Button";
import { WSParams } from "./websocket.hook";

interface Props {
  messages: any[];
  clearMessages: () => void;
  subscribe: (params: WSParams) => void;
}

export const Subscribe = (props: Props) => {
  const [sql, setSQLs] = React.useState("");
  const { token } = useSelector(sessionSelector);

  const onSqlsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSQLs(event.target.value);
  };

  const onSubscribe = () => {
    props.subscribe({
      token,
      stats: 2,
      sql,
      live: true,
    });
  };

  const onClearMessages = () => {
    props.clearMessages();
  };

  const onUnsubscribe = () => {};

  const btnStyle = classnames("button is-small is-info");

  return (
    <nav className="ws-subscribe panel">
      <div className="panel-heading">
        <div className="field has-addons">
          <p className="control is-expanded">
            <textarea
              rows={3}
              className="textarea is-small is-info"
              placeholder="SQLS"
              value={sql}
              onChange={onSqlsChange}
            />
          </p>
        </div>
      </div>
      <div className="panel-block">
        <div className="control">
          <Button
            style={{ marginRight: "10px" }}
            onClick={onSubscribe}
            className={btnStyle}
            disabled={!sql}
          >
            Subscribe
          </Button>
          <Button
            onClick={onClearMessages}
            className="button is-small is-danger"
          >
            Clear Messages
          </Button>
        </div>
      </div>
      <div className="panel-block">
        <div className="control">
          Number of messages: {props.messages.length}
        </div>
      </div>
    </nav>
  );
};
