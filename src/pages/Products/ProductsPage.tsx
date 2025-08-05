import { useState } from "react";

import type { ProductDto } from "../../libs/data-layer/products";

import { SmallLoadingSpinner } from "../../components/common/LoadingSpinner";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { EyeIcon } from "../../icons";
import { useProducts } from "../../libs/data-layer/products";
import AddUserModal from "./AddProductModal";
import ProductModal from "./ProductModal";

interface ProductsTable {
  products: ProductDto[];
}

const ProductsTable = ({ products }: ProductsTable) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(
    null,
  );

  return (
    <>
      {selectedProduct && (
        <ProductModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}

      <Table>
        <TableHeader className="border-gray-100 dark:border-gray-800 border-b">
          <TableRow>
            {["Info", "Gram", "Wages", "Type", "Actions"].map((cell, index) => (
              <TableCell
                isHeader
                className={`py-3 font-medium text-gray-500 ${index === 0 && "text-start"} text-theme-xs dark:text-gray-400`}
                key={cell}
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
          {products.map((product) => (
            <TableRow className="[&>td]:px-3" key={product.id}>
              <TableCell className="py-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 overflow-hidden rounded-full">
                    <img
                      alt={product.name}
                      className="object-cover w-ful h-full"
                      src={product.imgData}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {product.name}
                    </p>
                    <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                      {product.brand}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-3 text-nowrap text-gray-500 text-theme-sm dark:text-gray-400 text-center">
                {Intl.NumberFormat("en-US", {
                  style: "unit",
                  unit: "gram",
                }).format(product.gram)}
              </TableCell>
              <TableCell className="py-3 text-nowrap text-gray-500 text-theme-sm dark:text-gray-400 text-center">
                {Intl.NumberFormat().format(+product.wages)}
              </TableCell>
              <TableCell className="py-3 text-nowrap text-gray-500 text-theme-sm dark:text-gray-400 text-center">
                {product.type}
              </TableCell>
              <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-center">
                <Button
                  size="sm"
                  className="h-8"
                  variant="outline"
                  onClick={() => setSelectedProduct(product)}
                >
                  <EyeIcon className="w-5 h-5 fill-gray-600  dark:fill-white " />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export function ProductsPage() {
  const [addUserModal, setAddUserModal] = useState(false);
  const { isLoading, error, products } = useProducts();

  if (error) {
    return (
      <div className="text-red-500 text-xl text-center">
        Error: {error?.message}
        <br />
        Please refresh the site.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AddUserModal
        isOpen={addUserModal}
        onClose={() => setAddUserModal(false)}
      />

      <PageMeta
        title="React.js Blank Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Products" />
      <div className="h-full flex flex-col flex-1/2 justify-between rounded-2xl border border-gray-200 bg-white px-5 py-3 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-4">
        {isLoading ? (
          <SmallLoadingSpinner className="mx-auto w-10 h-10 mt-4" />
        ) : (
          <div className="">
            <div className="flex justify-between items-center pb-4">
              <h3 className=" font-semibold py-2 text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
                Product List
              </h3>

              <Button
                size="sm"
                variant="primary"
                onClick={() => setAddUserModal(true)}
              >
                Add New Product
              </Button>
            </div>

            <div className="max-w-full overflow-x-auto">
              <ProductsTable products={products} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
