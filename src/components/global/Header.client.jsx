import {useCart} from '@shopify/hydrogen';
import {Link, useLocation, useNavigate} from '@remix-run/react';
import {useWindowScroll} from 'react-use';
import {Twirl as Hamburger} from 'hamburger-react';
import {useState, useEffect} from 'react';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import {Text} from '~/components';
import {BsX} from 'react-icons/bs';

import {
  Heading,
  IconAccount,
  IconBag,
  IconMenu,
  IconSearch,
  Input,
} from '~/components';

import {CartDrawer} from './CartDrawer.client';
import {MenuDrawer} from './MenuDrawer.client';
import {useDrawer} from './Drawer.client';
import {CartIcon, CartIconFill} from '../../assets/cartIcon';
import {HeaderDropdown} from './HeaderDropdown.client';
import {ProductDetail, ProductDetail3} from '~/components';
import {AiOutlineMenu} from 'react-icons/ai';
import {ExampleDrop} from '../product/ProductDetail.client';
import {BsChevronDown} from 'react-icons/bs';

// const countrieOptions = [
//   { label: 'USD', value: 'US', flag: "🇺🇸", mobileLabel: '🇺🇸 UNITED STATES' },
//   { label: 'CAD', value: 'CA', flag: "🇨🇦", mobileLabel: '🇨🇦 CANADA' },
//   { label: 'AUD', value: 'AU', flag: "🇦🇺", mobileLabel: '🇦🇺 AUSTRALIA' },
//   { label: 'GBP', value: 'GB', flag: "🇬🇧", mobileLabel: '🇬🇧 UNITED KINGDOM' },
//   { label: 'EU', value: 'FR', flag: "🇪🇺", mobileLabel: '🇪🇺 EUROPEAN UNION' },
// ]

/**
 * A client component that specifies the content of the header on the website
 */
export const Header = ({title, menu}) => {
  const {pathname} = useLocation();
  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;
  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;
  const [cartOpen, setCartOpen] = useState(false);
  const [alert, setAlert] = useState(true);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  return (
    <>
      <CartDrawer
        alert={alert}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
      <DesktopHeader
        alert={alert}
        isHome={isHome}
        setAlert={setAlert}
        pathname={pathname}
        cartOpen={cartOpen}
        toggleCart={toggleCart}
        countryCode={countryCode}
      />
      <MobileHeader
        countryCode={countryCode}
        toggleCart={toggleCart}
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        cartOpen={cartOpen}
        pathname={pathname}
        setAlert={setAlert}
        openMenu={openMenu}
        alert={alert}
      />
    </>
  );
};

const MobileHeader = ({
  toggleCart,
  cartOpen,
  openMenu,
  isMenuOpen,
  closeMenu,
  countryCode,
  pathname,
  alert,
}) => {
  const {y} = useWindowScroll();
  const {totalQuantity, cost} = useCart();
  const [dropdown, setDropdown] = useState(false);

  const shippingMsg = () => {
    if (cost) {
      let difference = 100 - cost?.subtotalAmount?.amount;
      if (difference < 1) {
        return 'Your order qualifies for free shipping!';
      } else {
        return `You are $${difference} away from free shipping!`;
      }
    } else {
      return 'Free shipping on orders $100+';
    }
  };

  const handleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };
  //<div>Our new packaging and website have officially launched! If you have any ideas on how we can further improve, please leave us <a target='_blank' href='https://forms.gle/zgDvneU86ph1FEsr7' style={{ marginLeft: 2, textDecoration: 'underline', color: '#2A1B16' }}>your feedback</a>. We very much appreciate it!</div>
  const styles = {
    container: {
      width: '100%',
      height: alert ? 165 : 120,
      background: '#2A1B16',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
    },
  };

  return (
    <>
      {alert && (
        <div
          style={{width: '100%', height: 45}}
          className="d-block d-lg-none"
        />
      )}
      <header
        role="banner"
        className="d-block d-lg-none"
        style={styles.container}
      >
        {alert && (
          <div
            style={{
              width: '100%',
              height: 45,
              background: '#fefcf3',
              fontSize: 14,
              lineHeight: 1.2,
              textAlign: 'center',
            }}
            className="d-flex justify-content-between align-items-center theo-h3 pl-3 pr-3"
          >
            <div style={{width: 18}} />
            <div>{shippingMsg()}</div>
            <div style={{width: 18}} />
          </div>
        )}
        <div
          style={{height: 120, paddingTop: alert ? 8 : 0}}
          className="container d-flex justify-content-between align-items-center"
        >
          <button
            onClick={handleMenu}
            style={{paddingTop: 6}}
            aria-label="Menu Button"
          >
            <Hamburger toggled={isMenuOpen} size={22} color="#ffffff" />
          </button>
          <a href="/">
            <img
              alt="theodent logo"
              src="/imgs/theodent-logo.png"
              style={{width: 224, marginTop: -16}}
            />
          </a>
          <CartBtn cartOpen={cartOpen} toggleCart={toggleCart} />
        </div>
      </header>
      <div
        style={{height: 140, background: '#2A1B16', marginTop: -20}}
        className="d-block d-lg-none"
      />
      <MobileMenu
        open={isMenuOpen}
        openMenu={openMenu}
        closeMenu={closeMenu}
        countryCode={countryCode}
        pathname={pathname}
        alert={alert}
      />
    </>
  );
};

const DesktopHeader = ({
  toggleCart,
  cartOpen,
  countryCode,
  pathname,
  isHome,
  alert,
  setAlert,
}) => {
  const {y} = useWindowScroll();
  const {totalQuantity, cost} = useCart();
  const scrollDirection = useScrollDirection();
  const [dropdown, setDropdown] = useState(false);

  const styles = {
    container: {
      width: '100%',
      height: alert ? 165 : 120,
      background: '#2A1B16',
      position: 'sticky',
      left: 0,
      top: 0,
      zIndex: 100,
      transform:
        scrollDirection === 'down'
          ? 'translate(0%, -100%)'
          : 'translate(0%, 0%)',
      transition: 'all 220ms linear',
    },
  };

  // const handleCountrySelect = (_newValue) => {
  //   let newValue = _newValue?.target?.value;
  //   setCountry(newValue);
  //   let location = window.location;
  //
  //   if (country?.length > 0) {
  //     let oldPath = pathname.slice(4);
  //     let newUrl = `${location.origin}/${newValue}/${oldPath}`;
  //     window.location.replace(newUrl)
  //   } else {
  //     let newUrl = `${location.origin}/${newValue}${pathname}`;
  //     window.location.replace(newUrl)
  //   }
  // }
  // <select value={country} onChange={(e) => handleCountrySelect(e)} style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 24, marginTop: 6 }}>
  //   {countrieOptions?.map((co, key) => (
  //     <option style={{ fontSize: 40 }} key={key} value={co.value}>{co.flag}</option>
  //   ))}
  // </select>

  const shippingMsg = () => {
    if (cost) {
      let difference = 100 - cost?.subtotalAmount?.amount;
      if (difference < 1) {
        return 'Your order qualifies for free shipping!';
      } else {
        return `You are $${difference} away from free shipping!`;
      }
    } else {
      return 'Free shipping on orders $100+';
    }
  };

  return (
    <>
      <header
        role="banner"
        className="d-none d-lg-block"
        style={styles.container}
      >
        {alert && (
          <div
            style={{
              width: '100%',
              height: 45,
              background: '#fefcf3',
              fontSize: 14,
              lineHeight: 1.2,
              textAlign: 'center',
            }}
            className="d-flex justify-content-between align-items-center theo-h3 pl-3 pr-3"
          >
            <div style={{width: 18}} />
            <div>{shippingMsg()}</div>
            <div style={{width: 18}} />
          </div>
        )}
        <div
          style={{height: 120}}
          className="container d-flex justify-content-between align-items-center"
        >
          <div className="d-flex justify-content-start align-items-center">
            <Link to="/">
              <img
                alt=""
                src="/imgs/theodent-logo.png"
                style={{width: 244, marginTop: -16, marginRight: 30}}
              />
            </Link>
            <div
              className="header-btn"
              style={{width: 110}}
              onMouseEnter={() => setDropdown('shop')}
              onMouseLeave={() => setDropdown('')}
            >
              <Link
                to={'/products'}
                className="header-btn"
                style={{textDecoration: 'none'}}
              >
                SHOP
              </Link>
              <HeaderDropdown
                btn="shop"
                show={dropdown === 'shop'}
                setShow={setDropdown}
              />
            </div>
            <div
              className="header-btn"
              style={{width: 134}}
              onMouseEnter={() => setDropdown('learn')}
              onMouseLeave={() => setDropdown('')}
            >
              <Link
                to={'/pages/technology'}
                className="header-btn"
                style={{textDecoration: 'none'}}
              >
                LEARN
              </Link>
              <HeaderDropdown
                btn="learn"
                show={dropdown === 'learn'}
                setShow={setDropdown}
              />
            </div>
            <div
              className="header-btn"
              style={{width: 212}}
              onMouseEnter={() => setDropdown('pro')}
              onMouseLeave={() => setDropdown('')}
            >
              <Link
                to={'/pages/clinical-information'}
                className="header-btn"
                style={{textDecoration: 'none'}}
              >
                PROFESSIONAL
              </Link>
              <HeaderDropdown
                btn="pro"
                show={dropdown === 'pro'}
                setShow={setDropdown}
              />
            </div>
            <div
              className="header-btn"
              style={{width: 158}}
              onMouseEnter={() => setDropdown('contact')}
              onMouseLeave={() => setDropdown('')}
            >
              <Link
                to={'/pages/contact-us'}
                className="header-btn"
                style={{textDecoration: 'none'}}
              >
                CONTACT
              </Link>
              <HeaderDropdown
                btn="contact"
                show={dropdown === 'contact'}
                setShow={setDropdown}
              />
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <CartBtn cartOpen={cartOpen} toggleCart={toggleCart} />
          </div>
        </div>
      </header>
    </>
  );
};

const MobileMenu = ({
  open,
  openMenu,
  closeMenu,
  countryCode,
  pathname,
  alert,
}) => {
  // const [country, setCountry] = useState(countryCode || '');

  useEffect(() => {
    let root = document.querySelector('#root');
    if (open) {
      disableBodyScroll(root);
    } else {
      enableBodyScroll(root);
    }
  }, [open]);

  // const handleCountrySelect = (_newValue) => {
  //   let newValue = _newValue?.target?.value;
  //   setCountry(newValue);
  //   let location = window.location;
  //
  //   if (country?.length > 0) {
  //     let oldPath = pathname.slice(4);
  //     let newUrl = `${location.origin}/${newValue}/${oldPath}`;
  //     window.location.replace(newUrl)
  //   } else {
  //     let newUrl = `${location.origin}/${newValue}${pathname}`;
  //     window.location.replace(newUrl)
  //   }
  // }
  // <div className='d-flex justify-content-center'>
  //   <select value={country} onChange={(e) => handleCountrySelect(e)} style={{ color: 'rgb(80, 44, 29)', textAlign: 'center', fontWeight: 500, marginTop: 5, paddingLeft: 0, paddingRight: 0, background: 'transparent', border: 'none', outline: 'none', fontSize: 18 }}>
  //     {countrieOptions?.map((co, key) => (
  //       <option style={{ fontSize: 40 }} key={key} value={co.value}>
  //         {co.mobileLabel}
  //       </option>
  //     ))}
  //   </select>
  // </div>

  const ShopDrop = () => {
    return (
      <>
        <Link
          onClick={closeMenu}
          to="/products/theodent-classic"
          className="header-dropdown-btn"
          style={{height: 52}}
        >
          <img alt="" src="/imgs/classic.png" style={{height: 20}} />
        </Link>
        <div style={{width: '100%', height: 1, background: '#CC8A52'}} />
        <Link
          onClick={closeMenu}
          to="/products/theodent-kids"
          className="header-dropdown-btn"
          style={{height: 52}}
        >
          <img alt="" src="/imgs/kids.png" style={{height: 24}} />
        </Link>
        <div style={{width: '100%', height: 1, background: '#CC8A52'}} />
        <Link
          onClick={closeMenu}
          to="/products/theodent-300"
          className="header-dropdown-btn"
          style={{height: 52}}
        >
          <img alt="" src="/imgs/300.png" style={{height: 24}} />
        </Link>
        <div style={{width: '100%', height: 1, background: '#CC8A52'}} />
        <Link
          onClick={closeMenu}
          to="/products"
          className="header-dropdown-btn mt-1 mb-3"
        >
          SHOP ALL
        </Link>
      </>
    );
  };

  const LearnDrop = () => {
    return (
      <>
        <Link
          onClick={closeMenu}
          to="/pages/technology"
          className="header-dropdown-btn mb-2"
        >
          THE TECHNOLOGY
        </Link>
        <div style={{width: '100%', height: 1, background: '#CC8A52'}} />
        <Link
          onClick={closeMenu}
          to="/pages/ingredients"
          className="header-dropdown-btn mb-2 mt-1"
        >
          THE INGREDIENTS
        </Link>
        <div style={{width: '100%', height: 1, background: '#CC8A52'}} />
        <Link
          onClick={closeMenu}
          to="/pages/company"
          className="header-dropdown-btn mb-2 mt-1"
        >
          THE COMPANY
        </Link>
        <div style={{width: '100%', height: 1, background: '#CC8A52'}} />
        <Link
          onClick={closeMenu}
          to="/blogs"
          className="header-dropdown-btn mb-1 mt-3"
        >
          THE BLOG
        </Link>
      </>
    );
  };

  const ProDrop = () => {
    return (
      <>
        <Link
          onClick={closeMenu}
          to="/pages/clinical-information"
          className="header-dropdown-btn mb-3 mt-1"
        >
          CLINICAL INFORMATION
        </Link>
      </>
    );
  };

  const ConDrop = () => {
    return (
      <>
        <Link
          onClick={closeMenu}
          to="/pages/contact-us"
          className="header-dropdown-btn mb-2"
        >
          HOW TO CONTACT
        </Link>
        <div style={{width: '100%', height: 1, background: '#CC8A52'}} />
        <Link
          onClick={closeMenu}
          to="/pages/faqs"
          className="header-dropdown-btn mb-2 mt-1"
        >
          FAQ's
        </Link>
        <div style={{width: '100%', height: 1, background: '#CC8A52'}} />
        <Link
          onClick={closeMenu}
          to="/pages/store-locator"
          className="header-dropdown-btn mb-2 mt-1"
        >
          STORE LOCATOR
        </Link>
        <div style={{width: '100%', height: 1, background: '#CC8A52'}} />
        <a
          onClick={closeMenu}
          target="_blank"
          href="https://forms.gle/zgDvneU86ph1FEsr7"
          className="header-dropdown-btn mb-3 mt-1"
        >
          FEEDBACK
        </a>
      </>
    );
  };

  const btns = [
    {
      buttonText: 'SHOP',
      panelText: <ShopDrop />,
      id: 'disclosure-panel-1',
      isOpen: false,
    },
    {
      buttonText: 'LEARN',
      panelText: <LearnDrop />,
      id: 'disclosure-panel-2',
      isOpen: false,
    },
    {
      buttonText: 'PROFESSIONAL',
      panelText: <ProDrop />,
      id: 'disclosure-panel-3',
      isOpen: false,
    },
    {
      buttonText: 'CONTACT',
      panelText: <ConDrop />,
      id: 'disclosure-panel-4',
      isOpen: false,
    },
  ];

  return (
    <div
      className="d-block d-lg-none"
      style={{
        width: '100%',
        height: open ? 'calc(100vh)' : '0px',
        transition: 'all 220ms linear',
        position: 'fixed',
        left: 0,
        top: alert ? 165 : 120,
        background: '#fefcf3',
        zIndex: 1000,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '10px 20px 280px 20px',
          height: '100%',
          overflow: 'scroll',
        }}
      >
        <ExampleDrop btns={btns} />
        <div style={{width: '100%', height: 2, background: '#CC8A51'}} />
      </div>
    </div>
  );
};

const CartBtn = ({cartOpen, toggleCart}) => {
  const {totalQuantity} = useCart();

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{cursor: 'pointer', width: 48, height: 48}}
    >
      {!cartOpen && (
        <button onClick={toggleCart} aria-label="Cart Button">
          {totalQuantity === 0 && <CartIcon />}
          {totalQuantity > 0 && (
            <div style={{position: 'relative'}}>
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: -2,
                  transform: 'translate(-50%, 0%)',
                  fontSize: 13,
                  fontWeight: 600,
                }}
                className="theo-h2"
              >
                {totalQuantity}
              </div>
              <CartIconFill />
            </div>
          )}
        </button>
      )}
      {cartOpen && (
        <button aria-label="Cart Button">
          {totalQuantity === 0 && <CartIcon />}
          {totalQuantity > 0 && (
            <div style={{position: 'relative'}}>
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: -2,
                  transform: 'translate(-50%, 0%)',
                  fontSize: 13,
                  fontWeight: 600,
                }}
                className="theo-h2"
              >
                {totalQuantity}
              </div>
              <CartIconFill />
            </div>
          )}
        </button>
      )}
    </div>
  );
};

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener('scroll', updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener('scroll', updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return scrollDirection;
}
