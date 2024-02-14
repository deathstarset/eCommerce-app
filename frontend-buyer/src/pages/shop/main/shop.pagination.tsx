import { GetAllProductsResponse } from "@/app/types";
import { ApiResponseGeneric } from "@/app/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  const [paginationNumbers, setPaginationNumbers] = useState(
    Array.from({
      length: 2,
    }).map((_, index) => {
      return index + 1;
    })
  );
  const [_, setSearchParams] = useSearchParams();

  const handlePrev = () => {
    if (page >= 2) {
      setPage(page - 1);
      if (page === paginationNumbers[0] && page > 1) {
        setPaginationNumbers(
          paginationNumbers.map((num) => {
            return num - 1;
          })
        );
      }
      setSearchParams((prevPrams) => {
        const pageParam = prevPrams.get("page");
        if (pageParam) {
          prevPrams.set("page", (+pageParam - 1).toString());
        }
        return prevPrams;
      });
    }
  };
  const handleNext = () => {
    if (data) {
      if (page < data.data.totalPages) {
        setPage((page) => page + 1);
        if (page === paginationNumbers[1]) {
          setPaginationNumbers(
            paginationNumbers.map((num) => {
              return num + 1;
            })
          );
        }
        setSearchParams((prevPrams) => {
          const pageParam = prevPrams.get("page");
          if (!pageParam) {
            prevPrams.set("page", (page + 1).toString());
          } else {
            prevPrams.set("page", (+pageParam + 1).toString());
          }
          return prevPrams;
        });
      }
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrev} />
        </PaginationItem>
        {data &&
          paginationNumbers.map((num) => {
            return (
              <PaginationItem key={num}>
                <PaginationLink
                  className={`${
                    page === num && "bg-black text-white"
                  } transition-all duration-200`}
                >
                  {num}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
