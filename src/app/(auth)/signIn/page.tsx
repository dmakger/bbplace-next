import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { WrapperNoEmail } from "@/shared/ui/Wrapper/NoEmail";
import { SignInChildrenPage } from "@/widgets/Pages/LogIn/SignInChildrenPage";

export default function SignInPage() {
    return (
        <Wrapper1280>
            <WrapperNoEmail>
                <SignInChildrenPage />
            </WrapperNoEmail>
        </Wrapper1280>
    )
}