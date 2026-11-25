"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Price ranges are contiguous so every destination falls into exactly one bucket.
export const PRICE_RANGE_OPTIONS = [
  { value: "under-1000", label: "Under $1,000", min: 0, max: 1000 },
  { value: "1000-3000", label: "$1,000 - $3,000", min: 1000, max: 3000 },
  { value: "3000-5000", label: "$3,000 - $5,000", min: 3000, max: 5000 },
  { value: "over-5000", label: "$5,000 & above", min: 5000, max: Infinity },
];

export const SORT_OPTIONS = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

function FilterSelect({ label, value, onValueChange, options }) {
  const items = Object.fromEntries(
    options.map((option) => [option.value, option.label]),
  );

  return (
    <Select value={value} onValueChange={onValueChange} items={items}>
      <SelectTrigger className="h-11 w-full justify-between rounded-md px-4 text-xs font-medium tracking-wide uppercase">
        <SelectValue placeholder={label} />
      </SelectTrigger>

      <SelectContent align="start">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function DestinationsFilterBar({
  categories = [],
  category,
  priceRange,
  sort,
  onCategoryChange,
  onPriceRangeChange,
  onSortChange,
}) {
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...categories.map((value) => ({ value, label: value })),
  ];

  const priceRangeOptions = [
    { value: "all", label: "All Prices" },
    ...PRICE_RANGE_OPTIONS,
  ];

  const sortOptions = [
    { value: "featured", label: "Featured" },
    ...SORT_OPTIONS,
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <FilterSelect
        label="Category"
        value={category}
        onValueChange={onCategoryChange}
        options={categoryOptions}
      />

      <FilterSelect
        label="Price Range"
        value={priceRange}
        onValueChange={onPriceRangeChange}
        options={priceRangeOptions}
      />

      <FilterSelect
        label="Sort By"
        value={sort}
        onValueChange={onSortChange}
        options={sortOptions}
      />
    </div>
  );
}
