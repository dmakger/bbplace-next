"use client"

import { FC, useEffect, useRef } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_FileBlock.module.scss'
import { WrapperBlock } from "@/shared/ui/Wrapper/Block/WrapperBlock";
import { FileListItem } from "../List/FileListItem";
import { IFile } from "../../model/file.model";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor } from "@/shared/ui/Button/model/button.model";
import { FileBlockView } from "../../data/view.file.data";

interface FileBlockProps {
    files: IFile[]
    isRow?: boolean
    view?: FileBlockView
    className?: string,
}

export const FileBlock: FC<FileBlockProps> = ({ files, isRow = true, view=FileBlockView.Default, className }) => {
    // REF
    const contentRef = useRef<HTMLDivElement>(null);

    // EFFECT
    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        const onWheel = (e: WheelEvent) => {
            if (isRow) {
                if (e.deltaY !== 0) {
                    e.preventDefault();
                    content.scrollBy({
                        left: e.deltaY < 0 ? -30 : 30,
                    });
                }
            } else {
                if (e.deltaY !== 0) {
                    e.preventDefault();
                    content.scrollBy({
                        top: e.deltaY < 0 ? -30 : 30,
                    });
                }
            }
        };

        content.addEventListener('wheel', onWheel);

        return () => {
            content.removeEventListener('wheel', onWheel);
        };
    }, [isRow]);

    // HANDLE
    const downloadAllFiles = () => {
        files.forEach(file => {
            if (file.url && file.name) {
                const a = document.createElement('a');
                a.href = file.url;
                a.download = file.name;
                document.body.appendChild(a); // Append anchor to body
                a.click();
                document.body.removeChild(a); // Remove anchor from body
            }
        });
    };

    return (
        <WrapperBlock className={cls(cl.block, isRow ? cl.row : cl.column, cl[view], className)}>
            <div className={cl.top}>
                <div className={cl.topLeft}>
                    <h2 className={cl.title}>Файлы</h2>
                    <span className={cl.length}>{files.length}</span>
                </div>
                {isRow && (
                    <Button variant={ButtonVariant.TONAL} color={ButtonColor.Secondary} title="Скачать все" onClick={downloadAllFiles} className={cl.download} />
                )}
            </div>
            <div ref={contentRef} className={cl.content}>
                <FileListItem files={files} isRow={isRow} className={cl.files} />
            </div>
            {!isRow && (
                <div className={cl.bottom}>
                    <Button variant={ButtonVariant.TONAL} color={ButtonColor.Secondary} title="Скачать все" onClick={downloadAllFiles} className={cl.download} />
                </div>
            )}
        </WrapperBlock>
    )
}
