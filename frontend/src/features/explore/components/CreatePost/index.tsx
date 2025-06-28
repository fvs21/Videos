import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useCreatePost } from "../../api";

export default function CreatePost({ open, onClose }: { open: boolean, onClose: (val: boolean) => void }) {
    const [description, setDescription] = useState<string>("");
    const [video, setVideo] = useState<File | null>(null);

    const { createPost, isPending } = useCreatePost();


    const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        
        if (file) {
            setVideo(file);
        }
    };

    const handleSubmit = async () => {
        try {
            await createPost({
                description,
                video: video as File
            });
            onClose(false);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-2xl">
                <DialogTitle>
                    Create Post
                </DialogTitle>
                <div className="flex flex-col gap-4">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write a description..."
                        className="w-full p-2 border rounded-md"
                    />
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="border rounded p-2"
                    />
                    <button
                        onClick={handleSubmit}
                        className=" bg-blue-900 text-white p-2 rounded-md"
                    >
                        {isPending ? "Creating..." : "Create Post"}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}