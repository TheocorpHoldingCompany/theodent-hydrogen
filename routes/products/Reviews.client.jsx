import { useEffect, useState } from 'react';


export const Reviews = ({ id }) => {
  const [show, setShow]= useState(false);

  useEffect(() => {
    if (id) {
      setShow(false)
      setTimeout(() => setShow(true), 150);
    } else {
      setShow(false)
    }
  }, [id])

  if (show) {
    return(
      <div className='container'>
        <div key={id} id="looxReviews" data-product-id={id}></div>
      </div>
    )
  } else {
    return null
  }
}
