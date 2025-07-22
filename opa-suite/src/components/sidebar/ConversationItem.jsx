"use client";
import Link from "next/link";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export const ConversationIntem = ({ conversation }) => {
  let shortName =
    conversation?.otherUser?.name?.substring(0, 2).toUpperCase() || "";
  const getDataFormateLastSeen = () => {
    let dateLastSeen = new Date(conversation?.otherUser.lastSeen);
    let dateNow = new Date();

    if (dateNow.getDay() == dateLastSeen.getDay()) {
      let hours = dateLastSeen.getHours().toString().padStart(2, "0");
      let minutes = dateLastSeen.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }

    return `${dateLastSeen.getDay()}/${
      dateLastSeen.getMonth() + 1
    }/${dateLastSeen.getFullYear()}`;
  };
  let isOnline = conversation?.otherUser?.online 
  return (
    <SidebarMenuItem className="group relative">
      <SidebarMenuButton asChild>
        <Link
          href={`/conversation/${conversation.id}?receiverId=${conversation.otherUser.id}`}
          className="flex items-center gap-2 h-[3rem] w-full px-2"
        >
          <Avatar
            className={`${
              isOnline ? "border-2 border-green-300" : ""
            }`}
          >
            <AvatarImage src="https://github.com/defaul" alt="@shadcn" />
            <AvatarFallback>{shortName}</AvatarFallback>
          </Avatar>

          <div className="truncate flex-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                {conversation.otherUser.name}
              </span>
              <small className={`text-xs  ${isOnline ?  "text-green-600 font-medium":"text-gray-400"}`}>
                { isOnline? "agora": getDataFormateLastSeen()}
              </small>
            </div>
            <small className="text-xs text-gray-400 block truncate">
              {conversation.lastMessage?.content?.substring(0, 100) || ""}
            </small>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 m-0"
                onClick={(e) => e.preventDefault()}
              >
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-20">
              <DropdownMenuItem
                onSelect={() => console.log("Remover conversa")}
                className="text-red-500 focus:bg-red-50"
              >
                Remover
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
