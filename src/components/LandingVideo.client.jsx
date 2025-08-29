import {useState, useRef, useEffect} from 'react';
import Video from '../assets/newVideo.mp4';
import {useInViewport} from 'react-in-viewport';

const VideoSection = () => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [showMute, setShowMute] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const showMuteBtn = showMute && muted;

  const {inViewport} = useInViewport(
    videoRef,
    {},
    {disconnectOnLeave: false},
    {},
  );

  useEffect(() => {
    if (inViewport) {
      if (!hasPlayed) {
        setShowMute(true);
        setHasPlayed(true);
        setTimeout(() => setShowMute(false), 5000);
        videoRef?.current?.play();
      } 
    }
  }, [inViewport]);

  return (
    <div
      style={{width: '100%', position: 'relative'}}
      className="landing-video"
    >
      <video
        muted={muted}
        ref={videoRef}
        controls
        style={{width: '100%'}}
        src={Video}
        type="video/mp4"
        playsInline="1"
      />
      <div
        onClick={() => setMuted(false)}
        className="theo-btn swimline-btn swimline-btn shadow mute-btn"
        style={{
          position: 'absolute',
          background: '#2A1B16',
          color: 'white',
          transform: showMuteBtn ? 'translate(0%, 0%)' : 'translate(150%, 0%)',
          transition: 'all 220ms linear',
        }}
      >
        Click Here to Unmute
      </div>
    </div>
  );
};

export default VideoSection;
