import React from "react";

interface Config {
  url: string;
}

export interface WSParams {
  token: string;
  stats: number;
  sql: string;
  live: boolean;
}

export interface LensesEventData {
  key: string;
  metadata: {
    offset: number;
    partition: number;
    timestamp: number;
  };
  rownum?: number;
  value: {
    amount: null;
    creditCardId: string;
    currency: string;
    id: string;
    merchantId: number;
    time: string;
  };
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
  const [event, setEvent] = React.useState<string>(null);
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
    setEvent(JSON.stringify(params));
  };

  const close = () => {
    socket.current.close()
  }

  const onOpen = (wsEvent: Event) => {
    console.log("[WS] Connected", wsEvent);
    const socket = wsEvent.target as WebSocket;

    socket.send(event);
  };

  const onClose = (wsEvent: Event) => {
    console.log("[WS] Closed", wsEvent);
  };

  React.useEffect(() => {
    if (count >= MAX_MESSAGES_COUNT) {
      close();
    }
  }, [count])

  React.useEffect(() => {
    if (!event) {
      return;
    }

    socket.current = new WebSocket(config.url);
    socket.current.addEventListener("message", onMessageReceived);
    socket.current.addEventListener("open", onOpen);
    socket.current.addEventListener("close", onClose);

    return () => {
      socket.current.removeEventListener("message", onMessageReceived);
      socket.current.removeEventListener("open", onOpen);
      socket.current.removeEventListener("close", onClose);
      socket.current.close();
    };
  }, [event]);

  return {
    messages,
    close,
    query,
  };
};
