import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CartItemsOverview } from "./cart.overview";
import { useCreateOrderMutation } from "@/app/services/orders.api";
import { useAppSelector } from "@/app/hooks";
import { selectCartItems, selectCartTotal } from "@/app/features/cart.slice";
import { useState } from "react";
import { toast } from "sonner";
const formFeilds = {
  first_name: "First Name",
  last_name: "Last Name",
  email: "Email Address",
  phone_number: "Phone Number",
  shipping_address: "Shipping Address",
};

// defining the order form schema
const orderSchema = z.object({
  first_name: z.string().min(4),
  last_name: z.string().min(4),
  email: z.string().email(),
  phone_number: z
    .string()
    .regex(
      /^(\+\d{1,2}\s?)?(\(\d{1,4}\)|\d{1,4})[-\s]?\d{1,12}([-_\s]?\d{1,5})?$/
    ),
  shipping_address: z.string().min(4),
});

export const OrderForm = () => {
  // defining the form using react hook form
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      shipping_address: "",
    },
  });
  // the hook to create the order on the backend
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation({});
  const [error, setError] = useState(false);
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  // defining the submit form handler
  const handleSubmit = (values: z.infer<typeof orderSchema>) => {
    // making the post request to to create order on the backend
    createOrder({
      personal_info: {
        ...values,
      },
      items,
      total_amount: total,
    })
      .unwrap()
      .then((response) => {
        if (!response.success) {
          setError(true);
          setTimeout(() => {
            setError(!error);
          }, 1000);
        }
      });
  };
  if (isSuccess) {
    toast("Order Sent Succefully");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        {Object.entries(formFeilds).map(([key, label], index) => {
          return (
            <FormField
              key={index}
              control={form.control}
              name={key}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          );
        })}
        <CartItemsOverview />
        <Button
          type="submit"
          disabled={isLoading}
          className={`${isLoading && "opacity-35"}`}
        >
          {isLoading ? "Submitting Order" : "Submit Order"}
        </Button>
        {(error || isError) && (
          <div className="text-red-500">
            An Error Has Occured While Submitting The Order
          </div>
        )}
      </form>
    </Form>
  );
};
