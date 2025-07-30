import Button from "../ui/button/Button";

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: Props) => {
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center gap-1 flex-wrap">
      {visiblePages[0] > 1 && (
        <>
          <Button
            size="sm"
            type="button"
            variant={currentPage === 1 ? "primary" : "outline"}
            onClick={() => onPageChange(1)}
          >
            1
          </Button>
          {visiblePages[0] > 2 && <span className="p-2">...</span>}
        </>
      )}

      {visiblePages.map((page) => (
        <Button
          size="sm"
          key={page}
          type="button"
          variant={currentPage === page ? "primary" : "outline"}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="p-2">...</span>
          )}
          <Button
            size="sm"
            type="button"
            variant={currentPage === totalPages ? "primary" : "outline"}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Button>
        </>
      )}
    </div>
  );
};

export default Pagination;
