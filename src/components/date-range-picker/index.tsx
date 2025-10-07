import { useState, useCallback } from "react";
import { format } from "date-fns";

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface DateRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (start: Date | null, end: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
}

export const DateRangePicker = ({
  dateRange,
  onDateRangeChange,
  minDate = new Date(2020, 0, 1),
  maxDate = new Date(),
  placeholder = "Select Date Range",
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStart, setTempStart] = useState<Date | null>(dateRange.start);
  const [tempEnd, setTempEnd] = useState<Date | null>(dateRange.end);

  const formatDateRange = useCallback(
    (start: Date | null, end: Date | null) => {
      if (!start || !end) return placeholder;
      return `${format(start, "MM/dd/yyyy")} - ${format(end, "MM/dd/yyyy")}`;
    },
    [placeholder]
  );

  const handleApply = useCallback(() => {
    onDateRangeChange(tempStart, tempEnd);
    setIsOpen(false);
  }, [tempStart, tempEnd, onDateRangeChange]);

  const handleClear = useCallback(() => {
    setTempStart(null);
    setTempEnd(null);
    onDateRangeChange(null, null);
    setIsOpen(false);
  }, [onDateRangeChange]);

  const handleQuickSelect = useCallback(
    (days: number) => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - days);

      setTempStart(start);
      setTempEnd(end);
      onDateRangeChange(start, end);
      setIsOpen(false);
    },
    [onDateRangeChange]
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white"
      >
        <span className="text-sm text-gray-700">
          {formatDateRange(dateRange.start, dateRange.end)}
        </span>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 min-w-[320px]">
          {/* Quick Select Buttons */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Quick Select
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleQuickSelect(7)}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Last 7 days
              </button>
              <button
                onClick={() => handleQuickSelect(30)}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Last 30 days
              </button>
              <button
                onClick={() => handleQuickSelect(90)}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Last 90 days
              </button>
              <button
                onClick={() => handleQuickSelect(365)}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Last year
              </button>
            </div>
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                value={tempStart ? format(tempStart, "yyyy-MM-dd") : ""}
                onChange={(e) =>
                  setTempStart(e.target.value ? new Date(e.target.value) : null)
                }
                min={format(minDate, "yyyy-MM-dd")}
                max={format(maxDate, "yyyy-MM-dd")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                value={tempEnd ? format(tempEnd, "yyyy-MM-dd") : ""}
                onChange={(e) =>
                  setTempEnd(e.target.value ? new Date(e.target.value) : null)
                }
                min={
                  tempStart
                    ? format(tempStart, "yyyy-MM-dd")
                    : format(minDate, "yyyy-MM-dd")
                }
                max={format(maxDate, "yyyy-MM-dd")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button
              onClick={handleClear}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={!tempStart || !tempEnd}
              className="px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
