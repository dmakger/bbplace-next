import { cls } from "@/shared/lib/classes.lib";
import cl from './_LKPTPage.module.scss';
import { IOptionTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { IOption } from "@/shared/model/option.model";

interface ILKPTPage {
    className?: string;
    optionsTab: IOptionTab[];
    selectedOption: IOption;
}

export const LKPTPage = ({
    className,
    optionsTab,
    selectedOption,
}: ILKPTPage) => {

    return (
        <div className={cls(cl.LKPTPage, className)}>
            {optionsTab.map((option, index) => (
                    <div
                        key={index}
                        className={option.optionValue === selectedOption.value ? cl.visible : cl.hidden}
                    >
                        {option.optionTab}
                    </div>
                )
            )}
        </div>
    );
};
