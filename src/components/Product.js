import React, { useState } from 'react'
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid"
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice'

function Product({id, title, price, description, category, image}) {
    const MAX_RATING = 5;
    const MIN_RATING = 1;
    const [rating] = useState(Math.floor(Math.random()*(MAX_RATING - MIN_RATING + 1) + MIN_RATING)); 
    const [hasPrime] = useState(Math.random() < 0.5);

    const dispatch = useDispatch();
    const addItemToBasket = () => {
        const product = {id, title, price, description, category, image, rating, hasPrime};
        dispatch(addToBasket(product));
    }

    return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-5 gap-2 justify-between'>
        <p className='text-xs text-right italic text-gray-400'>{category}</p>
        <Image src={image} height={200} width={200} objectFit='contain' loading='lazy'/>
        <h4 className='font-semibold'>{title}</h4>
        <div className='flex'>
            {Array(rating).fill().map((_, i) => (
                <StarIcon key={i} className='h-5 text-yellow-500'/>
            ))}
        </div>
        <p className='text-xs line-clamp-2'>{description}</p>
        <div className="font-semibold">
            <Currency quantity={price*10} currency='INR'/>
        </div>
        {hasPrime && (
            <div className='flex gap-2 items-center'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Amazon_Prime_logo_%282022%29.svg" loading='lazy' className='h-5 w-8'/>
                <p className='text-xs italic text-gray-500'>FREE Next-day Delivery</p>
            </div>
        )}
        <button onClick={addItemToBasket} className='my-2 button'>Add To Basket</button>
    </div>
  )
}

export default Product