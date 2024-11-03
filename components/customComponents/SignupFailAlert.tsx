import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SignupFailAlertProps {
    message?: string;
}

const SignupFailAlert: React.FC<SignupFailAlertProps> = ({ message }) => {
    return (
        <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
            {message || "Failed to signup! Try again later."}
            </AlertDescription>
        </Alert>
    );
};

export default SignupFailAlert;