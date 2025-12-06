import { type InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

const FormInput = ({ label, ...props }: FormInputProps) => {
	return (
		<div>
			<label className='block text-sm font-medium mb-2'>{label}</label>
			<input
				{...props}
				className='w-full rounded-md border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700 disabled:opacity-50'
			/>
		</div>
	);
};

export default FormInput;
