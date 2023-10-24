type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};
const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <button
                disabled={currentPage === 1}
                onClick={handlePrevious}
                style={{ marginRight: "10px" }}
            >
                ←
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    style={{
                        background: currentPage === index + 1 ? "lightgray" : "white",
                        margin: "0 5px",
                    }}
                >
                    {index + 1}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={handleNext}
                style={{ marginLeft: "10px" }}
            >
                →
            </button>

            <div style={{ marginLeft: "20px" }}>
                {currentPage} of {totalPages}
            </div>
        </div>
    );
};

export default Pagination;
