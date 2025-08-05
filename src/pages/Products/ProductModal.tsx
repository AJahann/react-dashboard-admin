import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import type { ProductDto } from "../../libs/data-layer/products";

import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import {
  useDeleteProduct,
  useUpdateProduct,
} from "../../libs/data-layer/products";

const schema = z.object({
  id: z.string(),
  name: z
    .string({ error: "Invalid input" })
    .min(3, "Minimum 3 characters")
    .max(8, "Maximum 8 characters")
    .optional(),
  brand: z
    .string({ error: "Invalid input" })
    .min(3, "Minimum 3 characters")
    .max(8, "Maximum 8 characters")
    .optional(),
  type: z
    .string({ error: "Invalid input" })
    .min(3, "Minimum 3 characters")
    .max(8, "Maximum 8 characters")
    .optional(),
  gram: z
    .string()
    .transform((v) => Number(v))
    .refine((v) => v >= 0.1 && v <= 10, {
      message: "Gram must be between 0.1 and 10",
    })
    .transform((v) => String(v))
    .optional(),
  wages: z
    .string()
    .transform((v) => Number(v))
    .refine((v) => v >= 10_000 && v <= 10_000_000, {
      message: "Wages must be between 10,000 and 10,000,000",
    })
    .transform((v) => String(v))
    .optional(),
  imgBase64: z
    .instanceof(FileList)
    .refine((file) => file.length > 0, "Image is required")
    .optional(),
});

type ProductFormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  product: ProductDto;
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
const ProductModal = ({ isOpen, onClose, product }: Props) => {
  const queryClient = useQueryClient();

  const {
    isLoading: isUpdating,
    error: updateError,
    mutateAsync: updateProduct,
  } = useUpdateProduct();

  const { mutateAsync: deleteProduct, isLoading: isPendingDelete } =
    useDeleteProduct();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...product,
      imgBase64: undefined,
      id: product.id,
      gram: String(product.gram),
    },
  });

  useEffect(() => {
    if (product.imgData) {
      fetch(product.imgData)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "File name", { type: "image/png" });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          setValue("imgBase64", dataTransfer.files);
        });
    }
  }, [product.imgData, setValue]);

  const handleCloseModal = () => {
    reset();
    onClose();
  };

  const handleDelete = async () => {
    if (!product) return;

    try {
      await deleteProduct(product.id);
      queryClient.invalidateQueries({ queryKey: ["products", "list"] });
      toast.success("Product deleted successfully");
      handleCloseModal();
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleCreateProduct = async (data: ProductFormData) => {
    const file = data.imgBase64 ? data.imgBase64[0] : undefined;

    try {
      let imgBase64String: string | undefined;

      if (file) {
        imgBase64String = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      }

      const updateData: Record<string, any> = {
        name: data.name,
        brand: data.brand,
        type: data.type,
        wages: data.wages,
        gram: data.gram,
      };

      if (imgBase64String) {
        updateData.imgData = imgBase64String;
      }

      await updateProduct({
        id: product.id,
        updateData,
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully");
      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error(updateError?.message || "Failed to update product");
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
          <div className="flex items-center mt-6 justify-between">
            <div>
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700"
                disabled={isPendingDelete}
                onClick={handleDelete}
              >
                Delete Product
              </Button>
            </div>

            <div className="flex gap-3 justify-end">
              <Button size="sm" variant="outline" onClick={handleCloseModal}>
                Close
              </Button>
              <Button size="sm" disabled={isUpdating} type="submit">
                {isUpdating ? "Updating..." : "Update Product"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProductModal;
