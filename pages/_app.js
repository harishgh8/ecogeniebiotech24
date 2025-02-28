import "@styles/globals.scss";
import { Provider } from "react-redux";
import { store } from "../store";
import { CartProvider } from '../context/CartContext';

export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <CartProvider>
                <Component {...pageProps} />
            </CartProvider>
        </Provider>
    );
}
