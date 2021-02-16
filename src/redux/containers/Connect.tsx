import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";

import { Action } from "@app/actions";
import { sessionSelector } from "@app/reducers";

import { Button } from "../components/Button";

interface Props {}

export const Connect = (props: Props) => {
  const dispatch = useDispatch();

  const { heartbeatCount, host, user, password, token } = useSelector(
    sessionSelector
  );

  const onLogin = async () => {
    const API_URL = "/api/login";
    const payload = { user, password };

    dispatch(Action.authUser(payload));

    try {
      const response = await axios.post<string>(API_URL, payload);
      dispatch(Action.authUserSuccess(response.data));
    } catch (error) {
      dispatch(Action.authUserFailure());
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value =
      target.type === "checkbox"
        ? target.checked
          ? target.value
          : ""
        : target.value;
    const name = target.name;

    switch (name) {
      case "host":
        dispatch(Action.updateHost(value));
        break;
      case "user":
        dispatch(Action.updateUser(value));
        break;
      case "password":
        dispatch(Action.updatePassword(value));
        break;
      default:
        break;
    }
  };

  const btnStyle = classnames("button is-fullwidth", {
    "is-primary": !token,
    "is-danger": token,
  });

  if (token) {
    return null;
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Connection Details</p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            className="input is-small"
            type="text"
            placeholder="host"
            value={host}
            name="host"
            onChange={onInputChange}
          />
          <span className="icon is-small is-left">
            <i className="fa fa-server" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <p className="control has-icons-left">
          Heartbeat Count: {heartbeatCount}
        </p>
      </div>
      <div>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="text"
              placeholder="User"
              value={user}
              name="user"
              onChange={onInputChange}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-user" />
            </span>
          </p>
        </div>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="password"
              placeholder="Password for Authentication"
              value={password}
              name="password"
              onChange={onInputChange}
              autoComplete="off"
            />
            <span className="icon is-small is-left">
              <i className="fa fa-lock" />
            </span>
          </p>
        </div>
      </div>
      <div className="panel-block">
        <Button onClick={onLogin} className={btnStyle}>
          Login
        </Button>
      </div>
    </nav>
  );
};
