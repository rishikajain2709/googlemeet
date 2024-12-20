import React, { useContext, useEffect } from "react";
import { SocketContext } from "../Context";

function VideoPlayer() {
  const { me, name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  useEffect(() => {
    if (myVideo && myVideo.current) {
      myVideo.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="flex flex-col md:flex-row justify-center gap-3 p-4">
      {/* Local Video (Your Video) */}
      <div className="flex flex-col gap-1 items-center w-full max-w-md">
        <div className="flex items-baseline gap-2">
          <h4 className="text-sm font-medium">{name === "" ? `You` : `${name} (You)`}</h4>
          <h4 className="font-mono text-xs text-gray-700 bg-gradient-to-r from-indigo-200 to-blue-100 px-2 rounded">
            ID: {me}
          </h4>
        </div>
        {stream && (
          <video
            className="rounded-xl w-full h-auto max-h-56 border-2 border-indigo-300 shadow-md"
            muted
            ref={myVideo}
            autoPlay
          />
        )}
      </div>

      {/* Remote Video (User Video) */}
      {callAccepted && !callEnded && (
        <div className="flex flex-col gap-1 items-center w-full max-w-md">
          <div className="flex items-baseline gap-2">
            <h4 className="text-sm font-medium">{call.name || "Unknown"}</h4>
          </div>
          <video
            className="rounded-xl w-full h-auto max-h-56 border-2 border-indigo-300 shadow-md"
            ref={userVideo}
            autoPlay
          />
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
