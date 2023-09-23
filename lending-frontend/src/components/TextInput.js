import {ExclamationCircleIcon} from '@heroicons/react/20/solid'

export default function TextInput({label, ...props}) {
    const { name, type = 'text', defaultValue, error } = props;

    return (
        <div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                        type={type}
                        name={name}
                        id={name}
                        className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-red-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        defaultValue="adamwathan"
                        aria-invalid="true"
                        aria-describedby="email-error"
                        value={defaultValue}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon className="h-5 w-5 text-gray-500" aria-hidden="true"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
