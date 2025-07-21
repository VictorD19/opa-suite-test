"use client"
import { AvatarSection } from "@/components/Avatar-Section"
import { NewConversationDialog } from "@/components/NewConversationDialog"
import { AppSidebar } from "@/components/sidebar/Sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-20 shrink-0 items-center gap-2 border-b justify-between pe-4">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />

          </div>
          <AvatarSection />
        </header>
        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
          <img src="/chat-illustration.svg" alt="Chat illustration" className="w-48 mb-4" />
          <h2 className="text-2xl font-semibold">Bem-vindo ao Opa Suite Chat</h2>
          <p className="mt-2 max-w-lg">
            Selecione uma conversa à esquerda ou inicie uma nova para começar a falar com os usuarios disponiveis.
          </p>
          <NewConversationDialog trigger={   <Button
                className="mt-6 bg-primary text-white px-10 py-4 rounded hover:bg-primary/90"
              >
                Nova conversa +
              </Button>}/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
