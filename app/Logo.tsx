import ttlogo from  '@/public/logo.svg'
import Image from "next/image";
import Link from "next/link";
export const Logo = () => {
    return (

            <Link href="/" className={" h-fit w-fit p-2"}>
                <Image
                    priority
                    src={ttlogo}
                    alt="TechTide Logo"
                    className={"max-w-32"}
                />
            </Link>

    );
};