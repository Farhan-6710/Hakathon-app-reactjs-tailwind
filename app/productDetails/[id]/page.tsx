import React from "react";
import { notFound } from "next/navigation";
import productsData from "@/public/data/cardData.json"; // Adjust path as needed
import { Card } from "@/types/types"; // Adjust the path as needed
import ProductDetailClient from "./ProductDetailClient"; // Client-side component

interface ProductDetailsProps {
  params: {
    id: string;
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const productId = parseInt(params.id, 10);

  // Find the product by ID
  const product = productsData.find((p: Card) => p.id === productId);

  if (!product) {
    notFound(); // Redirect to 404 if the product is not found
    return null; // This line is needed to satisfy TypeScript, but will never be reached because of the notFound() call.
  }

  return (
    <div>
      <ProductDetailClient product={product} />
    </div>
  );
};

export default ProductDetails;
