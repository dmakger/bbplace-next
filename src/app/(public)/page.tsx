import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor } from "@/shared/ui/Button/model/button.model";
import { Subblock } from "@/shared/ui/Subblock";
import { ESubblockVariants } from "@/shared/ui/Subblock/model/subblock.model";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";

export default function MainPage() {

    return (
        <div style={{display: 'flex', justifyContent:'center', height: '1000px' }}>

            <Subblock variant={ESubblockVariants.DEFAULT}
                title="Title"
                textChildren='Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rerum tenetur voluptates, animi ea porro unde fugit sint ad ipsa ratione, totam dicta, dolorem rem magnam esse obcaecati nisi harum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis minus corporis illo, nulla dignissimos ut quae iste impedit ea sunt nostrum veniam eos ab? Repellendus molestias, assumenda officiis blanditiis placeat odit ipsa non ipsam suscipit illum cupiditate officia architecto alias ut tempore ad pariatur consequatur accusantium consectetur sit excepturi explicabo hic! Aliquid fugiat ipsum natus dolorum, dicta est aut dolor dolorem. Praesentium quas harum, eum quae ea ipsum, facere omnis, modi neque perferendis vel laudantium nihil obcaecati? Nulla debitis quasi eum commodi, blanditiis quos adipisci molestiae dolores doloribus suscipit? Obcaecati voluptatem esse, facere illum temporibus rem. Nemo non et harum.'
                childrenButton={<Button variant={ButtonVariant.CONTENT} title="Подробнее" color={ButtonColor.Secondary} />
                
            }
            wModal/>


        </div>
    )
}
