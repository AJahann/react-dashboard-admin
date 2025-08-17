import { useRecentOrders } from "../../libs/data-layer/orders";
import { SmallLoadingSpinner } from "../common/LoadingSpinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

function GoldSVG() {
  return (
    <svg
      height="100%"
      width="100%"
      fill="#fff700"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#fff700"
      stroke-width="13.312000000000001"
      version="1.1"
      viewBox="-51.2 -51.2 614.40 614.40"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M509.917,299.095l-44.912-53.895c-0.417-0.5-0.962-0.803-1.455-1.189c-0.34-0.268-0.576-0.624-0.962-0.847L166.168,72.5 c-2.355-1.36-5.189-1.579-7.706-0.601L41.691,116.811c-0.882,0.339-1.59,0.899-2.292,1.458c-0.204,0.162-0.467,0.238-0.658,0.419 c-0.908,0.862-1.598,1.899-2.077,3.036c-0.021,0.052-0.071,0.083-0.092,0.135l-35.93,89.824 c-1.592,3.987-0.145,8.539,3.452,10.873l332.35,215.578c0.223,0.145,0.478,0.203,0.711,0.326c0.247,0.132,0.482,0.234,0.739,0.341 c1.105,0.463,2.257,0.781,3.441,0.781h0.002h0.002c1.117,0,2.217-0.271,3.281-0.692c0.11-0.043,0.23-0.023,0.338-0.071 c0.66-0.291,1.266-0.666,1.827-1.092c0.02-0.016,0.044,1.496,0.064,1.48l0.022,1.498c0.003,0,0.007,0,0.01,0l161.652-127.248 c1.925-1.496,3.158-5.225,3.417-7.646C512.21,303.389,511.478,300.964,509.917,299.095z M160.914,90.206l280.713,161.623 l-82.694,60.141L64.887,127.141L160.914,90.206z M334.724,415.608L20.068,211.503l29.184-72.969l300.205,188.696L334.724,415.608z M353.975,409.388l13.579-81.474l89.034-64.752l33.583,40.298L353.975,409.388z"></path>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

const InfoTable = () => {
  const { error, isError, isLoading, orders } = useRecentOrders();

  if (isLoading) {
    return <SmallLoadingSpinner className="w-10 h-10 mx-auto my-10" />;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center font-bold text-xl">
        Error: {error?.message}
      </div>
    );
  }

  return (
    <div className="max-w-full overflow-x-auto">
      <Table>
        {/* Table Header */}
        <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
          <TableRow>
            <TableCell
              isHeader
              className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
            >
              Products
            </TableCell>
            <TableCell
              isHeader
              className="py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-center"
            >
              Price
            </TableCell>
            <TableCell
              isHeader
              className="py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-center"
            >
              Gram
            </TableCell>
            <TableCell
              isHeader
              className="py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-center"
            >
              Quantity
            </TableCell>
          </TableRow>
        </TableHeader>

        {/* Table Body */}

        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
          {orders.map((product) => (
            <TableRow className="" key={product.id}>
              <TableCell className="py-3">
                <div className="flex items-center gap-3">
                  <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                    <GoldSVG />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {product.product.name}
                    </p>
                    <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                      {product.product.brand}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-center">
                {Intl.NumberFormat("en-US").format(product.price)}
              </TableCell>
              <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-center">
                {Intl.NumberFormat("en-US", {
                  style: "unit",
                  unit: "gram",
                }).format(product.product.gram)}
              </TableCell>
              <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-center">
                {product.quantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default function RecentOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Orders
          </h3>
        </div>
      </div>

      <InfoTable />
    </div>
  );
}
