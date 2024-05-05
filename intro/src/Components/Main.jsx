import React from 'react'
import Text from './Text'
import Form from './Form'

export default function Main() {
  return (
    <section className='bg-blue-500 flex flex-row justify-center items-center lg:gap-[2rem] lg:flex-nowrap flex-wrap md:w-[70vw]  w-[90vw] m-[1rem]'>
        <Text/>
        <Form/>
      
    </section>
  )
}
