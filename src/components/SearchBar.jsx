import React from 'react'

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="mb-6 flex justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="w-full max-w-md p-3 border rounded shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  )
}

export default SearchBar
