'use client'

import { MAIN_PAGES } from "@/config/pages-url.config";
import { UserAPI } from "@/entities/Auth/api/auth.api";
import { WrapperAuth } from "@/shared/ui/Wrapper/Auth/WrapperAuth";
import { useAppSelector } from "@/storage/hooks";
import { HeaderLK } from "@/widgets/HeaderLK";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
	children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    //RTK
    const {isAuth} = useAppSelector(state => state.user)

    //ROUTER
    const router = useRouter()

    //EFFECT
    useEffect(() => {
		if(!isAuth) 
			router.push(MAIN_PAGES.CHECK_EMAIL.path)
    }, [isAuth])

    return (
		<>
			<HeaderLK />
			<WrapperAuth>
            	{children}
        	</WrapperAuth>
      	</>
    )
  }