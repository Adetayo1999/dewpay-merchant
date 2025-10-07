import { useState } from "react";
import { CustomersTable } from "@components/tables/customers-table";
import { UsersMetricCard } from "@components/users-metric-card";
import { useGetCustomerListQuery } from "../../store/api/merchantApi";

export default function Customers() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Single API call for both metric card and table
  const { data, isLoading } = useGetCustomerListQuery({
    offset: ((currentPage - 1) * limit).toString(),
    limit: limit.toString(),
  });

  return (
    <div className="flex flex-col gap-y-6">
      <UsersMetricCard total={data?.total || 0} isLoading={isLoading} />
      <CustomersTable
        data={data}
        isLoading={isLoading}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        limit={limit}
      />
    </div>
  );
}
