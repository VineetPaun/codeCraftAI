"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { useConvex } from "convex/react";
import { ArrowRight, Link } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const {userInput, setUserInput} = useState();

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result?.messages);
    console.log(result);
  };
  // Ensure messages is always treated as an array
  const messageArray = Array.isArray(messages)
    ? messages
    : messages
      ? [messages]
      : [];

  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll">
        {messageArray.map((msg, index) => (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-start"
            key={index}
            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}>
            {msg?.role == "user" && (
              <Image
                src={userDetail?.picture || '/user-avatar.svg'}
                alt="userImage"
                width={35}
                height={35}
                className="rounded-full"
              />
            )}
            <h2>{msg.context}</h2>
          </div>
        ))}
      </div>
      <div className="p-5 border rounded-xl max-w-xl w-full mt-3">
        <div className="flex gap-2">
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
            onChange={(event) => setUserInput(event.target.value)}
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer"
            />
          )}
        </div>
        <div>
          <Link className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default ChatView;