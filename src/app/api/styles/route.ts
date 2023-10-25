import { NextResponse } from "next/server";
import { loadData } from "@/utils/utilsServer";

export async function GET() {
    const myData = await loadData();

    let styles: string[] = [];

    if (myData  === null) {
        return NextResponse.json({message: "Failed to load data", data: myData}, { status: 500 });
    }

    myData.forEach((row: any) => {
        if (row.style) {

            const tmp = row.style.split(',');

            tmp.forEach((style: string) => {
                const myStyle = style.trim();
                if (!styles.includes(myStyle)) {
                    styles.push(myStyle);
                }
            })
        }
    })



  return NextResponse.json({ message: "success", data: styles }, { status: 200 });
}


