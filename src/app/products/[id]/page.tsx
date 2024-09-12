import productApiRequest from "@/apiRequests/product";
import envConfig from "@/configs/config";
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
  const url = envConfig.NEXT_PUBLIC_URL_CLIENT + "/products/" + product.id;

  return {
    title: product?.name,
    description: product?.description,
    openGraph: {
      title: product?.name,
      description: product?.description,
      url: url,
      siteName: "Takis Tech",
      images: [
        {
          url: "https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-6/342402239_630184425141651_4049981349969707724_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=XMOAASgQjE0Q7kNvgFQv2nT&_nc_ht=scontent.fsgn16-1.fna&_nc_gid=AZRJ9WfRfPKSqZdl8LSuA6z&oh=00_AYCvPYMYYuGHIJ4LLfNQA4ANAK-xmRssWGHPEH9bCsoDAg&oe=66E8C0CD", // Must be an absolute URL
          width: 800,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },
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
