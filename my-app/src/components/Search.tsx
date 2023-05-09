export const Search = ({
  setSearchTerm,
}: {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <input
      type="search"
      placeholder="   Search a movie..."
      className="search-input"
      onChange={e => setSearchTerm(e.target.value)}
    />
  );
};
