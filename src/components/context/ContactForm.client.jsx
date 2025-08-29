import {isServer} from '@shopify/hydrogen';
import {useForm} from './useForm.client';
import Toast from 'react-bootstrap/Toast';
import Portal from '../Portal';

export const ContactForm = () => {
  const { msg, values, setMsg, updateValues, handleContactEmail } = useForm();

  return(
    <>
      <div>
        <div className='col-12 mt-3 mt-lg-4'>
          <input value={values?.name || ''} onChange={(e) => updateValues(e.target.value, 'name')} placeholder='George Whitetooth' className='theo-input' style={{ width: '100%', maxWidth: '100%', border: '2px solid #2A1B16' }} />
        </div>
        <div className='col-12 mt-3 mt-lg-4'>
          <input value={values?.email || ''} onChange={(e) => updateValues(e.target.value, 'email')} placeholder='george@gmail.com' className='theo-input' style={{ width: '100%', maxWidth: '100%', border: '2px solid #2A1B16' }} />
        </div>
        <div className='col-12 mt-3 mt-lg-4'>
          <input value={values?.phone || ''} onChange={(e) => updateValues(e.target.value, 'phone')} placeholder='781-245-9098' className='theo-input' style={{ width: '100%', maxWidth: '100%', border: '2px solid #2A1B16' }} />
        </div>
        <div className='col-12 mt-3 mt-lg-4'>
          <textarea value={values?.message || ''} onChange={(e) => updateValues(e.target.value, 'message')} placeholder='How can we help you?' className='theo-input' style={{ width: '100%', maxWidth: '100%', border: '2px solid #2A1B16', height: 160 }} />
        </div>
        <div className='theo-btn mt-3 mt-lg-4' onClick={handleContactEmail}>SEND</div>
      </div>
      {!isServer() && (
        <Boast show={msg?.length > 0} hide={() => setMsg("")} msg={msg} />
      )}
    </>
  )
}

const Boast = ({ show, hide, msg }) => {
  return(
    <Portal>
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 100000000 }}>
        <Toast show={show} onClose={hide}>
         <Toast.Body>
          <div className='theo-h3'>{msg}</div>
        </Toast.Body>
       </Toast>
      </div>
    </Portal>
  )
}
