"use client";

import { useSearchParams } from "next/navigation";
import SparkleBot from "@/app/(guest)/_components/SparkleBot";
import "../../_styles/coach-list.css";
import "../../_styles/spark.css";
export default function AIMatchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");

    return (
        <main>
            <SparkleBot initialQuery={query} />
        </main>
    );
}
