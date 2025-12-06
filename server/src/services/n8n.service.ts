import axios from 'axios';

interface UserRegisteredData {
	name: string;
	email: string;
	registeredAt: string;
}

export const notifyUserRegistered = async (
	data: UserRegisteredData
): Promise<void> => {
	const webhookUrl = process.env.N8N_WEBHOOK_URL;

	if (!webhookUrl) {
		console.warn('N8N_WEBHOOK_URL not configured, skipping notification');
		return;
	}

	try {
		await axios.post(webhookUrl, data, {
			timeout: 5000,
		});
		console.log('n8n notification sent successfully');
	} catch (error) {
		console.error('Failed to send n8n notification:', error);
	}
};
