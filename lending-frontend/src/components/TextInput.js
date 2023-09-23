import {ExclamationCircleIcon} from '@heroicons/react/20/solid'

export default function TextInput({label, ...props}) {
    const { name, type = 'text', value = '', error, onChange } = props;

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
                        className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset placeholder:text-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                        defaultValue="adamwathan"
                        aria-invalid="true"
                        aria-describedby="email-error"
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
}
