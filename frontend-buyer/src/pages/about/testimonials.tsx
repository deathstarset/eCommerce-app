import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Testimonials = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-semibold">Testimonials</h1>
      <div className="flex items-center justify-between">
        <TestCard />
        <TestCard />
        <TestCard />
      </div>
    </div>
  );
};

const TestCard = () => {
  return (
    <Card className="p-4 flex flex-col gap-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h4 className="font-medium text-md">
        "Amazing products and great customer service."
      </h4>
      <p className="text-sm text-gray-400">Customer Name</p>
    </Card>
  );
};
