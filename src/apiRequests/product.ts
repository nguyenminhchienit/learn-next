import http from "@/lib/http";
import {
  CreateProductBodyType,
  ProductListResType,
  ProductResType,
  UpdateProductBodyType,
} from "@/schemaValidations/product.schema";

const productApiRequest = {
  getList: (sessionToken: string) =>
    http.get<ProductListResType>("/products", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  getDetail: (productId: number) => {
    return http.get<ProductResType>(`/products/${productId}`, {
      cache: "no-store",
    });
  },
  update: (productId: number, body: UpdateProductBodyType) => {
    return http.put<ProductResType>(`/products/${productId}`, body);
  },
  create: (body: CreateProductBodyType) =>
    http.post<ProductResType>("/products", body),
  uploadMedia: (body: FormData) =>
    http.post<{
      message: string;
      data: string;
    }>("/media/upload", body),
};

export default productApiRequest;
