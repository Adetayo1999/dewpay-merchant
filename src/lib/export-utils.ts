import { Statement } from "../store/api/merchantApi";

export const exportToExcel = async (
  data: Statement[],
  filename = "Statement-Export"
) => {
  try {
    // Dynamic import to avoid bundling xlsx in the main bundle if not needed
    const XLSX = await import("xlsx");

    // Prepare data for export
    const exportData = data.map((statement) => ({
      Amount: statement.amount,
      Narration: statement.memo,
      Type: statement.type,
      Reference: statement.txn_reference,
      Date: new Date(statement.created_at).toLocaleDateString(),
      Status: statement.status,
    }));

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Set column widths for better readability
    const columnWidths = [
      { wch: 15 }, // Amount
      { wch: 30 }, // Narration
      { wch: 10 }, // Type
      { wch: 20 }, // Reference
      { wch: 12 }, // Date
      { wch: 10 }, // Status
    ];
    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Statements");

    // Generate filename with current date
    const currentDate = new Date().toISOString().split("T")[0];
    const finalFilename = `${filename}-${currentDate}.xlsx`;

    // Download file
    XLSX.writeFile(workbook, finalFilename);

    return { success: true, filename: finalFilename };
  } catch (error) {
    console.error("Export error:", error);
    throw new Error("Failed to export data to Excel");
  }
};

export const exportToCSV = (
  data: Statement[],
  filename = "Statement-Export"
) => {
  try {
    // Prepare data for CSV export
    const headers = [
      "Amount",
      "Narration",
      "Type",
      "Reference",
      "Date",
      "Status",
    ];
    const csvData = data.map((statement) => [
      statement.amount,
      statement.memo,
      statement.type,
      statement.txn_reference,
      new Date(statement.created_at).toLocaleDateString(),
      statement.status,
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);

      const currentDate = new Date().toISOString().split("T")[0];
      const finalFilename = `${filename}-${currentDate}.csv`;
      link.setAttribute("download", finalFilename);

      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return { success: true, filename: finalFilename };
    }

    throw new Error("Download not supported");
  } catch (error) {
    console.error("CSV Export error:", error);
    throw new Error("Failed to export data to CSV");
  }
};
