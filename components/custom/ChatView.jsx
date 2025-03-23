"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect } from "react";

const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);

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
    <div>
      <div>
        {messageArray.map((msg, index) => (
          <div key={index} style={{ backgroundColor: Colors.CHAT_BACKGROUND }}>
            <h2>{msg.context}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatView;
