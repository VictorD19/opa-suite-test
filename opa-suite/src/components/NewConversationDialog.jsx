"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { GetAllUsers } from "@/api/user";
import { useRouter } from "next/navigation";

export function NewConversationDialog({ trigger }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) || user.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleStartConversation = (userId) => {
    setDialogOpen(false);
    setSearch("");
    router.push("/conversation/0?receiverId=" + userId);
  };

  const handleOpenChange = async (open) => {
    setDialogOpen(open);
    if (open) {
      const data = await GetAllUsers();
      const { erro } = data;
      if (!erro) setUsers(data);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={dialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[40rem]">
        <DialogHeader>
          <DialogTitle>Nova Conversa</DialogTitle>
          <DialogDescription>
            Escolha um usuário para iniciar a conversa
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Buscar usuário..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ScrollArea className="h-60 mt-2  rounded-md">
          <div className="flex flex-col gap-1 p-2">
            {filtered.length > 0 ? (
              filtered.map((conversation) => (
                <Button
                  key={id}
                  variant="ghost"
                  onClick={()=>handleStartConversation(id)}
                  className="h-[4rem] p-2 group rounded flex gap-2 items-center hover:bg-primary justify-start text-left"
                >
                  <Avatar
                    className={`w-8 h-8 ${
                      conversation?.online ? "border-2 border-green-400" : ""
                    }`}
                  >
                    <AvatarImage src="/avatars/fulano.jpg" alt="Avatar" />
                    <AvatarFallback>
                      {username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="">
                    <p className="text-sm font-medium text-gray-800 group-hover:text-white">
                      {conversation?.name}
                    </p>
                    <p className="text-xs text-gray-500 group-hover:text-gray-200">
                      @{conversation?.username}
                    </p>
                  </div>
                </Button>
              ))
            ) : (
              <span className="text-sm text-muted-foreground p-2">
                Nenhum usuário encontrado
              </span>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
