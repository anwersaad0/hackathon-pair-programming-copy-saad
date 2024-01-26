import React, { useEffect } from 'react';
import { useJoin, usePublish, useLocalScreenTrack, useTrackEvent, LocalVideoTrack, useRTCScreenShareClient } from 'agora-rtc-react';
import config from './config';
import { useAppSelector } from '../hooks';

const ShareScreenComponent: React.FC<{ setScreenSharing: React.Dispatch<React.SetStateAction<boolean>> }> = ({
    setScreenSharing,
}) => {
    const screenShareClient = useRTCScreenShareClient();
  const user = useAppSelector((state) => state.session.user);


    // Use the useLocalScreenTrack hook to get the screen sharing track
    const { screenTrack, isLoading, error } = useLocalScreenTrack(true, {}, "disable", screenShareClient ? screenShareClient : undefined);


    // Join the channel using the screen share client
    useJoin(
        {
            appid: config.appId,
            channel: config.channelName,
            token: config.rtcToken,
            uid: user?.screenUid,
        },
        true,
        screenShareClient
    );

    // Handle the 'track-ended' event to stop screen sharing when the track ends
    useTrackEvent(screenTrack, 'track-ended', () => {
        setScreenSharing(false);
    });

    // Handle errors by stopping screen sharing
    useEffect(() => {
        if (error) setScreenSharing(false);
    }, [error, setScreenSharing]);

    // Publish the screen share track
    usePublish([screenTrack], screenTrack !== null, screenShareClient ? screenShareClient : undefined);

    if (isLoading) {
        return <p>Sharing screen...</p>;
    }
    return (
        <div id="videos">
                <LocalVideoTrack play style={{ width: '1920px', height: '1080px' }} track={screenTrack} />
        </div>
    );
};

export default ShareScreenComponent;

// OTHER COMPONENTS - https://docs.agora.io/en/video-calling/develop/product-workflow?platform=react-js

// const MuteVideoComponent: React.FC = () => {
//     const agoraContext = useAgoraContext();
//     const [isMuteVideo, setMuteVideo] = useState(false);

//     const toggleMuteVideo = () => {
//         agoraContext.localCameraTrack
//             ?.setEnabled(isMuteVideo)
//             .then(() => setMuteVideo((prev) => !prev))
//             .catch((error) => console.error(error));
//     };

//     return <button onClick={toggleMuteVideo}>{isMuteVideo ? 'Unmute Video' : 'Mute Video'}</button>;
// };

// const OnMicrophoneChangedHook: React.FC = () => {
//     const agoraContext = useAgoraContext();

//     useEffect(() => {
//         const onMicrophoneChanged = (changedDevice: DeviceInfo) => {
//             if (changedDevice.state === 'ACTIVE') {
//                 agoraContext.localMicrophoneTrack
//                     ?.setDevice(changedDevice.device.deviceId)
//                     .catch((error: IAgoraRTCError) => console.error(error));
//             } else if (changedDevice.device.label === agoraContext.localMicrophoneTrack?.getTrackLabel()) {
//                 AgoraRTC.getMicrophones()
//                     .then((devices) => agoraContext.localMicrophoneTrack?.setDevice(devices[0].deviceId))
//                     .catch((error) => console.error(error));
//             }
//         };
//         AgoraRTC.onMicrophoneChanged = onMicrophoneChanged;

//         return () => {
//             AgoraRTC.onMicrophoneChanged = undefined;
//         };
//     }, [agoraContext.localMicrophoneTrack]);
//     return null;
// };

// const OnCameraChangedHook: React.FC = () => {
//     const agoraContext = useAgoraContext();

//     useEffect(() => {
//         const onCameraChanged = (changedDevice: DeviceInfo) => {
//             if (changedDevice.state === 'ACTIVE') {
//                 agoraContext.localCameraTrack
//                     ?.setDevice(changedDevice.device.deviceId)
//                     .catch((error) => console.error(error));
//             } else if (changedDevice.device.label === agoraContext.localCameraTrack?.getTrackLabel()) {
//                 AgoraRTC.getCameras()
//                     .then((devices) => agoraContext.localCameraTrack?.setDevice(devices[0].deviceId))
//                     .catch((error) => console.error(error));
//             }
//         };

//         AgoraRTC.onCameraChanged = onCameraChanged;
//         return () => {
//             AgoraRTC.onCameraChanged = undefined;
//         };
//     }, [agoraContext.localCameraTrack]);
//     return null;
// };
