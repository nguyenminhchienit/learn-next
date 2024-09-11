"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ProductResType } from "@/schemaValidations/product.schema";
import { handleErrorApi } from "@/lib/utils";
import productApiRequest from "@/apiRequests/product";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const DeleteProduct = ({ product }: { product: ProductResType["data"] }) => {
  const { toast } = useToast();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const result = await productApiRequest.delete(Number(product?.id));
      toast({
        description: result.payload.message,
      });
      router.refresh();
    } catch (error) {
      handleErrorApi({ error });
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"}>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you delete sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you delete sure product {product?.name}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteProduct;
