import React, { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import countryCodes from '@/data/countryCodes.json';
import { validateContactForm } from '@/utils/validation';
import Head from 'next/head';

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+49',
    message: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const countryOptions = countryCodes.map((country) => ({
    label: `${country.name} (${country.dial_code})`,
    value: country.dial_code,
  }));

  const handleSubmit = async () => {
    const newErrors = validateContactForm(formData);
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Wichtig: JSON-Content-Type setzen
        },
        body: JSON.stringify({
          to: formData.email,
          subject: `Kontaktformular: Nachricht von ${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(
          'Vielen Dank für Ihre Nachricht. Wir werden uns bald bei Ihnen melden.',
        );
        setIsSubmitted(true);
      } else {
        setResponseMessage(`Fehler beim Senden der Nachricht: ${data.error}`);
      }
    } catch (error) {
      setResponseMessage(`Fehler: ${(error as Error).message}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Kontaktformular</title>
      </Head>
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
        Kontaktformular
      </h1>

      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
        Haben Sie Fragen, Anregungen oder benötigen Sie Unterstützung? Füllen
        Sie einfach das Formular unten aus, und wir werden uns so schnell wie
        möglich bei Ihnen melden.
      </p>

      <div className="mt-8 space-y-4">
        <Input
          value={formData.firstName}
          onChange={(value) => setFormData({ ...formData, firstName: value })}
          placeholder="Vorname"
        />
        {errors.firstName && (
          <p className="text-sm text-red-500">{errors.firstName}</p>
        )}

        <Input
          value={formData.lastName}
          onChange={(value) => setFormData({ ...formData, lastName: value })}
          placeholder="Nachname"
        />
        {errors.lastName && (
          <p className="text-sm text-red-500">{errors.lastName}</p>
        )}

        <Input
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value })}
          placeholder="E-Mail-Adresse"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

        <div className="flex items-center gap-4">
          <Select
            options={countryOptions}
            value={formData.countryCode}
            onChange={(value) =>
              setFormData({ ...formData, countryCode: value })
            }
            placeholder="Vorwahl auswählen"
            className="w-80"
          />
          <Input
            value={formData.phone}
            onChange={(value) => setFormData({ ...formData, phone: value })}
            placeholder="Telefonnummer"
          />
        </div>
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}

        <textarea
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="Nachricht"
          rows={6}
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder-gray-500 shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-400"
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message}</p>
        )}

        <Button className="mt-4" variant="primary" onClick={handleSubmit}>
          Abschicken
        </Button>

        <Modal
          isOpen={isSubmitted}
          onConfirm={() => setIsSubmitted(false)}
          title="Nachricht gesendet"
          description={responseMessage}
          confirmText="Schließen"
          contentClassName="bg-green-100 bg-opacity-90"
        />
      </div>
    </div>
  );
}
