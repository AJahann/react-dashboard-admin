import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import type { User } from "../../libs/data-layer/users/types";

import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { useDeleteUser, useUpdateUser } from "../../libs/data-layer/users";

const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(8, "Maximum 8 characters"),
  phone: z.string().length(11, "Phone number must be 11 digits"),
});

type UserUpdateFormData = z.infer<typeof updateUserSchema>;

interface UserModalProps {
  user: User;
  onClose: () => void;
}

// eslint-disable-next-line max-lines-per-function
const UserModal = ({ user, onClose }: UserModalProps) => {
  const queryClient = useQueryClient();

  const { isPending: isPendingDelete, mutateAsync: deleteUser } =
    useDeleteUser();

  const {
    isPending: isUpdating,
    error: updateError,
    mutateAsync: updateUser,
  } = useUpdateUser();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<UserUpdateFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
    },
  });

  const handleCloseModal = () => {
    reset();
    onClose();
  };

  const handleUpdateSubmit = async (data: UserUpdateFormData) => {
    if (!user) return;

    try {
      await updateUser({
        id: user.id,
        updateUserDto: {
          name: data.name,
          phone: data.phone,
        },
      });

      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully");
      handleCloseModal();
    } catch (_) {
      if (!updateError?.message) return;
      toast.error(updateError.message);
    }
  };

  const handleDelete = async () => {
    if (!user) return;

    try {
      await deleteUser(user.id);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
      handleCloseModal();
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    }
  };

  const renderCardInfo = () => {
    if (user.cards?.length === 0) {
      return <p className="text-sm text-gray-500">User has no cards.</p>;
    }

    return user.cards?.map((card) => (
      <div
        className="border-2 rounded-xl p-4 text-gray-800 dark:text-white/80"
        key={card.id}
      >
        <p>name: {card.cardName}</p>
        <p className="mt-1">
          number: ****-****-****-{card.cardNumber.slice(-4)}
        </p>
      </div>
    ));
  };

  return (
    <Modal className="max-w-[700px] m-4" isOpen={!!user} onClose={onClose}>
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900">
        <div className="px-2 pr-14">
          <h4 className="mb-2 py-4 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit User Information
          </h4>
        </div>

        <form
          className="flex flex-col"
          onSubmit={handleSubmit(handleUpdateSubmit)}
        >
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
              <div className="col-span-2 lg:col-span-1">
                <Label>Full Name</Label>
                <Input
                  type="text"
                  {...register("name")}
                  hint={errors.name?.message}
                  max="8"
                  min="3"
                  error={!!errors.name}
                />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Phone</Label>
                <Input
                  type="text"
                  {...register("phone")}
                  hint={errors.phone?.message}
                  max="8"
                  min="3"
                  error={!!errors.phone}
                />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Cards:</Label>
                {renderCardInfo()}
              </div>
            </div>
          </div>

          <div className="flex items-center mt-6 justify-between">
            <div>
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700"
                disabled={isPendingDelete}
                onClick={handleDelete}
              >
                Delete User
              </Button>
            </div>

            <div className="flex gap-3 justify-end">
              <Button size="sm" variant="outline" onClick={handleCloseModal}>
                Close
              </Button>
              <Button size="sm" disabled={isUpdating} type="submit">
                {isUpdating ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UserModal;
