import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { useCreateProduct } from "../../libs/data-layer/products";

const schema = z.object({
  name: z
    .string({ error: "Field is required" })
    .min(3, "Minimum 3 characters")
    .max(8, "Maximum 8 characters"),
  brand: z
    .string({ error: "Field is required" })
    .min(3, "Minimum 3 characters")
    .max(8, "Maximum 8 characters"),
  type: z
    .string({ error: "Field is required" })
    .min(3, "Minimum 3 characters")
    .max(8, "Maximum 8 characters"),
  gram: z
    .string()
    .transform((v) => Number(v))
    .refine((v) => v >= 0.1 && v <= 10, {
      message: "Gram must be between 0.1 and 10",
    })
    .transform((v) => String(v)),
  wages: z
    .string()
    .transform((v) => Number(v))
    .refine((v) => v >= 10_000 && v <= 10_000_000, {
      message: "Wages must be between 10,000 and 10,000,000",
    })
    .transform((v) => String(v)),
  imgBase64: z
    .instanceof(FileList)
    .refine((file) => file.length > 0, "Image is required"),
});

type ProductFormData = z.infer<typeof schema>;

interface Props {
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

// eslint-disable-next-line max-lines-per-function
const AddProductModal = ({ isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();

  const {
    isLoading: isCreating,
    error: createError,
    mutateAsync: createProduct,
  } = useCreateProduct();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      brand: "",
      type: "",
      gram: "",
      wages: "",
      imgBase64: undefined,
    },
  });

  const handleCloseModal = () => {
    reset();
    onClose();
  };

  const handleCreateProduct = async (data: ProductFormData) => {
    const file = data.imgBase64[0];

    const toBase64 = (oldFile: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(oldFile);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

    try {
      const imgBase64String = await toBase64(file);

      await createProduct({
        name: data.name,
        brand: data.brand,
        type: data.type,
        gram: +data.gram,
        wages: String(data.wages),
        imgBase64: imgBase64String,
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
      handleCloseModal();
    } catch (error) {
      console.log(createError || error);
      if (!createError?.message) return;
      toast.error(createError.message);
    }
  };

  return (
    <Modal
      className="max-w-[700px] m-4"
      isOpen={isOpen}
      onClose={handleCloseModal}
    >
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900">
        <div className="px-2 pr-14">
          <h4 className="mb-2 py-4 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Add Product
          </h4>
        </div>

        <form
          className="flex flex-col"
          onSubmit={handleSubmit(handleCreateProduct)}
        >
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
              <FormField
                label="Name"
                error={errors.name}
                inputProps={{
                  type: "text",
                  ...register("name"),
                  placeholder: "طلای اصل",
                }}
              />

              <FormField
                label="Brand"
                error={errors.brand}
                inputProps={{
                  type: "text",
                  ...register("brand"),
                  placeholder: "پاسارگاد",
                }}
              />

              <FormField
                label="Type"
                error={errors.type}
                inputProps={{
                  type: "text",
                  ...register("type"),
                  placeholder: "سکه",
                }}
              />

              <FormField
                label="Wages"
                error={errors.wages}
                inputProps={{
                  type: "number",
                  ...register("wages"),
                  placeholder: "100000",
                }}
              />

              <FormField
                label="Gram"
                error={errors.gram}
                inputProps={{
                  type: "text",
                  ...register("gram"),
                  placeholder: "0.5",
                }}
              />

              <FormField
                label="Image"
                error={errors.imgBase64}
                inputProps={{
                  type: "file",
                  accept: "image/*",
                  multiple: false,
                  ...register("imgBase64"),
                }}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <Button size="sm" variant="outline" onClick={handleCloseModal}>
              Close
            </Button>
            <Button size="sm" disabled={isCreating} type="submit">
              {isCreating ? "Adding..." : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddProductModal;
