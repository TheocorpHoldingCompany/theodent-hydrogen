import {Image} from '@shopify/hydrogen';

export const PageHeader = ({
  imgPath,
  title,
  preHeader,
  border = true,
  maxWidth,
  imgContainer,
  isBlog,
}) => {
  if (isBlog) {
    return (
      <>
        <div className="container d-flex justify-content-center align-items-start mt-5">
          <div style={{width: '100%', maxWidth: maxWidth || 920}} className="">
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="pages-pre-header">{preHeader}</div>
                <div className="pages-h1 mb-3" style={{lineHeight: '38px'}}>
                  {title}
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <img style={{width: '100%'}} alt="" src={imgPath} />
              </div>
            </div>
            <div
              style={{
                width: '100%',
                height: 2,
                background: '#CC8A51',
                opacity: border ? 1 : 0,
              }}
              className="mt-4 mt-lg-5"
            />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className={`d-flex justify-content-center align-items-start mb-4 mb-lg-5`}
        >
          <Image
            width="100%"
            height="100%"
            src={imgPath}
            className="page-header-img"
            alt={`${title} cover photo`}
          />
        </div>
        <div className="container d-flex justify-content-center align-items-start">
          <div style={{width: '100%', maxWidth: maxWidth || 920}} className="">
            <div className="pages-pre-header">{preHeader}</div>
            <div className="pages-h1 mb-2">{title}</div>
            <div
              style={{
                width: '100%',
                height: 2,
                background: '#CC8A51',
                opacity: border ? 1 : 0,
              }}
            />
          </div>
        </div>
      </>
    );
  }
};

// import {Image} from '@shopify/hydrogen';
//
// export const PageHeader = ({ imgPath, title, preHeader, border = true, maxWidth, imgContainer }) => {
//   return(
//     <>
//       <div className={`d-flex justify-content-center align-items-start ${maxWidth ? '' : 'mt-md-5'} mb-4 mb-lg-5 ${imgContainer && 'container'}`}>
//         <Image
//           // className="swimline-img"
//           width='100%'
//           height='100%'
//           className='page-header-img'
//           src={imgPath}
//           alt={`${title} cover photo`}
//           style={{ maxWidth: maxWidth || 920 }}
//           // loading={loading}
//         />
//         <Image
//           // className="swimline-img"
//           width='100%'
//           height='100%'
//           className='page-header-img-sm'
//           src={imgPath?.replace('.png', 'sm.png')}
//           alt={`${title} cover photo`}
//           style={{ maxWidth: maxWidth || 920 }}
//           // loading={loading}
//         />
//       </div>
//       <div className='container d-flex justify-content-center align-items-start'>
//         <div style={{ width: '100%', maxWidth: maxWidth || 920 }} className=''>
//           <div className='pages-pre-header'>{preHeader}</div>
//           <div className='pages-h1 mb-2'>{title}</div>
//           <div style={{ width: '100%', height: 2, background: '#CC8A51', opacity: border ? 1 : 0 }} />
//         </div>
//       </div>
//     </>
//   )
// }
