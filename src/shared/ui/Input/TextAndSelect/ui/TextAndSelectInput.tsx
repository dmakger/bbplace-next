'use client'

import { FC, useEffect, useRef, useState } from 'react'
import cl from './_TextAndSelectInput.module.scss'
import { IOption } from '@/shared/model/option.model'
import { cls } from '@/shared/lib/classes.lib'
import InputList from '../../List/InputList'
import WrapperClickOutside from '@/shared/ui/Wrapper/ClickOutside/WrapperClickOutside'
import Image from 'next/image'

interface ITextAndSelectInput {
    className?: string,
    listOptions?: IOption[],
    defaultOption: IOption,
    onClickOption?: Function,
    name?: string
}

export const TextAndSelectInput: FC<ITextAndSelectInput> = ({
    className,
    listOptions,
    defaultOption,
    onClickOption,
    name
}) => {

    //STATE
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [showOptions, setShowOptions] = useState(false)
    const [activeOption, setActiveOption] = useState<IOption | undefined>()

    //REF
    const inputSelectRef = useRef<HTMLDivElement>(null);

    // EFFECT
    useEffect(() => {
        setActiveOption(defaultOption)
    }, [defaultOption])

    //EFFECT
    useEffect(() => {
        setSearchQuery('')
    }, [showOptions])


    // ==={ CLICK }===
    const toggleShowOptions = () => {
        setShowOptions(!showOptions)
    }

    const handleOnItem = (it: IOption) => {
        setActiveOption(it)
        if (onClickOption) onClickOption(it)
        setShowOptions(false)
    }

    const filteredCountries = listOptions && listOptions.filter(option =>
        option.name.toLowerCase().includes(searchQuery.toLowerCase()));        


    return (
        <WrapperClickOutside _ref={inputSelectRef} isShow={showOptions} handle={toggleShowOptions} className={cls(cl.block, showOptions ? cl.show : '', className)}>
            <div
                onClick={() => setShowOptions(!showOptions)}
                className={cl.visible}>
                
                <div className={cl.button}>
                {showOptions ? <input
                        type="text"
                        className={cl.input}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onChange={(e) => {
                            setSearchQuery(e.target.value.toLowerCase().replaceAll('  ', ' ').trim());
                        }}
                        value={showOptions ? searchQuery : activeOption?.name}
                        autoFocus
                    />
                    :
                    <p className={cl.selectedOption}>
                        {activeOption?.name}
                    </p>}
                    <Image className={showOptions ? cl.arrowOpen : cl.arrow} src={'arrow.svg'} alt={'arrow'} width={14} height={12} />
                </div>
            </div>

            {filteredCountries && filteredCountries.length ?
                <InputList.Radio options={filteredCountries ? filteredCountries : []}
                    className={cls(cl.options, showOptions ? cl.show : '')}
                    defaultOption={activeOption}
                    name={name}
                    onClickOption={handleOnItem}
                /> : <p className={cl.noResult}>
                    К сожалению, такой страны нет (X_X)
                </p>}
        </WrapperClickOutside>
    )
}

