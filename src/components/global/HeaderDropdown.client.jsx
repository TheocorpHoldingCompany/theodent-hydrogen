import {Link} from '@remix-run/react';

export const HeaderDropdown = ({ show, setShow, btn }) => {
  const btns = {
    shop: (
      <>
        <Link to='/products/theodent-classic'  className='header-dropdown-btn' style={{ height: 52 }}>
          <img alt='' src='/imgs/classic.png' style={{ height: 20 }} />
        </Link>
        <div style={{ width: '100%', height: 1, background: '#CC8A52' }} />
        <Link to='/products/theodent-kids' className='header-dropdown-btn' style={{ height: 52 }}>
          <img alt='' src='/imgs/kids.png' style={{ height: 24 }} />
        </Link>
        <div style={{ width: '100%', height: 1, background: '#CC8A52' }} />
        <Link to='/products/theodent-300' className='header-dropdown-btn' style={{ height: 52 }}>
          <img alt='' src='/imgs/300.png' style={{ height: 24 }} />
        </Link>
        <div style={{ width: '100%', height: 1, background: '#CC8A52' }} />
        <Link to='/products' className='header-dropdown-btn mt-1'>SHOP ALL</Link>
      </>
    ),
    learn: (
      <>
        <Link to='/pages/technology' className='header-dropdown-btn mb-2'>THE TECHNOLOGY</Link>
        <div style={{ width: '100%', height: 1, background: '#CC8A52' }} />
        <Link to='/pages/ingredients' className='header-dropdown-btn mb-2 mt-1'>THE INGREDIENTS</Link>
        <div style={{ width: '100%', height: 1, background: '#CC8A52' }} />
        <Link to='/pages/company' className='header-dropdown-btn mb-2 mt-1'>THE COMPANY</Link>
        <div style={{ width: '100%', height: 1, background: '#CC8A52' }} />
        <Link to='/blogs' className='header-dropdown-btn mb-1 mt-1'>THE BLOG</Link>
      </>
    ),
    pro: (
      <>
        <Link to='/pages/clinical-information' className='header-dropdown-btn mb-1 mt-1'>CLINICAL INFORMATION</Link>
      </>
    ),
    contact: (
      <>
        <Link to='/pages/contact-us' className='header-dropdown-btn mb-2'>HOW TO CONTACT</Link>
        <div style={{ width: '100%', height: 1, background: '#CC8A52' }} />
        <Link to='/pages/faqs' className='header-dropdown-btn mb-2 mt-1'>FAQ's</Link>
        <div style={{ width: '100%', height: 1, background: '#CC8A52' }} />
        <a target='_blank' href='https://forms.gle/zgDvneU86ph1FEsr7' className='header-dropdown-btn mb-1 mt-1'>FEEDBACK</a>
      </>
    ),
  }

  return(
    <div style={{ display: show ? '' : 'none', position: 'absolute', left: '50%', bottom: 0, width: 300, transform: 'translate(-50%, 100%)', zIndex: show ? 101 : -10, opacity: show ? 1 : 0 }}>
      <div style={{ border: '1px solid #CC8A52', background: '#fefcf3', padding: '12px 30px', boxShadow: '-10px 10px 10px rgba(200,169,119,.25)', marginTop: 30 }}>
        {btns[btn]}
      </div>
    </div>
  )
}



// all blogs
// blog post
// make sure find us is working
// clinical
// cart
// share on tech page
// tech footnotes
// ingredients images & rennou logo
