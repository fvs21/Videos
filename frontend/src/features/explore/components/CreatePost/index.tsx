import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function CreatePost({ open, onClose }: { open: boolean, onClose: (val: boolean) => void }) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                jkdsa
            </DialogContent>
        </Dialog>
    )
}