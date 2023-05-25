import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import CheckoutForm from "../../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useLoadTst } from "../../components/hooks/useLoadTst";

const ROOT = 'http://localhost:3500/api';

function PaymentPage() {
    const { total } = useLoadTst();
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        axios.get(`${ROOT}/config`)
            .then(async (result) => {
                const { publishableKey } = await result.data;

                setStripePromise(loadStripe(publishableKey));
            })
    }, []);

    useEffect(() => {
        if (total !== 0) {
            axios.post(`${ROOT}/create_payment`, { total })
                .then(async (result) => {
                    const { clientSecret } = await result.data;
                    setClientSecret(clientSecret);
                });
        }

    }, [total]);

    return (
        <section style={{ padding: "3rem" }}>
            <h1>Strype Payment</h1>
            <h3>$ {total}</h3>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </section>
    )
}

export default PaymentPage;