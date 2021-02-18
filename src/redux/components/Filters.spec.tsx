import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Filters } from "./Filters";
import { LensesEventValues } from "../hooks/websocket.hook";

import "@testing-library/jest-dom/extend-expect";

describe("Filters", () => {
  it("should be defined", () => {
    expect(Filters).toBeDefined();
  });

  it("should render text input", () => {
    const structure = [{ key: "id", type: "string" }];
    const onChange = () => {};
    const filters: LensesEventValues = {
      id: "1234",
    };

    render(
      <Filters structure={structure} onChange={onChange} filters={filters} />
    );

    expect(screen.getByPlaceholderText("id")).toHaveValue("1234");
  });

  it("should render checkbox", () => {
    const structure = [{ key: "field", type: "boolean" }];
    const onChange = () => {};
    const filters: LensesEventValues = {
      field: true,
    };

    const { container } = render(
      <Filters structure={structure} onChange={onChange} filters={filters} />
    );

    expect(container.querySelector("input").getAttribute("type")).toEqual(
      "checkbox"
    );
    expect(container.querySelector("input").getAttribute("value")).toEqual(
      "true"
    );
  });

  it("should trigger onChange when input changes", () => {
    const structure = [{ key: "id", type: "string" }];
    const onChange = jest.fn();
    const filters: LensesEventValues = {
      id: "",
    };

    render(
      <Filters structure={structure} onChange={onChange} filters={filters} />
    );

    const element = screen.getByPlaceholderText("id");

    expect(element).toHaveValue("");
    userEvent.type(element, "1");

    expect(onChange).toHaveBeenCalledWith({ id: "1" });
  });
});
