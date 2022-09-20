import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);
	}
	return stripePromise;
};

export default getStripe;
