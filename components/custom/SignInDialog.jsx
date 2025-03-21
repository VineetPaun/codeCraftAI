import React, { useContext } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { UserDetailContext } from "@/context/UserDetailContext.jsx";
import { useGoogleLogin } from "@react-oauth/google";

const SignInDialog = ({ openDialog, closeDialog }) => {
  const contextValue = useContext(UserDetailContext) ?? {
    userDetail: null,
    setUserDetail: () => {},
  };
  const { userDetail, setUserDetail } = contextValue;
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      console.log(userInfo);
      setUserDetail(userInfo?.data);
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <div className="flex flex-col justify-center items-center gap-3">
                <h2 className="font-bold text-center text-2xl text-white">
                  {Lookup.SIGNIN_HEADING}
                </h2>
                <p className="mt-2 text-center">{Lookup.SIGNIN_SUBHEADING}</p>
                <Button
                  onClick={googleLogin}
                  className="bg-blue-500 text-white hover:bg-blue-400 mt-3">
                  Sign in With Google
                </Button>
                <p>{Lookup?.SIGNIn_AGREEMENT_TEXT}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignInDialog;
