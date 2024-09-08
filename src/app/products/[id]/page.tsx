import productApiRequest from "@/apiRequests/product";
import React from "react";
import ProductForm from "../_components/product-form";

const ProductDetail = async ({ params }: { params: { id: string } }) => {
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
