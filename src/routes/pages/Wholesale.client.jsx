import { v4 as uuidv4 } from 'uuid';

export const WholesaleForm = () => {
  const id = uuidv4();

  return(
    <div
      className="pipedriveWebForms"
      data-pd-webforms={`https://pipedrivewebforms.com/form/cB7lHYVjIhk9Nw98t4Ix34luDEq28aOxPVQJZHCATINYYVIAByVfKemlrHT3NBLTLZ`}
      id={id}
      style={{
        width: '100%',
        height: '100%',
        minWidth: '320px',
        maxWidth: '480px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <iframe
        src={`https://pipedrivewebforms.com/form/cB7lHYVjIhk9Nw98t4Ix34luDEq28aOxPVQJZHCATINYYVIAByVfKemlrHT3NBLTLZ?embeded=1&uuid=${id}`}
        name={`https://shoptheodent.com/pages/clinical-information-${id}`}
        scrolling="no"
        seamless="seamless"
        style={{
          border: 'none',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '480px',
          minWidth: '320px',
          height: '100%',
          minHeight: '800px',
          position: 'relative',
        }}
      />
    </div>
  )
}
