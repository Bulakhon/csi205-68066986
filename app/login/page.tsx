"use client";

import { useRouter } from "next/navigation";
import { OverlayWrapper } from "@/components/tailgrids/core/overlay";
import { Backdrop } from "@/components/tailgrids/core/overlay";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose
} from "@/components/tailgrids/core/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
  InputGroupTextarea
} from "@/components/tailgrids/core/input-group";
import { EyeDisabled, Keyboard, Search1 } from "@tailgrids/icons";
import { login } from "@/data/credential";
import { error } from "console";


export default function Page () {
    const router = useRouter()

    const handleLogin = () => {
        const userDom = document.getElementById('user') as HTMLInputElement
        const passDom = document.getElementById('pass') as HTMLInputElement
        const user = userDom.value.trim()
        const pass = passDom.value.trim()

        if (user === '') {
            userDom.focus()
            alert('Error: user is required')
            return
        }
        if (pass === '') {
            passDom.focus()
            alert('Error: password is required')
            return
        }

        login(`${user}@company.com` , pass)
        .then((credential) => {
            localStorage.setItem('credential' , JSON.stringify(credential))
            const returnPath = localStorage.getItem('returnPath') || '/'
            localStorage.removeItem('returnPath')
            router.replace(returnPath)
            router.refresh()
        })
        .catch(error => {
            userDom.value = ''
            passDom.value = ''
            userDom.focus()
            alert(`Error: ${error}`)
        })
    }

    return (
        <Backdrop isOpen={true}>
            <Dialog showCloseButton={false} className="w-md">
                <DialogHeader>
                    <DialogTitle className=" text-center">Who Are You?</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <InputGroup>
                    <InputGroupAddon align='inline-start'><Keyboard /></InputGroupAddon>
                    <InputGroupInput id="user" placeholder="user | admin | manager"/>
                    <InputGroupAddon align='inline-end'>@company.com</InputGroupAddon>
                    </InputGroup>
                    <InputGroup className=" mt-2">
                    <InputGroupAddon align='inline-start'><EyeDisabled /></InputGroupAddon>
                    <InputGroupInput id="pass" type="password" placeholder="pass"/>
                    <InputGroupAddon align='inline-end'></InputGroupAddon>
                    </InputGroup>
                </DialogBody>
                <DialogFooter>
                <div className=" flex justify-end">
                    <DialogClose appearance='outline' onClick={() => handleLogin()}>Login</DialogClose>
                </div>
                </DialogFooter>
                </Dialog> 
        </Backdrop>
    )
}