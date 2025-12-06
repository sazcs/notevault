import Modal from './Modal';

interface ConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
	confirmText?: string;
	loading?: boolean;
}

const ConfirmModal = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
	confirmText = 'Confirm',
	loading = false,
}: ConfirmModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} title={title}>
			<p className='text-neutral-400 mb-6'>{message}</p>
			<div className='flex gap-3'>
				<button
					onClick={onClose}
					disabled={loading}
					className='flex-1 rounded-md border border-neutral-800 px-4 py-2.5 text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50'
				>
					Cancel
				</button>
				<button
					onClick={onConfirm}
					disabled={loading}
					className='flex-1 rounded-md bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition-colors disabled:opacity-50'
				>
					{loading ? 'Deleting...' : confirmText}
				</button>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
