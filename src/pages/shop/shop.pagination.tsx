import { GetAllProductsResponse } from "@/app/types";
import { ApiResponseGeneric } from "@/app/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type ProductsPaginationProps = {
  data: ApiResponseGeneric<GetAllProductsResponse> | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
};
export const ProductsPagination = ({
  data,
  setPage,
  page,
}: ProductsPaginationProps) => {
  const handlePrev = () => {
    if (page >= 2) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (data) {
      if (page < data.data.totalPages) {
        setPage(page + 1);
      }
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrev} />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
