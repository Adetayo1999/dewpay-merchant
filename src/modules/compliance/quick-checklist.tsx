import { ComplianceContainer } from "@components/containers/compliance-container";
import { MerchantComplianceChecklist } from "@components/merchant-compliance-checklist";

export default function QuickCheckListPage() {
  return (
    <ComplianceContainer>
      <MerchantComplianceChecklist />
    </ComplianceContainer>
  );
}
