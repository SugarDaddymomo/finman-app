import Link from "next/link";
import { Button } from "../ui/button";

const Loginbutton = () => {
    return (
        <Button asChild className="hover:bg-secondaryColor hover:text-black">
            <Link href="/login">Login</Link>
        </Button>
    );
};

export default Loginbutton;