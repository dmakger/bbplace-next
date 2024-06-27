import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor } from "@/shared/ui/Button/model/button.model";
import { Subblock } from "@/shared/ui/Subblock";
import { ESubblockVariants } from "@/shared/ui/Subblock/model/subblock.model";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";

export default function MainPage() {

    return (
        <div style={{ height: '1000px' }}>

            <Subblock variant={ESubblockVariants.DEFAULT}
                title="Title"
                textChildren='Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rerum tenetur voluptates, animi ea porro unde fugit sint ad ipsa ratione, totam dicta, dolorem rem magnam esse obcaecati nisi harum.'
                childrenButton={<Button variant={ButtonVariant.CONTENT} title="Подробнее" color={ButtonColor.Secondary} />
            }/>


        </div>
    )
}
