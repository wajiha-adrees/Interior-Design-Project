import Image from "next/image";
import logo from "../public/logo.svg";
import Navigation from "./Navigation";

export default function Header() {
    return (
        <div className="sticky inset-x-0 top-0 z-10 bg-opacity-60 bg-zinc-100 backdrop-blur-lg">
            <div className="container flex items-center justify-between py-6">
                <Image src={logo} alt="ELEGANCE Interior Design" className="w-48 h-12" priority />
                <Navigation />
            </div>
        </div>
    );
}