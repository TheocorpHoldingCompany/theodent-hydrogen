import {Link} from '@shopify/hydrogen';

export const FooterBtns = () => {
  return(
    <div className='row mt-5 pt-3'>
      <div className='col-12 col-md-6'>
        <div className='pages-pre-header'>Have more questions about our products?</div>
        <Link to={`/pages/faqs`} style={{ textDecoration: 'none' }}>
          <div className='theo-btn mt-3 mb-4'>VISIT THE FAQ PAGE</div>
        </Link>
        <div style={{ width: '100%', height: 2, background: '#CC8A52' }} />
      </div>
      <div className='col-12 col-md-6 mt-5 mt-lg-0'>
        <div className='pages-pre-header'>Ready to boost your health now?</div>
        <Link to={`/products`} style={{ textDecoration: 'none' }}>
          <div className='theo-btn mt-3 mb-4'>SHOP FOR THEODENT</div>
        </Link>
        <div style={{ width: '100%', height: 2, background: '#CC8A52' }} />
      </div>
    </div>
  )
}
