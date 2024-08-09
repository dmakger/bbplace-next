'use client';

import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { cls } from "@/shared/lib/classes.lib";
import cl from "./_WrapperSubblockForm.module.scss";
import { SubblockFormVariant } from "../data/subblockForm.data";
import { HeaderSubblockForm } from "../components/Header/HeaderSubblockForm";

interface WrapperSubblockFormProps {
  title: string;
  variant?: SubblockFormVariant;
  isOpen?: boolean;
  children?: ReactNode;
  className?: string;
}

export const WrapperSubblockForm: FC<WrapperSubblockFormProps> = ({
  title,
  variant = SubblockFormVariant.Static,
  isOpen: isOurOpen = true,
  children,
  className,
}) => {
  // STATE
  const [isOpen, setIsOpen] = useState(isOurOpen);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);

  // EFFECT
  useEffect(() => {
    setIsOpen(isOurOpen);
    if (isOurOpen) {
      setHeight(contentRef.current?.scrollHeight); // Присваиваем scrollHeight вместо "auto"
    } else {
      setHeight(0);
    }
  }, [isOurOpen]);

  useEffect(() => {
    const content = contentRef.current;

    if (content) {
      const resizeObserver = new ResizeObserver(() => {
        if (isOpen) {
          setHeight(content.scrollHeight);
        }
      });

      resizeObserver.observe(content);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const content = contentRef.current;

    if (content) {
      if (isOpen) {
        setHeight(content.scrollHeight);
      } else {
        setHeight(0);
      }
    }
  }, [isOpen, children]);

  // HANDLE
  const handleOnClickHeader = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={cls(cl.block, className)}>
      <HeaderSubblockForm
        title={title}
        variant={variant}
        isOpen={isOpen}
        onClickHeader={handleOnClickHeader}
      />
      <div
        ref={contentRef}
        className={cls(cl.content, isOpen ? cl.visible : "")}
        style={{ height: isOpen ? height : 0, transition: 'height 300ms ease' }}
      >
        {children}
      </div>
    </div>
  );
};
