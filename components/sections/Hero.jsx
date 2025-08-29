/* eslint-disable hydrogen/prefer-image-component */
import {Image, Link} from '@shopify/hydrogen';

export function Hero({
  byline,
  cta,
  handle,
  heading,
  height,
  loading,
  spread,
  spreadSecondary,
  top,
}) {
  return (
    <>
      <section className="hero d-block d-lg-none">
        <img
          className="hero-img mb-4"
          src={'/imgs/blackFridayBanner.webp'}
          alt={'theodent hero banner'}
          style={{position: 'static', width: '100%', objectFit: 'contain'}}
        />
        <div
          className="container d-flex align-items-center"
          style={{height: '50%', width: '100%'}}
        >
          <div className="hero-content">
            <div className="theo-h1">Black Friday BOGO</div>
            <div
              className="theo-h3 mt-3 mb-4"
              style={{fontSize: 20, lineHeight: '32px'}}
            >
              Buy one Theodent Kids Chocolate Toothpaste, get one free! Nov.
              25th - Dec. 2nd
            </div>
            <Link
              to={`/products/theodent-kids?title=theodent%20kids%20toothpaste`}
              style={{textDecoration: 'none'}}
            >
              <div className="theo-btn hero-btn">GET THE DEAL</div>
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
            <div className="theo-h1">Black Friday BOGO</div>
            <div
              className="theo-h3 mt-3 mb-4"
              style={{fontSize: 20, lineHeight: '32px'}}
            >
              Buy one Theodent Kids Chocolate Toothpaste, get one free! Nov.
              25th - Dec. 2nd
            </div>
            <Link
              to={`/products/theodent-kids?title=theodent%20kids%20toothpaste`}
              style={{textDecoration: 'none'}}
            >
              <div className="theo-btn" style={{maxWidth: 320}}>
                GET THE DEAL
              </div>
            </Link>
          </div>
          <Image
            width="100%"
            height="100%"
            className="hero-img"
            src={'/imgs/blackFridayBanner.webp'}
            alt={'theodent hero banner'}
            style={{height: '100%'}}
            // loading={loading}
          />
        </div>
      </section>
    </>
  );
}
