"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import {
  CreateProductBody,
  CreateProductBodyType,
  ProductResType,
  UpdateProductBodyType,
} from "@/schemaValidations/product.schema";
import productApiRequest from "@/apiRequests/product";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import Image from "next/image";

type Product = ProductResType["data"];

const ProductForm = ({ product }: { product?: Product }) => {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: product?.name || "",
      price: product?.price || 0,
      description: product?.description || "",
      image: product?.image || "",
    },
  });

  const imgDefault = form.watch("image");

  const createProduct = async (values: CreateProductBodyType) => {
    try {
      const formData = new FormData();
      formData.append("file", file as Blob);
      const uploadMedia = await productApiRequest.uploadMedia(formData);
      const imgUrl = uploadMedia?.payload?.data;

      const result = await productApiRequest.create({
        ...values,
        image: imgUrl,
      });
      toast({
        description: result.payload.message,
      });
      console.log("product: ", result);
      router.push("/products");
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    }
  };

  const updateProduct = async (_values: UpdateProductBodyType) => {
    if (!product) {
      return;
    }
    let values = _values;
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file as Blob);
        const uploadMedia = await productApiRequest.uploadMedia(formData);
        const imgUrl = uploadMedia?.payload?.data;
        values = {
          ...values,
          image: imgUrl,
        };
      }

      const result = await productApiRequest.update(product.id, values);
      toast({
        description: result.payload.message,
      });
      console.log("product: ", result);
      router.push("/products");
      router.refresh();
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    }
  };

  // 2. Define a submit handler.
  async function onSubmit(values: CreateProductBodyType) {
    if (product) {
      await updateProduct(values);
    } else {
      await createProduct(values);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[500px] w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product name</FormLabel>
              <FormControl>
                <Input placeholder="Name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  ref={inputRef}
                  onChange={(e) => {
                    const file = e.target?.files?.[0];
                    if (file) {
                      setFile(file);
                      field.onChange("http://localhost:3000/" + file.name);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {(file || imgDefault) && (
          <div>
            <Image
              src={file ? URL.createObjectURL(file) : imgDefault}
              width={128}
              height={128}
              alt="preview"
              className="w-32 h-32 object-cover mb-3"
            />
            <Button
              type="button"
              variant={"destructive"}
              size={"sm"}
              onClick={() => {
                setFile(null);
                form.setValue("image", "");
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
            >
              Xóa hình ảnh
            </Button>
          </div>
        )}

        <Button type="submit" className="w-full !mt-8">
          {product ? "Update product" : "Add product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
