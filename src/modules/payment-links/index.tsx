import { useState } from "react";
import { PaymentLinksMetricCard } from "@components/payment-links-metric-card";
import { PaymentLinksTable } from "@components/tables/payment-links-table";
import { NewPaymentLinkModal } from "@components/modals/payment-links/new-payment-link-modal";
import { ViewPaymentLinkModal } from "@components/modals/payment-links/view-payment-link-modal";

export default function PaymentLinksPage() {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null
  );

  const handleNewLink = () => {
    setIsNewModalOpen(true);
  };

  const handleViewLink = (paymentId: string) => {
    setSelectedPaymentId(paymentId);
    setIsViewModalOpen(true);
  };

  const handleEditLink = (paymentId: string) => {
    // For now, just open the view modal in edit mode
    // You could create a separate edit modal if needed
    setSelectedPaymentId(paymentId);
    setIsViewModalOpen(true);
  };

  const handleNewModalSuccess = () => {
    setIsNewModalOpen(false);
    // The table will automatically refresh due to RTK Query cache invalidation
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedPaymentId(null);
  };

  return (
    <div className="flex flex-col gap-y-6">
      <PaymentLinksMetricCard />
      <PaymentLinksTable
        onNewLink={handleNewLink}
        onViewLink={handleViewLink}
        onEditLink={handleEditLink}
      />

      {/* Modals */}
      <NewPaymentLinkModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSuccess={handleNewModalSuccess}
      />

      <ViewPaymentLinkModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        paymentId={selectedPaymentId}
        onEdit={handleEditLink}
      />
    </div>
  );
}
