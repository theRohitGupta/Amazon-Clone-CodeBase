import React from 'react'
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import moment from 'moment/moment';
import Order from '../components/Order';

function Orders({ orders }) {
    const { data: session, status } = useSession();
  return (
    <div>
        <Header/>
        <main className='max-w-screen-lg mx-auto px-2 py-5 sm:p-10'>
            <h1 className='text-2xl border-b-2 mb-2 pb-1 border-yellow-400'>Your Orders</h1>
            {
                session ? (
                    <h2>{orders.length} Orders</h2>
                ) : (
                    <h2>Please Sign in to see Your Orders</h2>
                ) 
            }
            <div className='mt-5 space-y-4'>
                {
                    orders?.map(order => (
                        <Order key={order.id} order={order}/>
                    ))
                }
            </div>
        </main>
    </div>
  )
}

export default Orders;

export async function getServerSideProps(context){
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // GET THE USERS LOGGED IN CREDENTIALS
    const session = await getSession(context);

    if(!session){
        return {
            props: {}
        };
    }

    // FIREBASE DB
    const ordersRef = collection(db, 'users', session.user.email, 'orders');
    const q = query(ordersRef, orderBy('timestamp', 'desc'));
    const stripeOrders = await getDocs(q);

    // STRIPE ORDER DATA
    const orders = await Promise.all(
        stripeOrders.docs.map(async(order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100,
                })
            ).data,
        }))
    )

    return {
        props: {
            orders : orders
        }
    }
}