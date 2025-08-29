/* eslint-disable hydrogen/prefer-image-component */
import {Image} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';

export function Hero() {
  return (
    <>
      <section className="hero d-block d-lg-none">
        <img
          className="hero-img mb-4"
          alt={'theodent hero banner'}
          src={'/imgs/blackFridayBanner2Sm.webp'}
          style={{position: 'static', width: '100%', objectFit: 'contain'}}
        />
        <div
          className="container d-flex align-items-center"
          style={{height: '50%', width: '100%'}}
        >
          <div className="hero-content">
            <div className="theo-h1">
              Fluoride-free Toothpaste Powered by Cacao
            </div>
            <div
              className="theo-h3 mt-3 mb-4"
              style={{fontSize: 20, lineHeight: '32px'}}
            >
              Clinically proven to be safer and more effective than fluoride
            </div>
            <Link to={`/products`} style={{textDecoration: 'none'}}>
              <div className="theo-btn hero-btn">SHOP THEODENT</div>
            </Link>
          </div>
        </div>
      </section>
      <section className="hero d-none d-lg-block">
        <div
          className="container d-flex align-items-center"
          style={{height: '100%', width: '100%'}}
        >
          <div className="hero-content">
            <div className="theo-h1" style={{color: '#fefcf3'}}>
              Fluoride-free Toothpaste Powered by Cacao
            </div>
            <div
              className="theo-h3 mt-3 mb-4"
              style={{fontSize: 20, lineHeight: '32px', color: '#fefcf3'}}
            >
              Clinically proven to be safer and more effective than fluoride
            </div>
            <Link to={`/products`} style={{textDecoration: 'none'}}>
              <div
                className="theo-btn"
                style={{
                  maxWidth: 320,
                  color: '#fefcf3',
                  borderColor: '#fefcf3',
                }}
              >
                SHOP THEODENT
              </div>
            </Link>
          </div>
          <Image
            width="100%"
            height="100%"
            className="hero-img"
            style={{height: '100%'}}
            alt={'theodent hero banner'}
            src={'/imgs/blackFridayBanner2.webp'}
          />
        </div>
      </section>
    </>
  );
}

//#2a1b16
//#2A1B16
