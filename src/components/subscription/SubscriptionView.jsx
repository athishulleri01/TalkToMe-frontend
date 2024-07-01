import React from 'react'
import NavBar from '../common/NavBar'
import { PricingCard } from './Content'

function SubscriptionView() {
  return (
    <div>
      <NavBar current='Subscription' />
      <div className='flex flex-col lg:flex-row lg:mt-20 space-y-4 lg:space-y-0 lg:space-x-32 items-center justify-center'>

        <PricingCard />
        <PricingCard />
      </div>

    </div>
  )
}

export default SubscriptionView
