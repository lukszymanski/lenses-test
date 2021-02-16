import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "../config/store";
import { MainContainer } from "./MainContainer";

const store = configureStore();

const AppContainer = () => {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
};

ReactDOM.render(<AppContainer />, document.getElementById("main"));

export default AppContainer;
