import React from "react";
import { LensesEventValues } from "@app/hooks";

interface Props {
  structure: { key: string; type: string }[];
  onChange: (filters: LensesEventValues) => void;
  filters: LensesEventValues;
}

export const Filters = ({ filters, onChange, structure = [] }: Props) => {
  const updateFilter = (filter: LensesEventValues) => {
    onChange({
      ...filters,
      ...filter,
    });
  };

  const renderFilter = ({
    key,
    type,
  }: {
    key: string;
    type: string | number | boolean;
  }) => {
    if (type === "number") {
      return (
        <div className="column" key={key}>
          <input
            className="input"
            type="text"
            placeholder={key}
            value={(filters?.[key] as number | string) ?? ""}
            onChange={(event) =>
              updateFilter({
                [key]: event.target.value ? parseInt(event.target.value) : null,
              })
            }
          />
        </div>
      );
    }

    if (type === "string") {
      return (
        <div className="column" key={key}>
          <input
            className="input"
            type="text"
            placeholder={key}
            value={(filters?.[key] as number | string) ?? ""}
            onChange={(event) =>
              updateFilter({
                [key]: event.target.value,
              })
            }
          />
        </div>
      );
    }

    return (
      <div className="column" key={key}>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={filters?.[key] as boolean}
            value={`${filters?.[key]}`}
            onChange={(event) => updateFilter({ [key]: event.target.checked })}
          />
          {key}
        </label>
      </div>
    );
  };

  return (
    <div className="panel">
      <div className="panel-block">
        <div className="columns">{structure.map(renderFilter)}</div>
      </div>
    </div>
  );
};
