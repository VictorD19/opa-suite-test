import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarSection({ user }) {

  const shortName = user?.username?.substring(0, 2).toUpperCase();
  const getDataMessage = () => {
    if (!user?.lastSeen) return;
    let now = new Date();
    let create = new Date(user?.lastSeen);
    let dayNow = now.getDay();
    let dayCreate = create.getDay();
    let isToday = dayNow == dayCreate;
    if (isToday)
      return `hoje ${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

    return `${create.getDay()}/${create.getMonth()}/${create.getFullYear()}`;
  };
  return (
    <div className="flex items-center space-x-3">
      <Avatar className={`${user?.online ? "border-2 border-green-300" : ""}`}>
        <AvatarImage src="/" alt="Avatar" />
        <AvatarFallback className="bg-orange-300">{shortName}</AvatarFallback>
      </Avatar>
      <div className="text-left w-full relative">
        <p
          className={`text-sm absolute top-0 right-0 ${
            user?.online ? "text-green-500" : "text-gray-500"
          }`}
        >
          {user?.online ? "agora" : getDataMessage()}
        </p>
        <p className="text-sm font-medium text-gray-800">{user?.name}</p>
        <p className="text-xs text-gray-500">@{user?.username}</p>
      </div>
    </div>
  );
}
