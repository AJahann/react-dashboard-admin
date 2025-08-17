import type { GoldPriceHistoryResponse } from "../../libs/data-layer/gold-price";

import ComponentCard from "../../components/common/ComponentCard";
import { SmallLoadingSpinner } from "../../components/common/LoadingSpinner";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import NotFountItem from "../../components/tables/NotFountItem";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useGoldPriceHistory } from "../../libs/data-layer/gold-price";

interface TableProps {
  history: GoldPriceHistoryResponse[];
}

function GoldHistoryTable({ history }: TableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Created By
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-green-500 text-center text-theme-xs"
              >
                Buy Price
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-red-500 text-center text-theme-xs"
              >
                Sell Price
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                Date
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {history.map((price) => (
              <TableRow key={price.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {price.updatedBy}
                  </p>
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-center font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {Intl.NumberFormat().format(price.buyPrice)}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-center font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {Intl.NumberFormat().format(price.sellPrice)}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-center font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {price.updatedAt.toLocaleString().split("T")[0]}
                  <br />
                  {price.updatedAt.toLocaleString().split("T")[1].split(".")[0]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {history.length === 0 && <NotFountItem message="No history found" />}
      </div>
    </div>
  );
}

export function GoldHistory() {
  const { error, history, isError, isLoading } = useGoldPriceHistory();

  if (isError) {
    return (
      <div className="text-red-500 text-center font-bold text-xl">
        Error: {error?.message}
        <br />
        Please refresh the site
      </div>
    );
  }

  return (
    <div>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Gold History" />
      <div className="space-y-6">
        <ComponentCard title="Gold History">
          {isLoading ? (
            <SmallLoadingSpinner className="w-12 h-12 mx-auto" />
          ) : (
            <GoldHistoryTable history={history} />
          )}
        </ComponentCard>
      </div>
    </div>
  );
}
