const Compare = () => {
  return(
    <div className='container' style={{ paddingTop: 90 }}>
      <div className='row'>
        <div className='col-12 col-lg-4 pe-lg-4'>
          <div className='d-flex d-lg-block justify-content-center'>
            <img alt='' src='/imgs/usvthem.png' style={{ width: '80%', maxWidth: 200 }} />
          </div>
          <div className='mt-4 theo-h3'>
            No compromises, just clean and effective oral care. Theodent toothpaste is the only option that rapidly remineralizes enamel, reduces sensitivity, and contains non-toxic, clean ingredients.
          </div>
        </div>
        <div className='col-12 col-lg-8 mt-5 mt-lg-0' style={{ overflowX: 'scroll' }}>
          <img alt='' src='/imgs/compareChart.webp' style={{ width: '100%', minWidth: 600 }} />
        </div>
      </div>
    </div>
  )
}

export default Compare;
