import { useState, useCallback, useMemo } from "react";
import { StatementsTable } from "@components/tables/statements-table";
import { DateRangePicker } from "@components/date-range-picker";

interface DateRange {
  start: Date | null;
  end: Date | null;
}

export default function StatementsPage() {
  const [searchFilter, setSearchFilter] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });

  // Set default date range to last 30 days
  const defaultDateRange = useMemo(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    return { start, end };
  }, []);

  // Initialize with default date range if no range is set
  const effectiveDateRange = useMemo(() => {
    if (!dateRange.start || !dateRange.end) {
      return defaultDateRange;
    }
    return dateRange;
  }, [dateRange, defaultDateRange]);

  const handleDateRangeChange = useCallback(
    (start: Date | null, end: Date | null) => {
      setDateRange({ start, end });
    },
    []
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchFilter(value);
  }, []);

  const minDate = new Date(2020, 0, 1);
  const maxDate = new Date();

  return (
    <div className="flex flex-col gap-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Statements</h1>
          <p className="text-gray-600 mt-1">
            View and export your account transaction statements
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* Date Range Picker */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date Range:
            </label>
            <DateRangePicker
              dateRange={effectiveDateRange}
              onDateRangeChange={handleDateRangeChange}
              minDate={minDate}
              maxDate={maxDate}
              placeholder="Select Date Range"
            />
          </div>

          {/* Search Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search:
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchFilter}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Statements Table */}
      <StatementsTable
        searchFilter={searchFilter}
        dateRange={effectiveDateRange}
      />
    </div>
  );
}
