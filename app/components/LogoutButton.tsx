'use client';
import {useLoggedInUser} from "@/app/store/useLoggedInUser";
import {useEditingBlogPostStore} from "@/app/store/useEditingBlogPostStore";
import {LogOut} from "lucide-react";
import {handleLogout} from "@/app/login/actions";

export const LogoutButton = () => {
    const {loggedIn, setLoggedIn } = useLoggedInUser();
    const { destroyPost } = useEditingBlogPostStore();
    const logOut = async ()=>{
        setLoggedIn(false);
        destroyPost();
        await handleLogout();
    }
    return (
        <>

            { loggedIn &&
                <button className={"flex gap-2"} onClick={() => logOut()}>
                    <LogOut/> <h3>Logout</h3>
                </button>
            }
        </>
    );
};