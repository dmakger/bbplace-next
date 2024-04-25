import { cls } from "@/shared/lib/classes.lib"
import cl from './_CreatedAt.module.scss'
import { getFormattedDate } from "../lib/createdAt.lib"

interface ICreatedAt {
  createdAt: string,
  className?: string
}

export const CreatedAt = ({
  createdAt,
  className
}: ICreatedAt) => {
  return (
    <p className={(cls(cl.CreatedAt, className))}>
      {getFormattedDate(createdAt)}
    </p>
  )
}
