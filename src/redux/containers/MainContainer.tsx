import React from "react";

import { Connect } from "./Connect";
import { Subscribe } from "./Subscribe";
import { MessageList } from "../components/MessageList";
import { useWebsocket } from "./websocket.hook";

export const MainContainer = () => {
  const { query, messages } = useWebsocket({
    url: "ws://localhost:8000/api/ws/v2/sql/execute",
  });

  const commit: any = null;

  const clearMessages = () => {};

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
