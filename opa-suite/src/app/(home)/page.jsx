"use client"
import { NewConversationDialog } from "@/components/NewConversationDialog"
import { Button } from "@/components/ui/button"


export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
      <h2 className="text-2xl font-semibold">Bem-vindo ao Opa Suite Chat</h2>
      <p className="mt-2 max-w-lg">
        Selecione uma conversa à esquerda ou inicie uma nova para começar a falar com os usuarios disponiveis.
      </p>
      <NewConversationDialog trigger={<Button
        className="mt-6 bg-primary text-white px-10 py-4 rounded hover:bg-primary/90"
      >
        Nova conversa +
      </Button>} />
    </div>
  );
}
