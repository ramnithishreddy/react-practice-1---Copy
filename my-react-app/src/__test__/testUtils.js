// Test utility for Redux Provider
import { Provider } from "react-redux";
import store from "../redux/store";

export const withReduxProvider = (component) => (
  <Provider store={store}>
    {component}
  </Provider>
);

export default withReduxProvider;
