import React from "react";
import { List, AutoSizer } from "react-virtualized";
import { LensesEvent, LensesEventData } from "../containers/websocket.hook";

import { ListItemDetails } from "./ListItemDetails";

interface Props {
  messages: any[];
  onCommitMessage: () => void;
}

export const MessageList = (props: Props) => {
  const [message, setMessage] = React.useState<LensesEventData>();
  const list = React.useRef<List>(null);

  React.useEffect(() => {
    if (Object.keys(props.messages).length === 0) {
      list.current.scrollToRow(props.messages.length);
    }
  }, []);

  const onShowRowDetails = (newMessage: LensesEventData) => {
    setMessage(newMessage);
  };

  const rowRenderer = (messages: string[]) => ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style, // Style object to be applied to row (to position it)
  }: any) => {
    const currentMessage = JSON.parse(messages[index]).data as LensesEventData;

    const keys: { label: string; value: string }[] = Object.entries(
      currentMessage
    ).map(([label, value]) => {
      return {
        label,
        value: typeof value === "object" ? JSON.stringify(value) : value,
      };
    });

    // const metas: { label: string; value: string }[] = Object.entries(
    //   currentMessage
    // ).map(([]) => {
    //   return { label: k, value: JSON.stringify(currentMessage.data[k]) };
    // });

    return (
      <div
        key={key}
        style={style}
        className="message-row columns ws-message-list is-multiline"
        onClick={() => onShowRowDetails(currentMessage)}
      >
        <div className="column is-2">
          <div>Index</div>
          {index}
        </div>
        {keys.map((item) => (
          <MessageListItem
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
        {/* {metas.map((item) => (
          <MessageListItem
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))} */}
      </div>
    );
  };

  return (
    <div>
      <ListItemDetails
        message={message}
        onCommitMessage={props.onCommitMessage}
        onShowRowDetails={onShowRowDetails}
      />
      <nav className="panel">
        <div className="panel-block">
          <AutoSizer className="autosizer-bulma-fix">
            {({ width }) => (
              <List
                ref={list}
                width={width}
                height={290}
                rowCount={props.messages.length}
                rowHeight={160}
                rowRenderer={rowRenderer(props.messages)}
              />
            )}
          </AutoSizer>
        </div>
      </nav>
    </div>
  );
};

const MessageListItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="column is-2"  style={{ wordBreak: 'break-word' }}>
      <div>{label}</div>
      {value}
    </div>
  );
};
