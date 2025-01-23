import {FormData} from '@/pages/contact';

export const sendContactForm = async (formData: FormData) => {
    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
            },
            body: JSON.stringify(formData),
        });
        if (!res.ok) {
            throw new Error('Fehler beim Senden des Formulars.');
        }
    } catch (error) {
        throw new Error((error as Error).message || 'Unbekannter Fehler.');
    }
}