import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AccessModal = ({ open, onOpenChange }: AccessModalProps) => {
  const [email, setEmail] = useState("");
  const [accessKey, setAccessKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle access submission
    console.log("Access requested:", { email, accessKey });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-glow-cyan">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gradient-cyan">Access the Data Stream</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter your credentials to unlock the quantum edge of data intelligence.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass border-secondary/20 focus:border-secondary"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accessKey" className="text-foreground">Access Key</Label>
            <Input
              id="accessKey"
              type="password"
              placeholder="Enter your access key"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              className="glass border-secondary/20 focus:border-secondary"
              required
            />
          </div>

          <Button type="submit" variant="hero" className="w-full">
            Initialize Connection
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
