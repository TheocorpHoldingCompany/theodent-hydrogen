export const LetterIcon = ({ style = {}, fill = '#fefcf3' }) => {
  let cls1 = { fill: fill };

  return(
    <svg id="Layer_1" dataname="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: 20, ...style }}>
      <path style={cls1} d="M23.05,20.65H.89A.91.91,0,0,1,0,19.74V4.32a.9.9,0,0,1,.91-.91H23.05a.92.92,0,0,1,.92.92V19.74A.92.92,0,0,1,23.05,20.65ZM1.8,18.83H22.14V5.24H1.79Z"/>
      <path style={cls1} d="M12.08,12.94a.91.91,0,0,1-.52-.16L.36,5.07l1-1.5,10.68,7.35L22.53,3.58l1,1.49-11,7.71A.91.91,0,0,1,12.08,12.94Z"/>
    </svg>
  )
}
