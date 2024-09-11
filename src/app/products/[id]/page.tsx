import productApiRequest from "@/apiRequests/product";
import Image from "next/image";
import React from "react";

const ProductDetailAll = async ({ params }: { params: { id: string } }) => {
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
