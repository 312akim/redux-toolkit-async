import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.isOpen);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    dispatch(fetchCartData());
  },[dispatch])

  useEffect(() => {
    // Won't replace cart data on first load
    if (isInitial) {
      isInitial = false;
      return;
    }
    
    // Prevents sending of data on receiving intial data
    if(cart.changed) { 
      // Using Action Creators for async functions - Keeps components clean & logic in slices
      // Replace cart data on cart state change
      dispatch(sendCartData(cart));
    }

  }, [cart, dispatch]);

  return (
    <Fragment>
      {
        notification && 
          <Notification 
            status={notification.status} 
            title={notification.title} 
            message={notification.message}
          />
      }
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
