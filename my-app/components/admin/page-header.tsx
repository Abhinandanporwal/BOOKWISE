import type { LucideIcon } from "lucide-react"
import * as LucideIcons from "lucide-react"

interface PageHeaderProps {
  title: string
  description: string
  icon: string
}

export function PageHeader({ title, description, icon }: PageHeaderProps) {
  // Dynamically get the icon component
  const Icon = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-600 rounded-lg p-2.5 shadow-lg shadow-blue-900/20">
          {Icon && <Icon className="w-5 h-5 text-gray-100" />}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-100">{title}</h1>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  )
}
