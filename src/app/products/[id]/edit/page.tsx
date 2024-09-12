import productApiRequest from "@/apiRequests/product";
import React from "react";
import ProductForm from "../../_components/product-form";
import { Metadata, ResolvingMetadata } from "next";
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
    title: `Edit ${product?.name}`,
    description: product?.description,
  };
}

const ProductDetail = async ({ params }: Props) => {
  const productId = Number(params?.id);
  let product = null;
  try {
    const { payload } = await productApiRequest.getDetail(productId);
    product = payload.data;
  } catch (error) {}
  return (
    <div>
      {!product && <div>Không tìm thấy sản phẩm</div>}
      {product && <ProductForm product={product} />}
    </div>
  );
};

export default ProductDetail;
