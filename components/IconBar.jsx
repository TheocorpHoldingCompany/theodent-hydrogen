export const IconBar = ({border = true}) => {
  return (
    <>
      <div className="container" style={{marginTop: border ? 70 : 12}}>
        {border && (
          <div style={{width: '100%', height: 1.5, background: '#CC8A52'}} />
        )}
      </div>
      <div
        className="d-none d-md-flex justify-content-center align-items-center"
        style={{paddingTop: 70, paddingBottom: 90}}
      >
        <img alt="" src="/imgs/icon1.webp" style={{width: 100, margin: 22}} />
        <img alt="" src="/imgs/icon2.webp" style={{width: 100, margin: 22}} />
        <img alt="" src="/imgs/icon3.webp" style={{width: 100, margin: 22}} />
        <img alt="" src="/imgs/icon4.webp" style={{width: 100, margin: 22}} />
        <img alt="" src="/imgs/icon5.webp" style={{width: 100, margin: 22}} />
      </div>

      <div
        className="d-flex d-md-none justify-content-center align-items-center ps-3 pe-3"
        style={{paddingTop: 40}}
      >
        <img alt="" src="/imgs/icon1.webp" style={{width: 90, margin: 12}} />
        <img alt="" src="/imgs/icon2.webp" style={{width: 90, margin: 12}} />
        <img alt="" src="/imgs/icon3.webp" style={{width: 90, margin: 12}} />
      </div>
      <div
        className="d-flex d-md-none justify-content-center align-items-center ps-3 pe-3"
        style={{paddingTop: 18, paddingBottom: 40}}
      >
        <img alt="" src="/imgs/icon4.webp" style={{width: 90, margin: 12}} />
        <img alt="" src="/imgs/icon5.webp" style={{width: 90, margin: 12}} />
      </div>
    </>
  );
};
