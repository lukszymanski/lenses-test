import React from "react";
import { useSelector } from "react-redux";

import { sessionSelector } from "@app/reducers";

import { Connect } from "./Connect";
import { Subscribe } from "../components/Subscribe";
import { MessageList } from "../components/MessageList";
import { useWebsocket } from "@app/hooks";

export const MainContainer = () => {
  const { token } = useSelector(sessionSelector);
  const { query, messages, clear } = useWebsocket({
    url: "ws://localhost:8000/api/ws/v2/sql/execute",
  });

  const commit: any = null;

  const clearMessages = () => clear();

  return (
    <div className="container app">
      <div className="columns">
        <div className="column">
          <Connect />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Subscribe
            token={token}
            messages={messages}
            clearMessages={clearMessages}
            subscribe={(params) => query(params)}
          />
          {messages.length ? (
            <MessageList messages={messages} onCommitMessage={commit} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
