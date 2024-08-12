"use client"

import { FC, ReactNode, useEffect, useRef, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperSubblockForm.module.scss'
import { SubblockFormVariant } from "../data/subblockForm.data";
import { HeaderSubblockForm } from "../components/Header/HeaderSubblockForm";

interface WrapperSubblockFormProps {
    title: string
    variant?: SubblockFormVariant
    isOpen?: boolean
    children?: ReactNode
    className?: string,
}

export const WrapperSubblockForm: FC<WrapperSubblockFormProps> = ({
    title,
    variant = SubblockFormVariant.Static,
    isOpen: isOurOpen = true,
    children,
    className
  }) => {
    // STATE
    const [isOpen, setIsOpen] = useState(isOurOpen);
    const contentRef = useRef<HTMLDivElement>(null);
  
    // HANDLE
    const handleOnClickHeader = () => {
      setIsOpen(prevState => !prevState);
    };
  
    useEffect(() => {
      const content = contentRef.current;
  
      if (content) {
        if (isOpen) {
          content.style.height = `${content.scrollHeight}px`;
        } else {
          content.style.height = '0';
        }
      }
    }, [isOpen]);
  
    return (
      <div className={cls(cl.block, className)}>
        <HeaderSubblockForm title={title} variant={variant} isOpen={isOpen} onClickHeader={handleOnClickHeader} />
        <div
          ref={contentRef}
          className={cls(cl.content, isOpen ? cl.visible : '')}
        >
          {children}
        </div>
      </div>
    );
  };