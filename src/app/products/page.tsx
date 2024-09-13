import productApiRequest from "@/apiRequests/product";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import DeleteProduct from "./_components/btn-delete-product";

export default async function ProductList() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const { payload } = await productApiRequest.getList(
    sessionToken?.value || ""
  );
  const productList = payload.data;
  // console.log(productList);
  return (
    <div className="m-20">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productList.map((product) => (
            <TableRow key={product?.id}>
              <TableCell className="font-medium">{product?.name}</TableCell>
              <TableCell>{product?.price}</TableCell>
              <TableCell>{product?.description}</TableCell>
              <TableCell className="text-right">
                <Link href={`products/${product?.id}`}>
                  <Image
                    src={product?.image}
                    alt="img"
                    width={180}
                    height={180}
                    className="w-18 h-18 object-cover"
                  />
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex gap-3">
                  <Link href={`products/${product?.id}/edit`}>
                    <Button variant={"secondary"}>Edit</Button>
                  </Link>
                  <DeleteProduct product={product} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
