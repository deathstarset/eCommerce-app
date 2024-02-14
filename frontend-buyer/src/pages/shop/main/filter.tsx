import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

interface FilterProps {
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterFormSchema = z.object({
  price: z.object({
    min: z.coerce.number(),
    max: z.coerce.number(),
    order: z.enum(["order", "asc", "desc"]),
  }),
  rating: z.object({
    min: z.coerce.number(),
    max: z.coerce.number(),
    order: z.enum(["order", "asc", "desc"]),
  }),
  condition: z.enum(["new", "used", "both"]),
});

const selectOrderFields = ["Order", "Asc", "Desc"];
const conditionOptions = ["Both", "New", "Used"];
export const Filter = ({ setFilterOpen }: FilterProps) => {
  const form = useForm<z.infer<typeof FilterFormSchema>>({
    resolver: zodResolver(FilterFormSchema),
    defaultValues: {
      price: {
        min: "" as unknown as number,
        max: "" as unknown as number,
        order: "order",
      },
      rating: {
        min: "" as unknown as number,
        max: "" as unknown as number,
        order: "order",
      },
      condition: "both",
    },
  });

  const handleSubmit = (values: z.infer<typeof FilterFormSchema>) => {
    const operators = {
      min: "gte",
      max: "lte",
      asc: "-",
      desc: "+",
    };

    const genNumsQuery = (
      field: string,
      values: z.infer<typeof FilterFormSchema>
    ): string => {
      const fieldArr = Object.entries(values[field]);

      let fieldQuery = `${field}=`;
      fieldArr.forEach((entry) => {
        if (typeof entry[1] === "number") {
          if (entry[1] !== 0) {
            fieldQuery += `${operators[entry[0]]}:${entry[1]}`;
          }
        }
      });
      if (fieldQuery.split("=")[1] !== "") {
        return `${fieldQuery}`;
      }
      return "";
    };

    let conditionQuery = "condition=";
    if (values.condition !== "both") {
      conditionQuery += values.condition;
    }

    const addQuery = (queryObject: {
      price: string;
      rating: string;
      condition: string;
    }): string => {
      let queryString = "";
      Object.entries(queryObject).forEach((entry) => {
        if (entry[1].split("=")[1] !== "") {
          queryString += entry[1];
        }
      });
      return queryString;
    };

    const queryObject = {
      price: genNumsQuery("price", values),
      rating: genNumsQuery("rating", values),
      condition: conditionQuery,
    };
    console.log(addQuery(queryObject));
  };
  return (
    <AlertDialogContent className="w-[95%] rounded h-[86.5vh] my-2">
      <Form {...form}>
        <form
          className="flex flex-col justify-between w-full"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <AlertDialogHeader className="flex flex-col items-start overflow-scroll  px-1">
            <AlertDialogTitle className="text-2xl">
              Filter The Products
            </AlertDialogTitle>
            <div className="flex flex-col items-start gap-3">
              <h3 className="font-semibold">Price</h3>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="price.min"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input placeholder={"min"} {...field} type="number" />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="price.max"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input placeholder={"max"} {...field} type="number" />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="price.order"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Order" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectOrderFields.map((order, index) => (
                                <SelectItem
                                  key={index}
                                  value={order.toLowerCase()}
                                >
                                  {order}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <h3 className="font-semibold">Rating</h3>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="rating.min"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input placeholder={"min"} {...field} type="number" />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="rating.max"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input placeholder={"max"} {...field} type="number" />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  name="rating.order"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Order" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectOrderFields.map((order, index) => (
                              <SelectItem
                                key={index}
                                value={order.toLowerCase()}
                              >
                                {order}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <h3 className="font-semibold">Condition</h3>

              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          {conditionOptions.map((option, index) => {
                            return (
                              <div
                                className="flex items-center space-x-2"
                                key={index}
                              >
                                <RadioGroupItem
                                  value={option.toLowerCase()}
                                  id={option.toLowerCase()}
                                />
                                <Label htmlFor={option}>{option}</Label>
                              </div>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setFilterOpen(false)}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction type="submit">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </Form>
    </AlertDialogContent>
  );
};
