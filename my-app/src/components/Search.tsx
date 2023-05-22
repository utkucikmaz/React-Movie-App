export const Search = ({
    setSearchTerm,
}: {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
    return (
        <div className="d-flex justify-content-center">
            <input
                type="search"
                data-cy="searchInput"
                placeholder="Search a movie..."
                className="search-input"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};
