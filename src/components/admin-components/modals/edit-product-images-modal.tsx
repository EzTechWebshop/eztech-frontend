"use client";
import { AddProductImage, DeleteProductImage, SetProductThumbnail } from "@/server/product-actions";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/types/domain-types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Text } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoImageOutline, IoTrashBinOutline } from "react-icons/io5";
const basePath = process.env.NEXT_PUBLIC_IMAGE_URL || "";
// Edit Product Images Dialog
type EditProductImagesDialogProps = {
    product: Product;
};
export default function EditProductImagesModal({ ...props }: EditProductImagesDialogProps) {
    const { toast } = useToast();
    const router = useRouter();
    const { product } = props;

    const handleDeleteImage = async (image: any) => {
        const result = await DeleteProductImage(product.id, image.id).catch(() => {
            return;
        });
        if (result) {
            toast({
                title: "Image deleted successfully",
            });
            router.refresh();
        }
    };
    const handleChoosePrimaryImage = async (image: any) => {
        const result = await SetProductThumbnail(product.id, image.id).catch(() => {
            return;
        });
        if (result) {
            toast({
                title: "Primary image set successfully",
            });
            router.refresh();
        }
    };
    // Handle adding image, source uknown
    const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        if (e.target.files && e.target.files.length > 0) {
            formData.append("file", e.target.files[0]);
        }
        const result = await AddProductImage(product.id, formData).catch((err) => {
            alert("Failed to add image");
        });
        if (result) {
            toast({
                title: "Image added successfully",
            });
            router.refresh();
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button buttonTip="Button tip" className="flex space-x-2" variant="outline" size={"icon"}>
                    <IoImageOutline size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent className="min-h-[70vh] min-w-[50vw]">
                <DialogHeader>Title</DialogHeader>
                <ScrollArea className="overflow-auto">
                    <div className="flex gap-8 w-fit h-fit">
                        {product.images.map((image) => (
                            <div key={image.id}>
                                <Button
                                    className=" hover:opacity-75 transition-opacity duration-200 ease-in-out"
                                    size={"image"}
                                    variant={"image"}
                                    key={image.id}>
                                    <ImageTest fileName={image.fileName} key={image.id} />
                                </Button>
                                <div className="flex flex-1 justify-between mx-4">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="include-sold-out"
                                            checked={product.thumbnailId === image.id}
                                            onClick={() => handleChoosePrimaryImage(image)}
                                        />
                                        <Label htmlFor="include-sold-out">Is Primary</Label>
                                    </div>
                                    <Button
                                        size={"xsIcon"}
                                        variant={"destructive"}
                                        buttonTip="Delete Image"
                                        onClick={() => handleDeleteImage(image)}>
                                        <IoTrashBinOutline size={20} />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="flex flex-col">
                    <Text>Add Image</Text>
                    <Input type="file" className="w-fit" onChange={handleAddImage} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

const ImageTest = ({ fileName }: { fileName: string }) => {
    return (
        <div className="flex items-center w-[300px] overflow-hidden rounded-md shadow-md border-2">
            <AspectRatio className="flex w-fit mx-auto" ratio={10 / 10}>
                <Image
                    width={150}
                    height={150}
                    className="flex h-full w-fit"
                    src={`${basePath}/${fileName}`}
                    alt="Landscape photograph by Tobias Tullius"
                />
            </AspectRatio>
        </div>
    );
};
