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

interface FilterProps {
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Filter = ({ setFilterOpen }: FilterProps) => {
  return (
    <AlertDialogContent className="w-[95%] rounded h-[86.5vh] my-2">
      <AlertDialogHeader className="flex flex-col items-start overflow-scroll  ">
        <AlertDialogTitle className="text-2xl">
          Filter The Products
        </AlertDialogTitle>
        <div className="flex flex-col gap-6  w-full">
          <div className="flex flex-col items-start gap-3">
            <h3 className="font-semibold">Price</h3>
            <div className="flex flex-col gap-2">
              <Input type="number" placeholder="min" />
              <Input type="number" placeholder="max" />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Asc</SelectItem>
                  <SelectItem value="dark">Desc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <h3 className="font-semibold">Rating</h3>
            <div className="flex flex-col gap-2">
              <Input type="number" placeholder="min" />
              <Input type="number" placeholder="max" />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Asc</SelectItem>
                  <SelectItem value="dark">Desc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <h3 className="font-semibold">Condition</h3>
            <RadioGroup defaultValue="both">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="option-two">Both</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="new" />
                <Label htmlFor="option-one">New</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="old" id="old" />
                <Label htmlFor="used">Used</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setFilterOpen(false)}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
