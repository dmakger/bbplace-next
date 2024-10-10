'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_ProfileMain.module.scss'
import { BlockCabinetModule, BlockCabinetProfile } from "@/features/Block/Cabinet"
import { IProfileMain } from "../../model/profileMain.model"
import { ECurrentLK } from "@/entities/User/model/user.model"
import { FileBlock } from "@/entities/File/ui/Block/FileBlock"
import { ButtonVariant } from "@/shared/ui/Button"
import { useState } from "react"
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize"
import { IFile } from "@/entities/File/model/file.model"
import { MAIN_PAGES } from "@/config/pages-url.config"
import { BBP_PRESENTATION_DOCUMENT, MUILTIPLE_ADDING_PRODUCTS_DOCUMENT } from "@/shared/data/documents.data"
import { FileFormat } from "@/entities/File/data/file.data"
import { MainPageCardSliderBlock } from "@/features/MainPageCardSliderBlock"
import { CardsProductSlider } from "@/features/MainPageCardSliderBlock/components/Product/CardsProductSlider"
import { SliderPagingVariant } from "@/shared/data/sliderT.data"
import { DetailedPageSupplier } from "@/shared/ui/DetailedPage"

export const ProfileMain = ({
    className,
    currentLK,
    fullName,
    email,
    phoneNumber,
    profileMessageArray,
    cabinetModuleArray,
    productList,
    userAsSupplier
}: IProfileMain) => {

    //STATE
    const [is1024, setIs1024] = useState<boolean>(false)

    //VARIABLES
    const files: IFile[] = [
        { name: 'О компании BBPlace.pptx', url: MAIN_PAGES.CURRENT_DOCUMENT(BBP_PRESENTATION_DOCUMENT).path, format: FileFormat.POWER_POINT },
        { name: 'Инструкция по множественному добавлению товаров.pdf', url: MAIN_PAGES.CURRENT_DOCUMENT(MUILTIPLE_ADDING_PRODUCTS_DOCUMENT).path, format: FileFormat.PDF },
        { name: 'О компании BBPlace.pptx', url: MAIN_PAGES.CURRENT_DOCUMENT(BBP_PRESENTATION_DOCUMENT).path, format: FileFormat.POWER_POINT },
        { name: 'Инструкция по множественному добавлению товаров.pdf', url: MAIN_PAGES.CURRENT_DOCUMENT(MUILTIPLE_ADDING_PRODUCTS_DOCUMENT).path, format: FileFormat.PDF },
        { name: 'О компании BBPlace.pptx', url: MAIN_PAGES.CURRENT_DOCUMENT(BBP_PRESENTATION_DOCUMENT).path, format: FileFormat.POWER_POINT },
        { name: 'Инструкция по множественному добавлению товаров.pdf', url: MAIN_PAGES.CURRENT_DOCUMENT(MUILTIPLE_ADDING_PRODUCTS_DOCUMENT).path, format: FileFormat.PDF },

    ]

    return (
        <>
            <div className={cls(cl.ProfileMain, className)}>
                <BlockCabinetProfile
                    currentLK={currentLK}
                    fullName={fullName}
                    email={email}
                    phoneNumber={phoneNumber}
                    textMessage={profileMessageArray}
                />
                <div className={cls(cl.cabinetModule, currentLK === ECurrentLK.BUYER ? cl.cabinetBuyer : '')}>
                    {cabinetModuleArray?.map(it => (
                        <BlockCabinetModule
                            key={it.title}
                            className={it.className}
                            href={it.href}
                            title={it.title}
                            titleQuantity={it.titleQuantity}
                            statisticsTextArray={it.statisticsTextArray}
                            headerButton={it.headerButton}
                            mainBlockText={it.mainBlockText}
                            disabled={it.disabled}
                        />
                    ))}
                </div>
                {currentLK === ECurrentLK.SUPPLIER ?
                    <div className={cl.supplierBlock}>
                        <DetailedPageSupplier id={userAsSupplier?.id} supplier={userAsSupplier} supplierRating={1} supplierReviews={1}/>
                        <FileBlock
                            className={cl.fileBlock}
                            title='Инструкции'
                            hasFilesQuantity={false}
                            files={files}
                            classNameTitle={cl.fileBlockTitle}
                            buttonVariant={ButtonVariant.CONTENT}
                            isRow={is1024}
                        />
                    </div> : <MainPageCardSliderBlock
                        classNameTitle={cl.sliderTitle}
                        title={'Рекомендуемые товары'}
                        buttonTitle={'Все товары'}
                        buttonHref={MAIN_PAGES.PRODUCTS.path}
                        children={<CardsProductSlider items={productList} gap={20} className={cl.list} classNameItem={cl.productItem} pagingVariant={SliderPagingVariant.Full} />}
                    />
                }

            </div>
            <HandleSize width={1024} set={setIs1024} />
        </>

    )
}
