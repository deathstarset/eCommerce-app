import {
  nextPage,
  previousPage,
  selectCurrentPage,
  selectTotalPages,
  setCurrentPage,
} from "@/app/features/products.slice";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";

export const ProductsPagination = () => {
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);
  const dispatch = useAppDispatch();
  const totalPagesArr = Array.from(
    { length: Number(totalPages) },
    (_, index) => {
      return index + 1;
    }
  );

  // handling next and previous events on the page
  const handleNext = () => {
    dispatch(nextPage());
  };
  const handlePrevious = () => {
    dispatch(previousPage());
  };

  // handling search params
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevious} />
        </PaginationItem>
        {totalPagesArr.map((_, index) => {
          return (
            <PaginationItem key={index + 1}>
              <PaginationLink
                onClick={() => dispatch(setCurrentPage(index + 1))}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
