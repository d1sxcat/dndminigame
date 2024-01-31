export default function PlayArea({children}:{children:React.ReactNode}){
    return(
        <div className="flex h-full w-full">
            <div className="bg-red-800 h-full w-full"></div>
            <div className="h-full w-full"></div>
            <div className="bg-teal-500 h-full w-full"></div>
            {children}
        </div>
    )
}