import { useState } from 'react';
import {FbIcon} from '~/assets/fbIcon';
import {LetterIcon} from '~/assets/letterIcon';
import {BsLink45Deg} from 'react-icons/bs';
import {AiOutlineTwitter} from 'react-icons/ai';

import { FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share";

export const Share = ({ handle = 'https://theodent.com', body }) => {
  const [open, setOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(handle);
    setOpen(true);
    setTimeout(() => setOpen(false), 2500);
  }

  return(
    <div className='d-flex justify-content-start mt-2 mb-3'>
      <FacebookShareButton url={handle} quote={body?.title}>
        <FbIcon style={{ marginRight: 20 }} fill='#2A1B16' />
      </FacebookShareButton>
      <TwitterShareButton url={handle} title={body?.title}>
        <AiOutlineTwitter style={{ marginRight: 14, color: '#2A1B16', fontSize: 34 }} />
      </TwitterShareButton>
      <div onClick={handleCopy} style={{ marginRight: 20, position: 'relative' }}>
        <BsLink45Deg style={{ fontSize: 34, color: '#2A1B16' }} />
        <div className='theo-h3' style={{ fontSize: 12, fontWeight: 600, position: 'absolute', left: '50%', top: '-100%', transform: open ? 'translate(-50%, 0%)' : 'translate(-50%, 100%)', transition: 'all 200ms linear', opacity: open ? 1 : 0, zIndex: open ? 10 : -5, padding: '2px 12px', borderRadius: 5, background: '#2A1B16', color: '#fefcf3' }}>
          COPIED!
        </div>
      </div>
      <EmailShareButton url={handle} subject='Check out this arictle from THeodent'>
        <LetterIcon style={{ marginRight: 20, width: 30 }} fill='#2A1B16' />
      </EmailShareButton>
    </div>
  )
}
