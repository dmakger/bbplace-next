import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { WrapperNoEmail } from "@/shared/ui/Wrapper/NoEmail";
import { ForgotPasswordChildrenPage } from "@/widgets/Pages/LogIn/ForgotPasswordChildrenPage";

export default function ForgotPasswordPage() {
    return (
        <Wrapper1280>
            <WrapperNoEmail>
                <ForgotPasswordChildrenPage />
            </WrapperNoEmail>
        </Wrapper1280>
    )
}