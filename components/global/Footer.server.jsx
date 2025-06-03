import {Link} from '@shopify/hydrogen';

import {LetterIcon} from '../../assets/letterIcon';
import {PhoneIcon} from '../../assets/phoneIcon';
import {FbIcon} from '../../assets/fbIcon';
import {InstaIcon} from '../../assets/instaIcon';
/**
 * A server component that specifies the content of the footer on the website
 */
export function Footer() {
  return (
    <>
      <section className="theo-footer">
        <div className="container" style={{height: '100%'}}>
          <div className="row" style={{height: '100%'}}>
            <div className="col-12 col-lg-6 footer-section1 d-flex flex-col justify-content-between align-items-center align-items-lg-start">
              <img
                alt="theodent logo"
                src="/imgs/theodent-logo.png"
                style={{width: 300}}
              />
              <div className="theo-footer-input-wrap">
                <div
                  className="theo-h3"
                  style={{color: '#fefcf3', fontSize: 18}}
                >
                  Stay Informed
                </div>
                <div className="d-flex align-items-start mt-2">
                  <input
                    className="theo-input"
                    aria-label="Email List Signup"
                    style={{borderRadius: 0}}
                  />
                  <div className="theo-footer-subscribe-btn">Subscribe</div>
                </div>
              </div>
              <div className="d-flex">
                <Link
                  to="https://www.facebook.com/Theodent/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FbIcon style={{marginRight: 20}} />
                </Link>
                <Link
                  to="https://www.instagram.com/theodent/?hl=en"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <InstaIcon />
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-3 footer-section2 pt-4 pt-lg-0 ps-lg-4 d-flex justify-content-between flex-col mt-5 mt-lg-0 mb-4 mb-lg-0">
              <div>
                <div className="theo-footer-header mb-4">QUICK LINKS</div>
                <Link to="/products" className="theo-footer-btn">
                  Shop
                </Link>
                <br />
                <Link to="/pages/technology" className="theo-footer-btn">
                  Learn
                </Link>
                <br />
                <Link
                  to="/pages/clinical-information"
                  className="theo-footer-btn"
                >
                  Professional
                </Link>
                <br />
                <Link to="/pages/contact-us" className="theo-footer-btn">
                  Contact Us
                </Link>
              </div>
              <div className="pb-4">
                <div className="theo-footer-header mb-4">PRODUCTS</div>
                <Link to="/products/theodent-300" className="theo-footer-btn">
                  Theodent 300 Toothpaste
                </Link>
                <br />
                <Link
                  to="/products/theodent-classic"
                  className="theo-footer-btn"
                >
                  Theodent Classic Toothpaste
                </Link>
                <br />
                <Link to="/products/theodent-kids" className="theo-footer-btn">
                  Theodent Kids Toothpaste
                </Link>
                <br />
                <Link to="/products" className="theo-footer-btn">
                  Shop All
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-3 footer-section3 ps-none ps-lg-4 d-flex justify-content-between flex-col">
              <div>
                <div className="theo-footer-header mb-4">CUSTOMER CARE</div>
                <Link to="/pages/contact-us" className="theo-footer-btn">
                  Contact Us
                </Link>
                <br />
                <Link to="/pages/faqs" className="theo-footer-btn">
                  FAQ's
                </Link>
                <br />
                <Link to="/pages/shipping-returns" className="theo-footer-btn">
                  Shipping & Returns
                </Link>
                <br />
                <Link to="/pages/wholesale" className="theo-footer-btn">
                  Wholesalers
                </Link>
                <br />
              </div>
              <div className="pb-4">
                <div className="theo-footer-header mb-4">GET IN TOUCH</div>
                <a
                  href="tel:+1.504.264.5050"
                  className="theo-footer-btn d-flex align-items-center"
                >
                  <PhoneIcon style={{marginRight: 9, marginTop: 4}} />
                  +1.504.264.5050
                </a>
                <a
                  href="mailto:info@theo-corp.com"
                  className="theo-footer-btn d-flex align-items-center"
                >
                  <LetterIcon style={{marginRight: 9, marginTop: 4}} />
                  info@theo-corp.com
                </a>
                <div className="theo-footer-btn" style={{opacity: 0}}>
                  s
                </div>
                <div className="theo-footer-btn" style={{opacity: 0}}>
                  s
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="footer-section4" style={{background: '#fefcf3'}}>
        <div
          className="container d-flex flex-column flex-md-row justify-content-start justify-content-md-between align-items-center pt-3 pt-md-0"
          style={{height: '100%'}}
        >
          <div
            style={{fontSize: 15, color: '#2A1B16', letterSpacing: 0.3}}
            className="theo-footer-header text-center"
          >
            © 2023 Theodent, All Rights Reserved
          </div>
          <Link
            to={`/pages/privacy-policy`}
            style={{
              fontSize: 15,
              letterSpacing: 0.3,
              textDecoration: 'underline',
            }}
            className="theo-footer-header footer-pp-link pt-1 pt-md-0"
          >
            <div>Privacy & Policy</div>
          </Link>
        </div>
      </div>
    </>
  );
}
