import React, { useEffect , useState} from "react";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from "react-router-dom";
import { getMyOrdersAsync, selectMYOrders } from "../../Profile/profileSlice";

declare global {
  interface Window {
    paypal?: any;
  }
}

const PayPal: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const myOrders = useAppSelector(selectMYOrders);
  const lastOrderId = myOrders.length > 0 ? myOrders[myOrders.length - 1]._id : null;
  const access = useState(localStorage.getItem("access")||"");

 const finishOrder = () =>{
  navigate(`/myorder/${lastOrderId}`);
 }
console.log(lastOrderId)
 useEffect(() => {
  dispatch(getMyOrdersAsync(access[0]))
}, [])

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=sb&enable-funding=venmo&currency=USD";
    script.async = true;
    script.onload = () => {
      window.paypal
        .Buttons({
          style: {
            shape: "rect",
            color: "gold",
            layout: "vertical",
            label: "paypal",
          },
          createOrder: function (data: any, actions: any) {
            return actions.order.create({
              purchase_units: [{ amount: { currency_code: "USD", value: 1 } }],
            });
          },
          onApprove: function (data: any, actions: any) {
            return actions.order.capture().then(function (orderData: any) {
              console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));
              const element = document.getElementById("paypal-button-container");
              if (element) {
                element.innerHTML = "<h3>Thank you for your payment!</h3>";
              }
              // Alternatively, dispatch a success action to Redux store and redirect to a thank-you page
              dispatch({ type: "PAYMENT_SUCCESS" });
            });
          },
          onError: function (err: any) {
            console.log(err);
            // Alternatively, dispatch an error action to Redux store and show an error message to the user
            dispatch({ type: "PAYMENT_ERROR", payload: err });
          },
        })
        .render("#paypal-button-container");
    };
    document.body.appendChild(script);
  }, [dispatch]);

  return (
    <div id="smart-button-container">
      <div style={{ textAlign: "center" }}>
        <div id="paypal-button-container"></div>
        <button className="button-33" role="button" onClick={finishOrder}>finish order</button>
      </div>
    </div>
  );
};

export default PayPal;