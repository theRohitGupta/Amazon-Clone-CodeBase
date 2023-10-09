import { buffer } from "micro";
import * as admin from 'firebase-admin';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';

// SECURE A CONNECTION TO FIREBASE FROM BACKEND
const serviceAccount = require('../../../permissions.json');
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();


// ESTABLISH CONNECTION TO STRIPE
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
    // console.log("FULLFILLING ORDER ", session);

    const db = getFirestore();

    const userDocRef = doc(db, 'users', session.metadata.email, 'orders', session.id);

    const orderData = {
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: serverTimestamp()
    };

    try {
        await setDoc(userDocRef, orderData);
        console.log(`SUCCESS: ORDER ${session.id} had been added to DB`);
    } catch (error) {
        console.error("Error adding order to DB: ", error);
    }
};

export default async (req,res) => {
    if(req.method === 'POST'){
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event;

        // VERIFY THAT EVENT POSTED CAME FROM STRIPE
        try{
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        }catch(err){
            console.log('ERROR ', err.message);
            return res.status(400).send(`WEBHOOK ERROR: ${err.message}`);
        }

        // HANDLE THE CHECKOUT SESSION COMPLETED
        if(event.type === 'checkout.session.completed') {
            const session = event.data.object;

            // FULFILL ORDER
            return fulfillOrder(session)
            .then(() => res.status(200))
            .catch(err => res.status(400).send(`WEBHOOK ERROR: ${err.message}`));
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}