'use client';
import {useLoggedInUser} from "@/app/store/useLoggedInUser";
import {useEditingBlogPostStore} from "@/app/store/useEditingBlogPostStore";
import {LogOut} from "lucide-react";
import {handleLogout} from "@/app/login/actions";

export const LogoutButton = () => {
    const {loggedIn, setLoggedIn } = useLoggedInUser();
    const { destroyPost } = useEditingBlogPostStore();
    const logOut = async ()=>{
        await handleLogout();
        setLoggedIn(false);
        destroyPost();
    }
    return (
        <>

            { loggedIn &&
                <button className={"flex"} onClick={() => logOut()}>
                    <LogOut/>Logout
                </button>
            }
        </>
    );
};