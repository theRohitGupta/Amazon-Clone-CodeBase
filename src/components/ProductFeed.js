import React from 'react'
import Product from './Product'

function ProductFeed({ products }) {
  return (
    <div className=' grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-24 lg:-mt-32 xl:-mt-48'>
        {
            products.slice(0,4).map(({id, title, price, description, category, image}) => (
                <Product key={id} id={id} title={title} price={price} description={description} category={category} image={image}/>
            ))
        }

        <img className='md:col-span-full' src="https://res.cloudinary.com/dp8l8uxgr/image/upload/v1693864028/AmazonClone/ad3_dzdho2.jpg" loading='lazy' alt='ad3'/>

        <div className='md:col-span-2'>
        {
            products.slice(4,5).map(({id, title, price, description, category, image}) => (
                <Product key={id} id={id} title={title} price={price} description={description} category={category} image={image}/>
            ))
        }
        </div>
        {
            products.slice(5,11).map(({id, title, price, description, category, image}) => (
                <Product key={id} id={id} title={title} price={price} description={description} category={category} image={image}/>
            ))
        }
        <img className='md:col-span-full' src="https://res.cloudinary.com/dp8l8uxgr/image/upload/v1693864144/AmazonClone/ad1_ijzl4s.png" loading='lazy' alt='ad2'/>
        <div className='md:col-span-2'>
        {
            products.slice(11,12).map(({id, title, price, description, category, image}) => (
                <Product key={id} id={id} title={title} price={price} description={description} category={category} image={image}/>
            ))
        }
        </div>
        <div className='md:col-span-2'>
        {
            products.slice(12,13).map(({id, title, price, description, category, image}) => (
                <Product key={id} id={id} title={title} price={price} description={description} category={category} image={image}/>
            ))
        }
        </div>
        {
            products.slice(13,18).map(({id, title, price, description, category, image}) => (
                <Product key={id} id={id} title={title} price={price} description={description} category={category} image={image}/>
            ))
        }
        <img className='md:col-span-full' src="https://res.cloudinary.com/dp8l8uxgr/image/upload/v1693864140/AmazonClone/ad2_hx9lbb.jpg" loading='lazy' alt='ad1'/>
        <div className='md:col-span-2'>
        {
            products.slice(18,19).map(({id, title, price, description, category, image}) => (
                <Product key={id} id={id} title={title} price={price} description={description} category={category} image={image}/>
            ))
        }
        </div>
        {
            products.slice(19,products.length).map(({id, title, price, description, category, image}) => (
                <Product key={id} id={id} title={title} price={price} description={description} category={category} image={image}/>
            ))
        }
    </div>
  )
}

export default ProductFeed
