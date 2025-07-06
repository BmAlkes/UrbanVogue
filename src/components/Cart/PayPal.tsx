import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
  amount: string;
  onSuccess: (details: any) => void;
  onError: (err: any) => void;
}

const PayPalButton = ({amount, onSuccess, onError}: PayPalButtonProps) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          import.meta.env.VITE_PAYPAL_CLIENT_ID,
      }}
    >
     <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(_data, actions) => {
          if (!actions.order) {
            throw new Error("Actions.order is undefined");
          }
          
          return actions.order.create({
            intent: "CAPTURE", // Adicionando a propriedade intent obrigatória
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(_data, actions) => {
          if (!actions.order) {
            throw new Error("Actions.order is undefined");
          }
          
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;