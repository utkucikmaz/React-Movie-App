import { Movies } from "components/Movies";
import { Search } from "components/Search";
import { useState } from "react";

export default function Main() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Search setSearchTerm={setSearchTerm} />
      <Movies searchTerm={searchTerm} />
    </>
  );
}
