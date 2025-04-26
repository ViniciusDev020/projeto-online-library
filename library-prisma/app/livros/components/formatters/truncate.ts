export default function truncateString(value: string, lenght: number){
    const slice = value.slice(0, lenght);

    if(value.length > lenght){
        return slice + "..."
    }
    return slice;
}