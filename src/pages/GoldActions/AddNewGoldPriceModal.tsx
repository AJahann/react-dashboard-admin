import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import type { LatestGoldPricesResponse } from "../../libs/data-layer/gold-price";

import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { useCreateGoldPrice } from "../../libs/data-layer/gold-price";

const schema = z.object({
  sellPrice: z
    .string()
    .regex(/^\d+$/, "Digits only")
    .refine(
      (val) => {
        const num = Number(val);
        return num > 1_000_000 && num < 10_000_000;
      },
      { message: "Must be between 1,000,001 and 9,999,999" },
    ),
  buyPrice: z
    .string()
    .regex(/^\d+$/, "Digits only")
    .refine(
      (val) => {
        const num = Number(val);
        return num > 1_000_000 && num < 10_000_000;
      },
      { message: "Must be between 1,000,001 and 9,999,999" },
    ),
});

type FormData = z.infer<typeof schema>;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  prices: LatestGoldPricesResponse;
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

const AddNewGoldPriceModal = ({ isOpen, onClose, prices }: ModalProps) => {
  const {
    isLoading: isCreating,
    error: createError,
    mutateAsync,
  } = useCreateGoldPrice();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      buyPrice: String(prices.buyPrice),
      sellPrice: String(prices.sellPrice),
    },
  });

  const handleCloseModal = () => {
    reset();
    onClose();
  };

  const handleCreateUser = async (data: FormData) => {
    try {
      await mutateAsync({
        buyPrice: +data.buyPrice,
        sellPrice: +data.sellPrice,
      });

      toast.success("New gold price created successfully");
      handleCloseModal();
    } catch {
      if (!createError?.message) return;
      toast.error(createError.message);
    }
  };

  return (
    <Modal className="max-w-[450px] m-4" isOpen={isOpen} onClose={onClose}>
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900">
        <div className="px-2 pr-14">
          <h4 className="mb-2 py-4 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Add new gold prices
          </h4>
        </div>

        <form
          className="flex flex-col"
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <div className="custom-scrollbar h-auto overflow-y-auto px-2 pb-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
              <FormField
                label="Buy price"
                error={errors.buyPrice}
                inputProps={{
                  type: "text",
                  ...register("buyPrice"),
                  placeholder: "9,999,999",
                }}
              />

              <FormField
                label="Sell price"
                error={errors.sellPrice}
                inputProps={{
                  type: "text",
                  ...register("sellPrice"),
                  placeholder: "9,999,999",
                }}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <Button size="sm" variant="outline" onClick={handleCloseModal}>
              Close
            </Button>
            <Button size="sm" disabled={isCreating} type="submit">
              {isCreating ? "Applying..." : "Apply new prices"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddNewGoldPriceModal;
