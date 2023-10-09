import React from 'react'
import Header from '../components/Header'
import Image from 'next/image'
import Currency from 'react-currency-formatter';
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../slices/basketSlice'
import CheckoutProduct from '../components/CheckoutProduct'
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {

    const items = useSelector(selectItems);
    const { data: session, status } = useSession();
    const total = useSelector(selectTotal);

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;

        // CALL THE BACKEND TO CREATE A CHECKOUT SESSION
        const checkoutSession = await axios.post('/api/create-checkout-session', {
            items: items,
            email: session.user.email
        });

        // REDIRECT TO STRIPE CHECKOUT
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if(result.error) alert(result.error.message);
    }

  return (
    <div className='bg-gray-100 min-h-screen h-full'>
        <Header/>
        <main className='lg:flex max-w-screen-2xl mx-auto h-full'>
            {/* LEFT */}
            <div className=' m-5 shadow-sm lg:w-[80%]'>

                <img src='https://links.papareact.com/ikj' className='w-full h-[250px] object-cover'/>
                <div className='flex flex-col p-5 space-y-10 bg-white'>
                    <h1 className='text-3xl border-b pb-4'>{items.length == 0 ? 'Your Amazon Basket is Empty' : 'Shopping Cart'}</h1>
                    {
                        items.map((item,i) => (
                            <CheckoutProduct item={item} key={i}/>
                        ))
                    }
                </div>
            </div>
            {/* LEFT */}

            {/* RIGHT */}
            <div className='flex flex-col bg-white shadow-md lg:w-[20%] p-5 m-5 lg:ml-0'>
                {
                    items.length > 0 && (
                        <>
                            <h2>Subtotal ({items.length} items): 
                            <span className='font-bold'><Currency quantity={total*10} currency='INR'/></span>
                            </h2>
                            <button role='link' onClick={createCheckoutSession} disabled={!session} className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                {
                                    !session ? 'Sign in to Checkout' : "Proceed to Checkout"
                                }
                            </button>
                        </>
                    )
                }
            </div>
            {/* RIGHT */}
        </main>
    </div>
  )
}

export default Checkout