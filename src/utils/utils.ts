
export function convertValueToOption(value: string) {
    return { label: value, value: value }
}

export function convertArrayToOption(
    array: any[] | null | undefined
): { label: string; value: string }[] {
    if (array == null || typeof array == typeof '')
        return [{ label: '', value: '' }]
        // Put "Mail d'information" at the top of the options list //
    const mailInformationIndex = array.findIndex(item => item === "Mail d'information");
    const newArray = [...array];
    if (mailInformationIndex !== -1) {
        newArray.splice(mailInformationIndex, 1);
        newArray.unshift("Mail d'information");
    }
    return newArray.map((r) => {
        return { label: r, value: r }
    })
}
interface Band {
    id: number;
    band_name: string;
    fans: string;
    formed: string;
    origin: string;
    split: string;
    style: string;
}

export type { Band }