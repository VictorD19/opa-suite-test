
'use client'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export function NewConversationDialog({ trigger }) {
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bruno" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
    { id: 3, name: "Carla" },
  ])

  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleStartConversation = (userId) => {
    console.log("Iniciar conversa com usuário", userId)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[40rem]">
        <DialogHeader>
          <DialogTitle>Nova Conversa</DialogTitle>
          <DialogDescription>Escolha um usuário para iniciar a conversa</DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Buscar usuário..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ScrollArea className="h-60 mt-2  rounded-md">
          <div className="flex flex-col gap-1 p-2">
            {filtered.length ? (
              filtered.map((user) => (
                <Link
                  key={user.id}
                  href={"/conversation/" + user.id}
                  variant="ghost"
                  className="h-[4rem] p-2  rounded flex gap-2 items-center"
                  onClick={() => handleStartConversation(user.id)}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/avatars/fulano.jpg" alt="Avatar" />
                    <AvatarFallback>FT</AvatarFallback>
                  </Avatar>    
                  <div className="">
                    <p className="text-sm font-medium text-gray-800">Name</p>
                    <p className="text-xs text-gray-500">@username</p>
                  </div>
                </Link>
              ))
            ) : (
              <span className="text-sm text-muted-foreground p-2">Nenhum usuário encontrado</span>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
