import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { useCreateUser } from "../../libs/data-layer/users";

const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(8, "Maximum 8 characters"),
  phone: z
    .string()
    .length(11, "Phone number must be 11 digits")
    .regex(/^\d+$/, "Digits only"),
  password: z
    .string()
    .min(6, "Minimum 6 characters")
    .max(100, "Maximum 100 characters"),
});

type UserFormData = z.infer<typeof createUserSchema>;

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormFieldProps {
  label: string;
  error?: { message?: string };
  inputProps: React.InputHTMLAttributes<HTMLInputElement> & {
    [key: string]: any;
  };
}

const FormField = ({ label, error, inputProps }: FormFieldProps) => (
  <div className="col-span-2 lg:col-span-1">
    <Label>{label}</Label>
    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
    {/* @ts-ignore */}
    <Input {...inputProps} hint={error?.message} error={!!error} />
  </div>
);

const AddUserModal = ({ isOpen, onClose }: AddUserModalProps) => {
  const queryClient = useQueryClient();

  const {
    isPending: isCreating,
    error: createError,
    mutateAsync: createUser,
  } = useCreateUser();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
    },
  });

  const handleCloseModal = () => {
    reset();
    onClose();
  };

  const handleCreateUser = async (userData: UserFormData) => {
    try {
      await createUser({
        name: userData.name,
        phone: userData.phone,
        password: userData.password,
      });

      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
      handleCloseModal();
    } catch {
      if (!createError?.message) return;
      toast.error(createError.message);
    }
  };

  return (
    <Modal className="max-w-[700px] m-4" isOpen={isOpen} onClose={onClose}>
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900">
        <div className="px-2 pr-14">
          <h4 className="mb-2 py-4 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Add User
          </h4>
        </div>

        <form
          className="flex flex-col"
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
              <FormField
                label="Full Name"
                error={errors.name}
                inputProps={{
                  type: "text",
                  ...register("name"),
                  placeholder: "John Doe",
                  max: "8",
                  min: "3",
                }}
              />

              <FormField
                label="Phone"
                error={errors.phone}
                inputProps={{
                  type: "text",
                  ...register("phone"),
                  placeholder: "0987654321",
                }}
              />

              <FormField
                label="Password"
                error={errors.password}
                inputProps={{
                  type: "text",
                  ...register("password"),
                  placeholder: "**********",
                }}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <Button size="sm" variant="outline" onClick={handleCloseModal}>
              Close
            </Button>
            <Button size="sm" disabled={isCreating} type="submit">
              {isCreating ? "Adding..." : "Add User"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddUserModal;
