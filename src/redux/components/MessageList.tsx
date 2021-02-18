import React from "react";
import { List, AutoSizer } from "react-virtualized";
import { LensesEvent, LensesEventData, LensesEventValues } from "@app/hooks";
import { Filters } from "./Filters";

import { ListItemDetails } from "./ListItemDetails";

interface Props {
  messages: string[];
  onCommitMessage: () => void;
}

const ALLOWED_FILTERS = [
  "Type",
  "Accuracy",
  "RAIM",
  "MMSI",
  "Status",
  "merchantId",
  "amount",
  "currency",
];

export const MessageList = (props: Props) => {
  const [filterStructure, setFilterStructure] = React.useState<
    { key: string; type: string }[]
  >([]);
  const [filters, setFilters] = React.useState<LensesEventValues>();
  const [message, setMessage] = React.useState<LensesEventData>();
  const [filteredMessages, setFilteredMessages] = React.useState<string[]>(
    props.messages
  );
  const list = React.useRef<List>(null);

  React.useEffect(() => {
    if (Object.keys(props.messages).length === 0) {
      list.current.scrollToRow(props.messages.length);
    }
  }, []);

  React.useEffect(() => {
    if (props.messages.length) {
      const [firstMessage] = props.messages;
      const { data } = JSON.parse(firstMessage) as LensesEvent;

      const filterTypes = Object.keys(data.value)
        .filter((key) => ALLOWED_FILTERS.includes(key))
        .reduce((types, key) => {
          return [...types, { key, type: typeof data.value[key] }];
        }, []);
      setFilterStructure(filterTypes);
    }

    if (!filters) {
      setFilteredMessages(props.messages);
      return;
    }

    const filterValues = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v != null)
    );

    const filteredData = props.messages.filter((item) => {
      const data = JSON.parse(item).data as LensesEventData;

      return Object.entries(filterValues).every(
        ([key, value]) => value === data.value[key]
      );
    });

    setFilteredMessages(filteredData);
  }, [props.messages.length, filters]);

  const handleSubmitFilters = (filters: Partial<LensesEventValues>) => {
    setFilters(filters);
  };

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
      </div>
    );
  };

  return (
    <div>
      <Filters
        structure={filterStructure}
        filters={filters}
        onChange={handleSubmitFilters}
      />
      <ListItemDetails
        message={message}
        onCommitMessage={props.onCommitMessage}
        onShowRowDetails={onShowRowDetails}
      />
      <nav className="panel">
        <div className="panel-block">
          <AutoSizer className="autosizer-bulma-fix">
            {({ width }: { width: number }) => (
              <List
                ref={list}
                width={width}
                height={290}
                rowCount={filteredMessages.length}
                rowHeight={160}
                rowRenderer={rowRenderer(filteredMessages)}
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
    <div className="column is-2" style={{ wordBreak: "break-word" }}>
      <div>{label}</div>
      {value}
    </div>
  );
};
