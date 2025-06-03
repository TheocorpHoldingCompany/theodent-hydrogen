import { useState } from 'react';
import {Image} from '@shopify/hydrogen';
import { useWindowSize } from 'react-use';
import { BsX, BsChevronRight, BsChevronLeft } from 'react-icons/bs';

export const ProductPhotos = ({ photos = [] }) => {
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(0);
  const formatted = photos?.map((p, index) => ({ path: p, index : index }));
  const remaining = formatted?.filter((p) => p.index !== selected);
  const { height } = useWindowSize();

  const isLast = selected === photos?.length - 1;

  const handleBack = () => {
    if (selected === 0) {
      setSelected(photos?.length - 1)
    } else {
      setSelected(selected - 1)
    }
  }

  const handleNext = () => {
    if (isLast) {
      setSelected(0)
    } else {
      setSelected(selected + 1)
    }
  }

  return(
    <>
      <div>
        <div className='d-flex justify-content-center' onClick={() => setModal(true)}>
          <Image
            width='100%'
            height='100%'
            src={formatted[selected]?.path}
            alt={formatted[selected]?.altText || `Picture of ${formatted[selected]?.title}`}
          />
        </div>
        <div className='row mt-3'>
          {remaining?.map((photo, key) => (
            <div key={photo?.path} className='col-4 p-2' onClick={() => setSelected(photo.index)}>
              <Image
                width='100%'
                height='100%'
                src={photo?.path}
                alt={photo.altText || `Picture of ${photo.title}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div style={{ width: '100%', height: '100vh', background: 'black', left: 0, top: 0, position: 'fixed', zIndex: modal ? 100 : -10, opacity: modal ? 1 : 0, transition: 'opacity 200ms ease' }} className='d-flex justify-content-center align-items-center'>
        {modal && (
          <Image
            width={height - 100}
            height={height - 100}
            src={formatted[selected]?.path}
            style={{ objectFit: 'contain' }}
            alt={formatted[selected]?.altText || `Picture of ${formatted[selected]?.title}`}
          />
        )}
        <div style={{ position: 'absolute', right: 22, top: 22 }} onClick={() => setModal(false)}>
          <BsX style={{ color: '#fefcf3', fontSize: 32 }} />
        </div>
        <div style={{ position: 'absolute', left: 22, top: '50%', transform: 'translate(0%, -50%)' }} onClick={handleBack}>
          <BsChevronLeft style={{ color: '#fefcf3', fontSize: 28 }} />
        </div>
        <div style={{ position: 'absolute', right: 22, top: '50%', transform: 'translate(0%, -50%)' }} onClick={handleNext}>
          <BsChevronRight style={{ color: '#fefcf3', fontSize: 28 }} />
        </div>
      </div>
    </>
  )
}
