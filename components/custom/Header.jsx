import React, { useContext } from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <div className="p-4 flex justify-between items-center">
      <h2>CodeCraftAI</h2>
      {!userDetail?.name && (
        <div className="flex gap-5">
          <Button variant="ghost">Sign In</Button>
          <Button
            className="text-white"
            style={{ backgroundColor: Colors.BLUE }}>
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
