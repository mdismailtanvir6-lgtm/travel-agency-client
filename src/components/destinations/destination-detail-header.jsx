import Link from "next/link";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DestinationDetailHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <Link
        href="/destinations"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to Destinations
      </Link>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-9 gap-2 px-4">
          <Pencil size={14} />
          Edit
        </Button>

        <Button
          variant="destructive"
          size="sm"
          className="h-9 gap-2 border border-destructive/30 px-4"
        >
          <Trash2 size={14} />
          Cancel
        </Button>
      </div>
    </div>
  );
}
