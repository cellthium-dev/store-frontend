"use client";

import { type Product } from "payload-types";
import React from "react";
import { useCart } from "~/app/(app)/hooks/useCart";
import { Button } from "../ui/button";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
      size="lg"
      className="w-full"
    >
      {isSuccess ? "Added!" : "Add to cart"}
    </Button>
  );
}
