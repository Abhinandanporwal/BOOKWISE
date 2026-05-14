import { PageHeader } from "@/components/admin/page-header"
import { UsersTable } from "@/components/admin/users-table"
import { UserFilters } from "@/components/admin/user-filters"

export default function UsersPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Users" description="Manage library members and their accounts" icon="Users" />

      <UserFilters />
      <UsersTable />
    </div>
  )
}
