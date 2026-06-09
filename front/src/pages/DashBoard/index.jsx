import React from 'react'
import AllProducts from '../../components/AllProducts'
import AllStorage from '../../components/AllStorage'
import AllValuesStorage from '../../components/AllValueStorage'
import ListProducts from '../../components/ListProducts'


const DashBoard = () => {
  return (
    <div >
      <h1 className='text-xl font-bold text-cyan-800 mb-6'>Dashboard </h1>
      
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
        <AllProducts/>
        <AllStorage/>
        <AllValuesStorage/>
    
      </div>

      <ListProducts/>
      
      
      
      </div>
  )
}

export default DashBoard