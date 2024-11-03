import Link from "next/link";
import { Button } from "../ui/button";

const Signupbutton = () => {
    return (
        <Button asChild className="hover:bg-secondaryColor hover:text-black">
            <Link href="/signup">Signup</Link>
        </Button>
    );
};

export default Signupbutton;