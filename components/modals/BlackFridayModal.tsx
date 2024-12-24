import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BlackFridayModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const BlackFridayModal: React.FC<BlackFridayModalProps> = ({ isOpen, onClose }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[600px]">
                <DialogHeader>
                    <DialogTitle style={{ fontSize: "1.5rem" }}>Black Friday Sales!</DialogTitle>
                    <DialogDescription style={{ fontSize: "1.2rem" }}>
                        It's Black Friday! Enjoy $1/GB Residential, 50% off on IPv6, and 10% off on IPv4 proxies!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col gap-2">
                    <Button className="w-[95%] text-center mx-2" variant="brand" onClick={() => window.open("https://www.eclipseproxy.com/dashboard/residential-proxies", "_blank")}>
                        Purchase Residential ($1/GB)
                    </Button>
                    <Button className="w-[95%] text-center mx-2" variant="brand" onClick={() => window.open("https://www.eclipseproxy.com/dashboard/ipv6-proxies", "_blank")}>
                        Purchase IPv6 (50% OFF)
                    </Button>
                    <Button className="w-[95%] text-center mx-2" variant="brand" onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default BlackFridayModal;