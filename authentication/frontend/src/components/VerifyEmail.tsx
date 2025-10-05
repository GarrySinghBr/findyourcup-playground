import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VerifyEmailProps {
  email: string;
  onResend?: () => void;
  className?: string;
}

export function VerifyEmail({ email, onResend, className }: VerifyEmailProps) {
  const [resendMessage, setResendMessage] = React.useState<string | null>(null);
  const [isResending, setIsResending] = React.useState(false);

  async function handleResend() {
    if (!onResend) return;
    setIsResending(true);
    setResendMessage(null);
    try {
      await onResend();
      setResendMessage("Verification email sent! Check your inbox.");
    } catch (error) {
      setResendMessage("Failed to resend. Please try again.");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-md", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Check your email</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            We've sent a verification link to:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm font-medium text-foreground bg-muted px-3 py-2 rounded-md break-all">
            {email}
          </p>
          <div className="space-y-2 text-xs text-muted-foreground">
            <p>Click the link in the email to verify your account.</p>
            <p>If you don't see the email, check your spam folder.</p>
          </div>
          {onResend && (
            <div className="pt-2 space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleResend}
                disabled={isResending}
              >
                {isResending ? "Sending..." : "Resend verification email"}
              </Button>
              {resendMessage && (
                <p
                  className={cn(
                    "text-xs text-center",
                    resendMessage.includes("sent")
                      ? "text-green-600"
                      : "text-destructive"
                  )}
                >
                  {resendMessage}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
