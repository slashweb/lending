export default function IconButton(props) {
    const {onClick, children} = props;
    return (
        <>
            <button onClick={onClick} class="rounded-lg shadow-lg w-10 h-10 p-2 px-4 bg-indigo-400 text-white">{children}</button>
        </>
    );
}