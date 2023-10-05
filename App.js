import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import Main from "./components/Main/Main";

export default function App() {
  LogBox.ignoreLogs(["Sending `onAnimatedValueUpdate` with no listeners registered."]);

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
