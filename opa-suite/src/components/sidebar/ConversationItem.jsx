"use client"
import Link from "next/link"
import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "../ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Ellipsis } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export const ConversationIntem = ({ title, url = "/", idConversation }) => {
    return (<SidebarMenuItem className="group relative">
        <SidebarMenuButton asChild>
            <Link
                href={url}
                className="flex items-center gap-2 h-[3rem] w-full px-2"
            >
                <Avatar>
                    <AvatarImage src="https://github.com/defaul" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="truncate flex-1">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">UserName</span>
                        <small className="text-xs text-gray-400">30min</small>
                    </div>
                    <small className="text-xs text-gray-400 block truncate">
                        last message preview asdaa dasd asdasdad asdas
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

                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                            onSelect={() => console.log("Finalizar conversa")}
                        >
                            Finalizar conversa
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={() => console.log("Remover conversa")}
                            className="text-red-500 focus:bg-red-50"
                        >
                            Remover conversa
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Link>
        </SidebarMenuButton>
    </SidebarMenuItem>)
}