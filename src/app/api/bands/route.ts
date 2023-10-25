import { NextRequest, NextResponse } from "next/server";
import { loadData } from "@/utils/utilsServer";
import { count } from "console";

export async function GET(req: NextRequest, res: NextResponse) {
    const myData = await loadData();
    let dataToReturn = myData;

    if (myData  === null) {
        return NextResponse.json({message: "Failed to load data", data: myData}, { status: 500 });
    }

    // if(req.nextUrl.searchParams.get('styles')) {
    //     console.log('searching for styles');
    //     const styles = req.nextUrl.searchParams.get('styles');
    //     const filteredData = myData.filter((row: any) => {
    //         if (row.style) {
    //             const tmp = row.style.split(',');
    //             console.log(`${styles}: found: ${tmp.includes(styles)}`);
    //             return tmp.includes(styles);
    //         }
    //         return false;
    //     })
    //     dataToReturn = filteredData;
    // }

    // if(req.nextUrl.searchParams.get('countries')) {
    //     console.log('searching for countries');
    //     const countries = req.nextUrl.searchParams.get('countries');
    //     const filteredData = myData.filter((row: any) => {
    //         if (row.origin) {
    //             let tmp = countries!.split(',');
    //             if (countries!.split(',').length > 1) {
    //                 const found  = tmp.includes(row.origin)
    //             console.log(`${countries}: found: ${found}`);
    //             return found;
    //             }
    //         }
    //         return false;
    //     })
    //     dataToReturn = filteredData;
    // }

    if(req.nextUrl.searchParams.get('s')) {
        const search = req.nextUrl.searchParams.get('s');
        const filteredData = myData.filter((row: any) => {
            if (row.band_name) {
                return row.band_name.toLowerCase().includes(search?.toLowerCase());
            }
            if (row.origin) {
                return row.origin.toLowerCase().includes(search?.toLowerCase());
            }
            if (row.fans) {
                return row.fans.toLowerCase().includes(search?.toLowerCase());
            }
            if (row.formed) {
                return row.formed.toLowerCase().includes(search?.toLowerCase());
            }
            if (row.origin) {
                return row.origin.toLowerCase().includes(search?.toLowerCase());
            }
            if (row.split) {
                return row.split.toLowerCase().includes(search?.toLowerCase());
            }
            if (row.style) {
                return row.style.toLowerCase().includes(search?.toLowerCase());
            }
            return false;
        })
        dataToReturn = filteredData;
    }



  return NextResponse.json({ message: "Hello World", data: dataToReturn }, { status: 200 });
}


