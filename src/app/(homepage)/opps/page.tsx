'use client'
import { useAppContext } from '@/components/AppContext';
import Loading from '@/components/utility/Loading';
import React from 'react';

export default function Page () {
  const {opps} = useAppContext()
  if (!opps) {
    return <Loading />
  } else if (!opps.length){
    return <h1>没有合作内容，请联系我们新增合作内容</h1>
  } else {
    return (
      <div>THis suppose display the opportunities</div>
    )
  }
}