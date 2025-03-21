"use client";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link } from "lucide-react";
import React, { useState } from "react";

const Hero = () => {
    const [userInput, setUserInput] = useState()
    return (
        <div className="flex flex-col items-center mt-36 xl:mt-42 gap-2">
        <h2 className="flex-bold text-4xl">{Lookup.HERO_HEADING}</h2>
        <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>
        <div className="p-5 border rounded-xl max-w-2xl w-full mt-3">
            <div className="flex gap-2">
            <textarea
                placeholder={Lookup.INPUT_PLACEHOLDER}
                className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
                onChange={(event) => setUserInput(event.target.value)}
            />
            { userInput && <ArrowRight className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer" /> }
            </div>
            <div>
            <Link className="h-5 w-5" />
            </div>
        </div>
        </div>
    );
};

export default Hero;
