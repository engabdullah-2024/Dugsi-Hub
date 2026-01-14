"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface VideoPlayerProps {
    videoUrl: string;
}

export const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);

    // Function to extract YouTube ID and format it for embedding
    const getYouTubeEmbedUrl = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`;
        }

        return null;
    };

    const embedUrl = getYouTubeEmbedUrl(videoUrl);

    useEffect(() => {
        setIsReady(true);
    }, []);

    if (!isReady) {
        return (
            <div className="flex aspect-video items-center justify-center bg-black rounded-3xl">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    if (embedUrl) {
        return (
            <iframe
                src={embedUrl}
                className="h-full w-full rounded-[2rem] border-none shadow-inner"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        );
    }

    // Fallback for direct video links (if any)
    return (
        <video
            src={videoUrl}
            controls
            autoPlay
            className="h-full w-full rounded-[2rem] bg-black shadow-inner"
        >
            Your browser does not support the video tag.
        </video>
    );
};
