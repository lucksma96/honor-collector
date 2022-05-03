export function uuidv4(): string {
    return `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(
        /[018]/g,
        (c: string): string => {
            const num = Number(c)
            return (
                num ^
                (crypto.getRandomValues(new Uint8Array(1))[0] &
                    (15 >> (num / 4)))
            ).toString(16)
        }
    )
}

function uuidv6(): string {
    throw new Error("Not implemented")
}

export default function uuid(version: 4 | 6): string {
    if (version == 4) return uuidv4()
    else if (version == 6) return uuidv6()
    else return uuidv4()
}
