import React from 'react'
import moment from 'moment'
import Currency from 'react-currency-formatter';

function Order({order}) {
  return (
    <div className=' relative border rounded-md'>
        <div className='flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-x-10 p-5 bg-gray-100 text-gray-600 text-sm'>
            <div>
                <p className='font-bold text-xs'>ORDER PLACED</p>
                <p>{moment.unix(order.timestamp).format("DD MM YYYY")}</p>
            </div>
            <div>
                <p className='text-xs font-bold'>TOTAL</p>
                <p>
                    <Currency quantity={order.amount} currency='INR'/> - Next Day Delivery{" "} 
                    <Currency quantity={order.amountShipping} currency='INR'/>
                </p>
            </div>
            <p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500'>{order.items.length} items</p>
            <p className=' absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap text-gray-500'>ORDER #{order.id}</p>
        </div>
        <div className='p-5 sm:p-10'>
                <div className='flex space-x-6 overflow-x-auto'>
                    {order.images.map(image => (
                        <img src={image} alt="" className=' h-12 sm:h-14 md:h-18 lg:h-20 object-contain'/>
                    ))}
                </div>
        </div>
    </div>
  )
}

export default Order