"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);

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
  const GetAIResponse = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post("/api/ai-chat", {
      prompt: PROMPT,
    });
    console.log(result.data.result);
    const aiResp = {
        role: 'ai',
        content: result.data.result
    }
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        context: result.data.result,
      },
    ]);
    await UpdateMessages({
     messages: [...messages, aiResp],
      workspaceId: id,
    })
    setLoading(false);
  };
  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1]?.role;
      if (role == "user") {
        GetAIResponse();
      }
    }
  }, [messages]);
  const onGenerate = async (input) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        context: input,
      },
    ]);
    setUserInput("");
  };
  // Ensure messages is always treated as an array
  const messageArray = Array.isArray(messages)
    ? messages
    : messages
      ? [messages]
      : [];

  return (
    <div className="relative h-[85vh] flex flex-col">
      <div 
        className="flex-1 overflow-y-scroll scrollbar-hide" 
        style={{ 
          msOverflowStyle: 'none', 
          scrollbarWidth: 'none', 
          WebkitOverflowScrolling: 'touch' 
        }}>
        {messageArray.map((msg, index) => (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-center leading-7"
            key={index}
            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}>
            {msg?.role == "user" && (
              <Image
                src={userDetail?.picture || "/user-avatar.svg"}
                alt="userImage"
                width={35}
                height={35}
                className="rounded-full"
              />
            )}
            <h2>{msg.context}</h2>
          </div>
        ))}
        {loading && (
          <div
            className="p-3 rounded-lg flex gap-2 items-center"
            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}>
            <Loader2Icon className="animate-spin" />
            <h2>Generating response...</h2>
          </div>
        )}
      </div>
      <div className="p-5 border rounded-xl max-w-xl w-full mt-3">
        <div className="flex gap-2">
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
            value={userInput}
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
