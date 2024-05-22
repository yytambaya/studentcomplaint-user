export const Popup = ({title, text, action}) => {
    return(
        <div className="flex flex-col space-y-4 h-36 w-28 px-4 py-2 text-xl bg-green-500 text-white">
            <h1 className="text-2xl font-mono">{title}</h1>
            <p>{text}</p>
            <div className="flex justify-between">
                <button>Delete</button>
                <button>Cancel</button>
            </div>
        </div>
    )
}

