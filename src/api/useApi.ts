import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type QueryFunction<T> = () => Promise<T>;
export default function useAPI<T>(queryKey: string[], queryFn: QueryFunction<T>): { data: T | undefined, setData: React.Dispatch<React.SetStateAction<T | undefined>> } {
    const { data } = useQuery<T>({
        queryKey: queryKey,
        queryFn: queryFn
    });

    const [apiData, setApiData] = useState<T | undefined>(data);

    useEffect(() => {
        setApiData(data);
    }, [data]);

    return { data: apiData, setData: setApiData };
}
