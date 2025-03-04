"use client";

import Link from "next/link";
import { type Product } from "payload-types";
import { type TQueryValidator } from "~/lib/validators/products";
import { api } from "~/trpc/react";
import ProductListing from "./product-listing";

interface ProductReelProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly href?: string;
  readonly query: TQueryValidator;
}

const FALLBACK_LIMIT = 4;

export default function ProductReel(props: ProductReelProps) {
  const { title, subtitle, href, query } = props;

  const { data: queryResults, isLoading } = api.products.getInfiniteProducts.useInfiniteQuery(
    {
      limit: query.limit ?? FALLBACK_LIMIT,
      query,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  const products = queryResults?.pages.flatMap((page) => page.items);

  let map: (Product | null)[] = [];
  if (products?.length) {
    map = products;
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }

  function renderProduct() {
    const isAnyItem = map.length > 0;
    return (
      <>
        {!isAnyItem ? (
          <h3>No items found.</h3>
        ) : (
          <div className="relative">
            <div className="mt-6 flex items-center w-full">
              <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
                {map.map((product, i) => (
                  <ProductListing key={`product-${i}`} product={product} index={i} />
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1> : null}
          {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>

        {href ? (
          <Link
            href={href}
            className="hidden text-sm font-medium text-green-600 hover:text-green-500 md:block"
          >
            Shop our products <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>
      {renderProduct()}
    </section>
  );
}
