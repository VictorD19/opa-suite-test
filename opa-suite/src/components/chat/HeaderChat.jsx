"use client"
import { useParams, useSearchParams } from "next/navigation";
import { AvatarSection } from "../AvatarSection";
import { useCallback, useEffect, useState } from "react";
import { GetDetailsUser } from "@/api/user";

export const HeaderChat = () => {
  const userSearchParam = useSearchParams();
  const receiverId = userSearchParam.get("receiverId");
  const { id } = useParams();
  const [userReceiver, setUser] = useState(null);

  const receiverIdDetails = useCallback(async () => {
    if (!receiverId) return;
    let data = await GetDetailsUser(receiverId);
    let { erro } = data;
    if (erro) return toast.error(erro);
    setUser(data);
  }, [userReceiver]);

  useEffect(() => {
    receiverIdDetails();
  }, [id,receiverId]);

  return (
    <div className="p-2">
      <AvatarSection  user={userReceiver}/>
    </div>
  );
};
