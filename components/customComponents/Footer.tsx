import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";

const Footer = () => {
    return (
        // <footer className="bg-primaryColor text-gray-800 p-4 fixed bottom-0 left-0 w-full">
        //     <div className="container mx-auto text-center">
        //         <p>&copy; 2024 FinMan. All rights reserved.</p>
        //         <div>
        //             <a href="/privacy" className="mx-2">Privacy Policy</a>
        //             <a href="/terms" className="mx-2">Terms of Service</a>
        //         </div>
        //     </div>
        // </footer>
        <footer className="bg-primaryColor text-gray-800 p-4">
            <div className="container mx-auto text-center md:text-left">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0">
                    {/* Contact Information */}
                    <div className="text-center md:text-left space-y-2">
                        <h2 className="text-lg font-semibold">Contact Us</h2>
                        <p className="text-sm">We’d love to hear from you! Reach out to us directly:</p>
                        <p className="text-sm"><strong>Email:</strong> support@finman.app</p>
                        <p className="text-sm"><strong>Phone:</strong> +91 8527077014</p>
                        <p className="text-sm"><strong>Location:</strong> Connaught Place, New Delhi, India</p>
                    </div>

                    {/* Social Media and Footer Links */}
                    <div className="text-center md:text-right space-y-2">
                        {/* Social Media Icons */}
                        <div className="flex justify-center md:justify-end space-x-4 mb-2">
                            <a href="https://instagram.com/finman@app" target="_blank" rel="noopener noreferrer">
                                <FaInstagram aria-setsize={5} />
                            </a>
                            <a href="https://x.com/finmanapp" target="_blank" rel="noopener noreferrer">
                                <RiTwitterXFill aria-setsize={5} />
                            </a>
                            <a href="https://wa.me/+918527077014" target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp aria-setsize={5} />
                            </a>
                        </div>

                        {/* Footer Links */}
                        <p>&copy; 2024 FinMan. All rights reserved.</p>
                        <div className="space-x-4">
                            <a href="/privacy" className="text-sm mx-2">Privacy Policy</a>
                            <a href="/terms" className="text-sm mx-2">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;