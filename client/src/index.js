import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Importing various font weights of Nunito
import "@fontsource/nunito/200.css"; // Extra-light
import "@fontsource/nunito/300.css"; // Light
import "@fontsource/nunito/400.css"; // Regular
import "@fontsource/nunito/500.css"; // Medium
import "@fontsource/nunito/600.css"; // Semi-bold
import "@fontsource/nunito/700.css"; // Bold
import "@fontsource/nunito/800.css"; // Extra-bold

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
