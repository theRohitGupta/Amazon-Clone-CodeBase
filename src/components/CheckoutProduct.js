import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'
import Currency from 'react-currency-formatter';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';

function CheckoutProduct({item}) {
    const dispatch = useDispatch();
    const addItemToBasket = () => {
        const product = item;
        dispatch(addToBasket(product));
    }
    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({item}));
    }
  return (
    <div className='flex flex-col space-y-2 sm:grid sm:grid-cols-5'>
        <Image src={item.image} height={200} width={200} objectFit='contain'/>
        <div className='col-span-3 mx-5'>
            <p className=' font-bold text-xs md:text-base'>{item.title}</p>
            <div className='flex'>
                {
                    Array(item.rating).fill().map((_,i) => (
                        <StarIcon key={i} className='h-5 text-yellow-500'/>
                    ))
                }
            </div>
            <p className='text-xs my-2 line-clamp-3'>{item.description}</p>
            <div className=' sm:flex sm:gap-x-4'>
                <Currency quantity={item.price*10} currency='INR'/>
                {item.hasPrime && (
                    <div className='flex items-center space-x-2'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Amazon_Prime_logo_%282022%29.svg" loading='lazy' className='h-5 w-8'/>
                    <p className='text-xs italic text-gray-500'>FREE Next-day Delivery</p>
                    </div>
                )}
            </div>
        </div>
        <div className='flex flex-col space-y-2 my-auto justify-self-end'>
            <button onClick={addItemToBasket} className='my-2 button'>Add To Basket</button>
            <button onClick={removeItemFromBasket} className='my-2 button'>Remove From Basket</button>
        </div>
    </div>
  )
}

export default CheckoutProduct