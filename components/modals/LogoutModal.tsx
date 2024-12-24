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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{`Action Required! You are about to logout!`}</DialogTitle>
          <DialogDescription>
            {`Are you sure you want to logout? You will be redirected to the login page.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"ghost"} onClick={() => handleClose()} type="submit">
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
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
