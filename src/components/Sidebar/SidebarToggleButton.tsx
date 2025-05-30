import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const SidebarToggleButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-20" onClick={onClick}>
    <Menu />
  </Button>
)
