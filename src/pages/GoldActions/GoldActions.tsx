import { useState } from "react";

import type { LatestGoldPricesResponse } from "../../libs/data-layer/gold-price";

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
import { useLatestGoldPrices } from "../../libs/data-layer/gold-price";
import AddNewGoldPriceModal from "./AddNewGoldPriceModal";

const CurrentGoldTable = ({
  buyPrice,
  sellPrice,
}: LatestGoldPricesResponse) => {
  return (
    <Table>
      <TableHeader className="border-gray-100 dark:border-gray-800 border-b">
        <TableRow>
          {["Type", "Current Price"].map((cell) => (
            <TableCell
              isHeader
              className="py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              key={cell}
            >
              {cell}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
        <TableRow className="[&>td]:px-3">
          <TableCell className="py-3 text-nowrap text-green-500 text-theme-sm text-center">
            Buy
          </TableCell>
          <TableCell className="py-3 text-nowrap text-gray-500 text-theme-sm dark:text-gray-400 text-center">
            {Intl.NumberFormat().format(buyPrice)}
          </TableCell>
        </TableRow>
        <TableRow className="[&>td]:px-3">
          <TableCell className="py-3 text-nowrap text-red-500 text-theme-sm text-center">
            Sell
          </TableCell>
          <TableCell className="py-3 text-nowrap text-gray-500 text-theme-sm dark:text-gray-400 text-center">
            {Intl.NumberFormat().format(sellPrice)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export function GoldActions() {
  const { isLoading, prices, isError, error } = useLatestGoldPrices();
  const [modalOpen, setModalOpen] = useState(false);

  if (isError) {
    return (
      <p className="text-red-500 text-center font-bold text-xl">
        Error: {error?.message}
        <br />
        Please refresh the site
      </p>
    );
  }

  return (
    <div>
      {prices && (
        <AddNewGoldPriceModal
          isOpen={modalOpen}
          prices={prices}
          onClose={() => setModalOpen(false)}
        />
      )}

      <PageMeta
        title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Gold Actions" />
      <div className="flex items-center justify-center flex-col rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        {isLoading ? (
          <SmallLoadingSpinner className="w-8 h-8" />
        ) : (
          <>
            <div className="mx-auto w-full max-w-[630px] text-center">
              <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
                View and apply gold prices
              </h3>

              <CurrentGoldTable
                buyPrice={prices?.buyPrice ?? 0}
                sellPrice={prices?.sellPrice ?? 0}
              />
            </div>

            <Button
              className="mt-20 w-full max-w-[630px]"
              onClick={() => setModalOpen(true)}
            >
              Add New Gold Price
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

// What we need => view current gold prices,add new gold price, table of the gold prices history
//
