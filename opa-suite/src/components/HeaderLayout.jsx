

import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export default function HeaderLayout() {
  return (
    <header className="flex h-20 shrink-0 items-center gap-2 border-b justify-between pe-4">
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>
    </header>
  );
}
