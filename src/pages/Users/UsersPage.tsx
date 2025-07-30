import { useState } from "react";

import type { User } from "../../libs/data-layer/users/types";

import { SmallLoadingSpinner } from "../../components/common/LoadingSpinner";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { EyeIcon, UserIcon } from "../../icons";
import { useUsers } from "../../libs/data-layer/users";
import AddUserModal from "./AddUserModal";
import UserModal from "./UserModal";

interface UsersTable {
  users: User[];
}

const UsersTable = ({ users }: UsersTable) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  return (
    <>
      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      <Table>
        <TableHeader className="border-gray-100 dark:border-gray-800 border-b">
          <TableRow>
            {["Full name", "Phone", "Cash (t)", "Gold", "Actions"].map(
              (cell, index) => (
                <TableCell
                  isHeader
                  className={`py-3 font-medium text-gray-500 ${index === 0 && "text-start"} text-theme-xs dark:text-gray-400`}
                  key={cell}
                >
                  {cell}
                </TableCell>
              ),
            )}
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
          {users.map((user) => (
            <TableRow className="" key={user.id}>
              <TableCell className="py-3">
                <div className="flex items-center gap-3">
                  <div className="h-[38px] w-[38px] overflow-hidden rounded-md">
                    <UserIcon className="w-full h-full" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {user.name}
                    </p>
                    <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                      here been{" "}
                      {user.createdAt.toLocaleString().split("T")["0"]}
                    </span>
                  </div>
                </div>
              </TableCell>
              {[
                user.phone.replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3"),
                Intl.NumberFormat("en-US").format(
                  user.wallet?.cashBalance ?? 0,
                ),
                Intl.NumberFormat("en-US", {
                  unit: "gram",
                  style: "unit",
                }).format(user.wallet?.goldAmount ?? 0),
              ].map((cell) => (
                <TableCell
                  className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-center"
                  key={cell}
                >
                  {cell}
                </TableCell>
              ))}
              <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-center">
                <Button
                  size="sm"
                  className="h-8"
                  variant="outline"
                  onClick={() => setSelectedUser(user)}
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

export function UsersPage() {
  const [page, setPage] = useState(1);
  const [addUserModal, setAddUserModal] = useState(false);
  const { isLoading, error, users, pagination } = useUsers();

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
      <PageBreadcrumb pageTitle="Users" />
      <div className="h-full flex flex-col flex-1/2 justify-between rounded-2xl border border-gray-200 bg-white px-5 py-3 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-4">
        {isLoading ? (
          <SmallLoadingSpinner className="mx-auto w-10 h-10 mt-4" />
        ) : (
          <>
            <div className="max-w-full overflow-x-auto">
              <div className="flex justify-between items-center pb-4">
                <h3 className=" font-semibold py-2 text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
                  Users List
                </h3>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setAddUserModal(true)}
                >
                  Add New User
                </Button>
              </div>
              <UsersTable users={users} />
            </div>

            <Pagination
              currentPage={page}
              onPageChange={(newPage) => setPage(newPage)}
              totalPages={pagination.totalPages}
            />
          </>
        )}
      </div>
    </div>
  );
}
