import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import type { Post } from "@/types";
import Video from "../Video";
import { useEffect, useState } from "react";

export default function VideoScroller({ posts }: { posts: Post[] }) {
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        carouselApi?.on("scroll", (car) => {
            const index = car.selectedScrollSnap();
            setCurrentIndex(index);
        })
    }, [carouselApi]);

    return (
        <div className="h-full">
            <Carousel setApi={setCarouselApi} orientation="vertical" className="h-full w-[550px] relative">
                <CarouselContent className="h-[calc(95vh-60px)]">
                    {posts.map((post, i) => (
                        <CarouselItem key={post.id}>
                            <Video post={post} play={currentIndex === i}/>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}