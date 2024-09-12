import productApiRequest from "@/apiRequests/product";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import React from "react";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const productId = Number(params?.id);

  const { payload } = await productApiRequest.getDetail(productId);
  const product = payload.data;

  return {
    title: product?.name,
    description: product?.description,
  };
}

const ProductDetailAll = async ({ params }: Props) => {
  const productId = Number(params?.id);
  let product = null;
  try {
    const { payload } = await productApiRequest.getDetail(productId);
    product = payload.data;
  } catch (error) {}
  return (
    <div>
      {!product && <div>Không tìm thấy sản phẩm</div>}
      {product && (
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={180}
            height={180}
            className="w-32 h-32 object-cover"
          />

          <h3>{product.name}</h3>
          <div>{product.price}</div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailAll;
