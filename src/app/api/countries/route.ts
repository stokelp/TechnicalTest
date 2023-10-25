import { NextResponse } from "next/server";
import { loadData } from "@/utils/utilsServer";

export async function GET() {
    const myData = await loadData();

    let countries: string[] = [];

    if (myData  === null) {
        return NextResponse.json({message: "Failed to load data", data: myData}, { status: 500 });
    }

    myData.forEach((row: any) => {
        if (row.origin) {
                if (!countries.includes(row.origin)) {
                    countries.push(row.origin);
                }
        }
    })




  return NextResponse.json({ message: "success", data: countries }, { status: 200 });
}


