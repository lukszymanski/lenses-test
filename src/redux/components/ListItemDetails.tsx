import React from "react";
import { LensesEventData } from "../containers/websocket.hook";

import { Button } from "./Button";

const ListItemDetailsRow = ({ label, value }: any) => (
  <li>
    <strong>{label}</strong>: {value}
  </li>
);

interface Props {
  message: LensesEventData;
  onShowRowDetails: (params: any) => void;
  onCommitMessage: (params: any) => void;
}

export const ListItemDetails = (props: Props) => {
  const commitMessage = (message: any) => {
    return () => {
      if (message) {
        props.onCommitMessage(message);
      }
    };
  };

  const clearSelectedItem = () => {
    props.onShowRowDetails({});
  };

  let arr: any[] = [];
  const { message, onShowRowDetails } = props;
  if (message?.value) {
    arr = Object.entries(message.value).map(([label, value]) => ({
      label,
      value,
    }));
  }
  return (
    <div>
      {arr.length > 0 ? (
        <div className="notification content list-item-details">
          <ul>
            {arr.map((item) => (
              <ListItemDetailsRow
                key={item.label}
                label={item.label}
                value={item.value ? String(item.value) : item.value}
              />
            ))}
          </ul>
          <Button
            className="button is-info is-small"
            onClick={commitMessage(message)}
          >
            Commit
          </Button>
          <Button
            className="button is-white is-small"
            onClick={clearSelectedItem}
          >
            Hide details
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
