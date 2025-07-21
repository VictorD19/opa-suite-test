import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarSection() {
  return (
   
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">Fulano de Tal</p>
          <p className="text-xs text-gray-500">fulanodetal@gmail.com</p>
        </div>
        <Avatar className="w-8 h-8">
          <AvatarImage src="/avatars/fulano.jpg" alt="Avatar" />
          <AvatarFallback>FT</AvatarFallback>
        </Avatar>
      </div>
  );
}