import type { Post } from "@/types";
import { useEffect, useRef } from "react";
import VideoJS from "@/components/videojs";

export default function Video({ post, play }: { post: Post, play: boolean }) {
    const playerRef = useRef(null);
    const src = "http://localhost:8000/api/video/" + post.video;

    const videoJsOptions = {
        responsive: true,
        loop: true,
        controls: true,
        fluid: true,
        sources: [{
            src: src,
            type: "application/x-mpegURL", // Assuming the video is served as HLS
        }],
    };

    const handlePlayerReady = (player: any) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        if(play)
            playerRef.current.play();
        
    }

    useEffect(() => {
        if (playerRef.current) {
            if (play) {
                playerRef.current.play();
            } else {
                playerRef.current.pause();
            }
        }
    }, [play]);

    return (
        <div className="h-full w-full flex items-center justify-center">
            <VideoJS
                options={videoJsOptions}
                onReady={handlePlayerReady}
            />
        </div>
    )
}