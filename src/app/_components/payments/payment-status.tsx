"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useCart } from "~/app/(app)/hooks/useCart";
import { api } from "~/trpc/react";

interface PaymentStatusProps {
  readonly orderEmail: string;
  readonly orderId: string;
  readonly isPaid: boolean;
}

export default function PaymentStatus({ orderEmail, orderId, isPaid }: PaymentStatusProps) {
  const router = useRouter();

  const { data } = api.payment.pollOrderStatus.useQuery(
    { orderId },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    }
  );

  /** Effect to check if the payment is already going through */
  React.useEffect(() => {
    if (data?.isPaid) router.refresh();
  }, [data?.isPaid, router]);

  /** Effect to remove items from the cart after successful checkout. */
  const cart = useCart();
  React.useEffect(() => {
    cart.clearCart();
  }, []);

  return (
    <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
      <div>
        <p className="font-medium text-gray-900">Shipping To</p>
        <p>{orderEmail}</p>
      </div>

      <div>
        <p className="font-medium text-gray-900">Order Status</p>
        <p>{isPaid ? "Payment successful" : "Pending payment"}</p>
      </div>
    </div>
  );
}
