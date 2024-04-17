import { getTextByNumber } from "@/shared/lib/text.lib"

export const getReviewTextByNumber = (n: number) => {
    return getTextByNumber(n, "отзывов", "отзыв", "отзыва")
}
