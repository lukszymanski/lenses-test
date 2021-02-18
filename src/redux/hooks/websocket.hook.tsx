import React from "react";

interface Config {
  url: string;
}

export interface WSParams {
  token: string;
  stats?: number;
  sql: string;
  live?: boolean;
}

export type LensesEventValues = Record<string, number | boolean | string | null>;

export interface LensesEventData {
  key: string;
  metadata: {
    offset: number;
    partition: number;
    timestamp: number;
  };
  rownum?: number;
  value: LensesEventValues;
  fields?: string[];
}

export interface LensesEvent {
  type: string;
  data: LensesEventData;
  rowId: string | null;
  statementIndex: string | null;
}

const MAX_MESSAGES_COUNT = 1000;

export const useWebsocket = (config: Config) => {
  const [messages, setMessages] = React.useState<string[]>([]);
  const [event, setEvent] = React.useState<string>();
  const socket = React.useRef<WebSocket>(null);
  const [count, setCount] = React.useState(0);

  const onMessageReceived = (event: MessageEvent<string>) => {
    console.log("[WS] Message received", event.data);
    setCount((prevCount) => prevCount + 1);

    if (event.data.includes("RECORD")) {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    }
  };

  const query = (params: WSParams) => {
    setMessages([]);
    setCount(0);
    setEvent(JSON.stringify(params));
  };

  const close = () => {
    socket.current.close();
  };

  const clear = () => {
    setMessages([]);
  };

  const onOpen = (wsEvent: Event) => {
    console.log("[WS] Connected", wsEvent);

    (wsEvent.target as WebSocket).send(event);
  };

  const onClose = (wsEvent: Event) => {
    console.log("[WS] Closed", wsEvent);
  };

  React.useEffect(() => {
    if (count >= MAX_MESSAGES_COUNT) {
      close();
    }
  }, [count]);

  React.useEffect(() => {
    if (!event) {
      return;
    }

    socket.current = new WebSocket(config.url);
    socket.current.onmessage = onMessageReceived;
    socket.current.onopen = onOpen;
    socket.current.onclose = onClose;

    return () => {
      socket.current.close();
    };
  }, [event]);

  return {
    count,
    messages,
    close,
    clear,
    query,
  };
};
