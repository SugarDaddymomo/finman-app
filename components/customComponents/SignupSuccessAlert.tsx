import { LogIn } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SignupSuccessAlert = () => {
    return (
        <Alert className="mb-4">
            <LogIn className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
                Signup successful! Redirecting to login.
            </AlertDescription>
        </Alert>
    );
};

export default SignupSuccessAlert;