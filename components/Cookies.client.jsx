import CookieConsent from "react-cookie-consent";

export const TheoCookieConsent = () => {
  return(
    <CookieConsent
      buttonText="OK"
      location="bottom"
      cookieName="theodent-consent-cookie-2"
      style={{ background: "#2A1B16", color: '#fefcf3', zIndex: 1000001 }}
      buttonStyle={btnStyle}
    >
      <div className='theo-h3' style={{ color: '#fefcf3' }}>This website uses cookies to enhance the user experience.</div>
    </CookieConsent>
  )
}

const btnStyle = {
  border: '1.5px solid #fefcf3',
  color: "#fefcf3",
  fontFamily: 'acumin-pro, sans-serif',
  fontWeight: 700,
  fontSize: 14,
  height: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: 250,
  cursor: 'pointer',
  outline: 'none',
  background: '#2A1B16'
}
