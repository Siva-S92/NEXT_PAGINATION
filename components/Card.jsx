

import React from 'react'

const Card = ({product}) => {
  return (
    <div className='flex flex-col w-[18rem] h-[22rem] border border-gray-400 rounded-lg p-2'>
        <div className='w-full h-[60%]'>
            <img src={product.image} alt={product.title}  className='w-full h-full object-contain mix-blend-multiply'/>
        </div>
        <div className='w-full h-[40%] flex flex-col gap-2 px-1'>
            <h1 className='text-justify'>{product.title.slice(0, 60)}...</h1>
            <p>{product.rating.rate}✡✡✡</p>
            <p>{product.price}</p>
        </div>
    </div>
  )
}

export default Card