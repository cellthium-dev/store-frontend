import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useCart, type CartItemExtended } from "~/app/(app)/hooks/useCart";

export default function CartAmountButton({ product }: { product: CartItemExtended }) {
  const { updateAmount } = useCart();

  return (
    <div className="flex space-x-2 items-center text-muted-foreground">
      <button onClick={() => updateAmount(product.id, "decrement")}>
        <MinusIcon className="h-4 w-3" />
      </button>
      <span className="text-sm">{product.amount}</span>
      <button onClick={() => updateAmount(product.id, "increment")}>
        <PlusIcon className="h-4 w-3" />
      </button>
    </div>
  );
}
