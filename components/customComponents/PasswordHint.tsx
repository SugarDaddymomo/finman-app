// PasswordHint.js
import { CheckCircle, XCircle } from "lucide-react";

interface PasswordHintProps {
    valid: boolean;
    label: string;
}

const PasswordHint: React.FC<PasswordHintProps> = ({ valid, label }) => {
    return (
        <div className="flex items-center space-x-2">
            {valid ? (
                <CheckCircle className="text-green-500 h-4 w-4" />
            ) : (
                <XCircle className="text-red-500 h-4 w-4" />
            )}
            <span className={valid ? "text-green-600" : "text-red-600"}>{label}</span>
        </div>
    );
}

export default PasswordHint;