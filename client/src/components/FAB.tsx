import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface FABProps {
  onClick: () => void;
  icon?: ReactNode;
  label?: string;
}

export default function FAB({ onClick, icon, label }: FABProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40"
      size="icon"
      title={label}
    >
      {icon || <Plus className="h-6 w-6" />}
    </Button>
  );
}

// Extended FAB with label
export function FABWithLabel({ onClick, icon, label }: FABProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 h-14 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40 gap-2"
      title={label}
    >
      {icon || <Plus className="h-5 w-5" />}
      {label && <span className="font-medium">{label}</span>}
    </Button>
  );
}
