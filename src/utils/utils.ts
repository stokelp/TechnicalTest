
export function convertValueToOption(value: string) {
    return { label: value, value: value }
}

export function convertArrayToOption(
    array: string[]
): { label: string; value: string }[] {
    return array.map(item => {
        return { label: item, value: item }
    });
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