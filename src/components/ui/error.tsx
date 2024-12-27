import { Alert, AlertDescription, AlertTitle } from "./alert";

interface ErrorProps {
  title?: string;
  message: string;
}

export function Error({ title = "Error", message }: ErrorProps) {
  return (
    <Alert variant="destructive">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}