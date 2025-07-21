
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
} from "@/components/ui/sidebar"

import { Button } from "../ui/button";
import { ConversationIntem } from "./ConversationItem";
import { Search } from "lucide-react";
import { useState } from "react";
import { SidebarFooterUser } from "./SidebarFooterUser";
import { NewConversationDialog } from "../NewConversationDialog";

const data = [
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
    { tittle: "asai," },
]

export function AppSidebar({
    ...props
}) {
    const [searchQuery, setSearchQuery] = useState("")
    return (
        <Sidebar {...props} >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <h1 className="font-bold text-2xl my-2">Opa Suite Chat</h1>
                    </SidebarMenuItem>
                </SidebarMenu>
                <div className="p-2">
                        <NewConversationDialog trigger={   <Button className="w-full">Nova Conversa + </Button>}/>
                   
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

                        {data.map((item) => (
                            <ConversationIntem key={item.title} />
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail/>
            <SidebarFooter className="mb-2">
                <SidebarFooterUser user={{
                    name: "shadcn",
                    email: "m@example.com",
                    avatar: "/avatars/shadcn.jpg",
                }} />
            </SidebarFooter>
        </Sidebar>
    );
}
