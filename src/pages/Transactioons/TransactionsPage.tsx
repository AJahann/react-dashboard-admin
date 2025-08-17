import type { TradeTransaction } from "../../libs/data-layer/transactions";

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
import { useTradeTransactions } from "../../libs/data-layer/transactions";

interface TableProps {
  transactions: TradeTransaction[];
}

function TransactionsTable({ transactions }: TableProps) {
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
                phone
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                action
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                amount(gold)
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                date
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {transactions.map((action) => (
              <TableRow key={action.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {action.user.phone.replace(
                      /(\d{4})(\d{3})(\d{4})/,
                      "$1-$2-$3",
                    )}
                  </p>
                </TableCell>
                <TableCell
                  className={`px-5 py-4 sm:px-6 text-center font-medium ${action.action === "BUY_GOLD" ? "text-green-500" : "text-red-500"} text-theme-sm`}
                >
                  {action.action === "BUY_GOLD" ? "BUY" : "SELL"}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-center font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {Intl.NumberFormat("en-US", {
                    style: "unit",
                    unit: "gram",
                  }).format(action.goldAmount)}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-center font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {action.createdAt.toLocaleString().split("T")[0]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {transactions.length === 0 && (
          <NotFountItem message="No Transaction Yet..." />
        )}
      </div>
    </div>
  );
}

export function TransactionsPage() {
  const { transactions, error, isError, isLoading } = useTradeTransactions();

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
      <PageBreadcrumb pageTitle="Transactions" />
      <div className="space-y-6">
        <ComponentCard title="Transactions">
          {isLoading ? (
            <SmallLoadingSpinner className="w-12 h-12 mx-auto" />
          ) : (
            <TransactionsTable transactions={transactions} />
          )}
        </ComponentCard>
      </div>
    </div>
  );
}
