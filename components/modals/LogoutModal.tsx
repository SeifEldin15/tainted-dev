import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRecoilState } from "recoil";
import { modalState, modalStateType } from "@/global/modal-states";
import { signOut } from "next-auth/react";

export function LogoutModal() {
  const [currentModal, setcurrentModal] = useRecoilState(modalState);

  const handleClose = () => {
    setcurrentModal({ modalName: null } as modalStateType);
  };

  return (
    <Dialog open={currentModal.modalName === "logoutModal"}>
      <DialogContent className="sm:max-w-[425px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white">
            Action Required! <span className="text-brand">You are about to logout!</span>
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Are you sure you want to logout? You will be redirected to the login page.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            variant={"ghost"} 
            onClick={() => handleClose()} 
            type="submit"
            className="text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 hover:bg-transparent dark:border-transparent focus:outline-none"
          >
            Cancel
          </Button>
          <Button
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: "/",
              })
            }
            variant={"attention"}
            type="submit"
            className="bg-brand hover:bg-brand/90 text-black dark:text-black"
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
