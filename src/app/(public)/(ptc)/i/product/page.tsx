import { LKProductTable } from "@/features/Table/ui/Product/LK/ui/LKProductTable";
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import { WrapperAuth } from '@/shared/ui/Wrapper/Auth/WrapperAuth';

export default function LKProductPage() {
    return (
        <Wrapper1280>
            <WrapperAuth>
                <LKProductTable />
            </WrapperAuth>
        </Wrapper1280>
    )
}