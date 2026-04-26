import { notFound } from "next/navigation";
import { PRADA_SKIRT } from "@/data/products";
import PDPClient from "./PDPClient";

export function generateStaticParams() {
  return [{ id: PRADA_SKIRT.id }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = id === PRADA_SKIRT.id ? PRADA_SKIRT : null;
  if (!product) return { title: "Not Found | FARFETCH" };
  return { title: `${product.brand} ${product.name} | FARFETCH` };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = id === PRADA_SKIRT.id ? PRADA_SKIRT : null;
  if (!product) notFound();
  return <PDPClient product={product} />;
}
