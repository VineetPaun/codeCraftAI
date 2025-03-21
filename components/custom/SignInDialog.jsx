import React from "react";
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

const SignInDialog = ({openDialog, closeDialog}) => {
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <div className='flex flex-col justify-center items-center gap-3'>
                <h2 className="font-bold text-center text-2xl text-white">{Lookup.SIGNIN_HEADING}</h2>
                <p className="mt-2 text-center">{Lookup.SIGNIN_SUBHEADING}</p>
                <Button className="bg-blue-500 text-white hover:bg-blue-400 mt-3">Sign in With Google</Button>
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
