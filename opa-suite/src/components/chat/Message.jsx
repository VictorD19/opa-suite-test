import { useAuth } from "@/context/AutContext";

const Message = ({  content, senderId, receiverId, createdAt }) => {
  const { user } = useAuth();
  const getDataMessage = () => {
    let now = new Date();
    let create = new Date(createdAt);
    let dayNow = now.getDay();
    let dayCreate = create.getDay();
    let isToday = dayNow == dayCreate;
    if (isToday)
      return `hoje ${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

        return `${create.getDay()}/${create.getMonth()}/${create.getFullYear()}`
  };

  return (
    <div className="p-2 h-auto">
      <div
        className={`flex gap-4 ${
          user?.id === senderId ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`flex-1 space-y-2 ${
            user?.id === senderId ? "flex justify-end" : ""
          }`}
        >
          <div
            className={`flex-col  ${
              user?.id === senderId
                ? "bg-violet-700/50 rounded-[20px] px-4 py-2 inline-block text-end"
                : "bg-orange-700/50 rounded-[20px] px-4 py-2 inline-block "
            }`}
          >
            <p>{content}</p>
            <small>{getDataMessage()}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
