
export interface TagProps {
    value: string;
    inverted?: boolean;
}

export default function Tag(props: TagProps) {

    const colours = (props.inverted) ? 'bg-orange-400 border-white text-white' : 'bg-white border-orange-400 text-orange-400'
    
    return <div className={`inline-block  text-xs border rounded-sm px-1 align-top ${colours}`}>{props.value}</div>;
}