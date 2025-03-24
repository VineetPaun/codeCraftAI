"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  useSandpack,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";
import axios from "axios";
import { MessagesContext } from "@/context/MessagesContext";
import Prompt from "@/data/Prompt";

// Component to track file changes and persist them
const FileChangeTracker = ({ setFiles }) => {
  const { sandpack } = useSandpack();
  const { files: sandpackFiles, activeFile } = sandpack;
  const prevFilesRef = useRef(sandpackFiles);
  const {messages, setMessages} = useContext(MessagesContext)
  
  const GenerateAICode = async () => {
    const PROMPT = messages[messages?.length - 1]?.content + " " + Prompt.CODE_GEN_PROMPT
    const result = await axios.post('/api/gen-ai-code', {
      prompt: PROMPT
    })
    console.log(result.data);
    const aiResp = result.data
    const mergedFiles = {...Lookup.DEFAULT_FILE, ...aiResp?.files}
    setFiles(mergedFiles)
  }

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1]?.role;
      if (role == "user") {
        GenerateAICode();
      }
    }
  }, [messages]);

  useEffect(() => {
    // This effect will run whenever sandpackFiles or activeFile changes
    if (JSON.stringify(prevFilesRef.current) !== JSON.stringify(sandpackFiles)) {
      // Files have changed, update state and localStorage
      setFiles(sandpackFiles);
      
      // Store all files in localStorage
      Object.keys(sandpackFiles).forEach(filePath => {
        const fileContent = sandpackFiles[filePath]?.code;
        if (fileContent) {
          localStorage.setItem(`sandpack-file-${filePath}`, fileContent);
        }
      });
      
      prevFilesRef.current = sandpackFiles;
    }
  }, [sandpackFiles, activeFile, setFiles]);
  
  return null; // This is a utility component, it doesn't render anything
};

const CodeView = () => {
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(() => {
    // Initialize files from localStorage if available, otherwise use defaults
    if (typeof window !== "undefined") {
      const savedFiles = {};
      let hasStoredFiles = false;

      // Check if we have any stored files
      Object.keys(Lookup?.DEFAULT_FILE || {}).forEach((filePath) => {
        const storedContent = localStorage.getItem(`sandpack-file-${filePath}`);
        if (storedContent) {
          savedFiles[filePath] = { code: storedContent };
          hasStoredFiles = true;
        } else {
          savedFiles[filePath] = Lookup?.DEFAULT_FILE[filePath];
        }
      });

      return hasStoredFiles ? savedFiles : Lookup?.DEFAULT_FILE;
    }

    return Lookup?.DEFAULT_FILE;
  });
  return (
    <div>
      <div className="bg-[#181818] w-full p-2 border">
        <div className="flex items-center flex-wrap shrink-0 bg-black p-1 justify-center rounded-full w-[140px] gap-3">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer ${activeTab == "code" && "text-blue-300 bg-blue-800 p-1 px-2 rounded-full"}`}>
            Code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer ${activeTab == "preview" && "text-blue-300 bg-blue-800 p-1 px-2 rounded-full"}`}>
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider
        files={files}
        template="react"
        theme={"dark"}
        customSetup={{
          dependencies: {
            ...Lookup.DEPENDANCY,
          },
        }}
        options={{
          externalResources: [
            "https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio",
          ],
        }}>
        {/* FileChangeTracker component to persist file changes */}
        <FileChangeTracker setFiles={setFiles} />
        <SandpackLayout>
          {activeTab == "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          ) : (
            <>
              <SandpackPreview
                style={{ height: "80vh" }}
                showNavigator={true}
              />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodeView;
