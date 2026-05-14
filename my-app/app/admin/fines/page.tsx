import { PageHeader } from "@/components/admin/page-header"
import { FinesTable } from "@/components/admin/fine-table"
import  {FineFilters} from "@/components/admin/fine-filters"

export default function FinesPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Fines" description="Manage and track overdue fines" icon="Receipt" />

      <FineFilters />
      <FinesTable />
    </div>
  )
}
