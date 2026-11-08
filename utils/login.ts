import { logout } from "@/data/credential";
import type { UserCredential } from "@/data/credential";
import { useRouter } from "next/navigation"
type Router = ReturnType<typeof useRouter>

export const checkLogin = (router: Router, returnPath: string) => {
    localStorage.setItem('returnPath', returnPath)
    const credentialString = localStorage.getItem('credential')
    if (credentialString !== null) {
        const { token , email , name , role }: UserCredential = JSON.parse(credentialString)
        if (token === undefined || email === undefined || name === undefined || role === undefined) {
            router.replace('/login')
            router.refresh()
        }
        else {
            router.replace(returnPath)
            router.refresh()
        }
    } else {
            router.replace('/login')
            router.refresh()
    }

}

// export const doLogout = (router: Router , returnPath: string) => {
//     const credentialString = localStorage.getItem('credential')
//     if (credentialString !== null) {
//         const {token: Credential = JSON.parse(credentialString)}

        
//         logout(token).then(() => {}).catch(() => {}).finally(() => {
//             localStorage.removeItem('credential')
//             router.replace(returnPath)
//             router.refresh()
//         })

//     } else {
//         router.replace(returnPath)
//         router.refresh()
//     }
// }


export const doLogout = (
    router: Router,
    returnPath: string
) => {
    const credentialString = localStorage.getItem("credential");

    if (credentialString !== null) {
        const { token } = JSON.parse(credentialString);

        logout(token)
            .catch(() => {})
            .finally(() => {
                localStorage.removeItem("credential");
                router.replace(returnPath);
                router.refresh();
            });
    } else {
        router.replace(returnPath);
        router.refresh();
    }
};
