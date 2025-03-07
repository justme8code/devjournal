import ttlogo from  '@/public/logo.svg'
import Image from "next/image";
export const Logo = () => {
    return (

           <Image
               priority
               src={ttlogo}
               alt="TechTide Logo"
               className={"max-w-36"}
           />

    );
};