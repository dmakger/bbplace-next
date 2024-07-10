import { LKTenderTable } from "@/features/Table/ui/Tender/LK/ui/LKTenderTable";
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import { WrapperAuth } from '@/shared/ui/Wrapper/Auth/WrapperAuth';

export default function LKTenderPage() {
    return (
        <Wrapper1280>
            <WrapperAuth>
                <LKTenderTable />
            </WrapperAuth>
        </Wrapper1280>
    );
}