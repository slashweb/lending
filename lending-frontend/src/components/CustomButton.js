export default function CustomButton({ ...props }) {
    const { children, disabled = false, onClick } = props;

    const enabledClass = 'inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
    const disabledClass = 'inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300'
    return (
        <button
            type="button"
            className={ disabled ? disabledClass : enabledClass }
            onClick={onClick}
            disabled={disabled}
            > 
            {children}
        </button>
    )

}