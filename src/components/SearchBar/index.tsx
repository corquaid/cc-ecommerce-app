import { DeleteIcon } from '../Icons/DeleteIcon'
import { SearchIcon } from '../Icons/SearchIcon'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar(props: SearchBarProps) {
  return (
    <div className="mb-4 border rounded flex justify-between align-middle">
      <input
        type="text"
        placeholder="Search"
        value={props.value}
        className="w-full rounded py-2 focus:outline-none px-4"
        onChange={(e) => props.onChange(e.target.value)}
      />
      <div className="mr-2 flex items-center">
        {props.value === '' ? (
          <SearchIcon />
        ) : (
          <DeleteIcon onClear={props.onChange} />
        )}
      </div>
    </div>
  )
}
