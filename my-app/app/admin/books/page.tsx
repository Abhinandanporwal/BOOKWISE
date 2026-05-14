import { PageHeader } from "@/components/admin/page-header"
import { BooksTable } from "@/components/admin/book-table"
import { BookFilters } from "@/components/admin/book-filters"

export default function BooksPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Books" description="Manage your library's book collection" icon="BookOpen" />

      <BookFilters />
      <BooksTable />
    </div>
  )
}
