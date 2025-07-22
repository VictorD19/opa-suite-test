"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";

import { Button } from "../ui/button";
import { ConversationIntem } from "./ConversationItem";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { SidebarFooterUser } from "./SidebarFooterUser";
import { NewConversationDialog } from "../NewConversationDialog";
import { GetAllConversation } from "@/api/conversations";
import { toast } from "sonner";
import { useSocket } from "@/context/SocketContext";

export function AppSidebar({ ...props }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [conversations, setConvesations] = useState([]);
    const { socket } = useSocket()

    const getConversations = useCallback(async () => {
        const data = await GetAllConversation();

        const { erro } = data;
        if (erro) return toast.error(erro);
        setConvesations(data)
    }, [conversations]);
    useEffect(() => {
        getConversations();
    }, []);


    useEffect(() => {
        if (!socket)
            return;
        socket?.on("user-status-changed", ({ userId, online, lastSeen }) => {
            let [existConvesationWithUser] = conversations.filter(user => user?.otherUser.id == userId)
            if (!existConvesationWithUser)
                return;


            setConvesations(prevConversations => {
                return prevConversations.map(conversation => {
                    if (conversation.otherUser.id === userId) {
                        return {
                            ...conversation,
                            otherUser: {
                                ...conversation.otherUser,
                                online: online
                            }
                        };
                    }
                    return conversation;
                });
            });

        });

        socket.on("new_message", ({ message, otherUser }) => {
            let [existConvesationWithUser] = conversations.filter(user => user?.otherUser.id == otherUser.id)
            if (!existConvesationWithUser)
                return setConvesations(prev => [...prev, {
                    id: message.conversationId,
                    otherUser,
                    lastMessage: message
                }])


            setConvesations(prevConversations => {
                return prevConversations.map(conversation => {
                    if (conversation.otherUser.id === otherUser.id) {
                        return {
                            ...conversation,
                            lastMessage: message
                        };
                    }
                    return conversation;
                });
            });
        })
    }, [conversations]);


    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <h1 className="font-bold text-2xl my-2">Opa Suite Chat</h1>
                    </SidebarMenuItem>
                </SidebarMenu>
                <div className="p-2">
                    <NewConversationDialog
                        trigger={<Button className="w-full">Nova Conversa + </Button>}
                    />
                </div>
                <div className="px-2 py-0 mb-2">
                    <div className="relative">
                        <SidebarInput
                            placeholder="Buscar Conversa..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 h-10"
                        />
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {conversations.length > 0 &&
                            conversations.map((conversation) => <ConversationIntem key={conversation.id} conversation={conversation} />)}
                        {conversations.length == 0 && (
                            <small className="text-center">Sem conversas Recente</small>
                        )}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
            <SidebarFooter className="mb-2">
                <SidebarFooterUser
                />
            </SidebarFooter>
        </Sidebar>
    );
}
