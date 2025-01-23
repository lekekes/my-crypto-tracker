export const validateContactForm = (formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}) => {
  const errors = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  };

  const nameRegex = /^[a-zA-ZäöüßÄÖÜ\s-]+$/;

  if (!formData.firstName.trim()) {
    errors.firstName = 'Bitte geben Sie Ihren Vornamen ein.';
  } else if (!nameRegex.test(formData.firstName)) {
    errors.firstName = 'Der Vorname darf nur Buchstaben enthalten.';
  } else if (formData.firstName.length < 2) {
    errors.firstName = 'Der Vorname muss mindestens 2 Zeichen lang sein.';
  }

  if (!formData.lastName.trim()) {
    errors.lastName = 'Bitte geben Sie Ihren Nachnamen ein.';
  } else if (!nameRegex.test(formData.lastName)) {
    errors.lastName = 'Der Nachname darf nur Buchstaben enthalten.';
  } else if (formData.lastName.length < 2) {
    errors.lastName = 'Der Nachname muss mindestens 2 Zeichen lang sein.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim()) {
    errors.email = 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
  }

  const phoneRegex = /^[0-9]{6,15}$/;
  if (!formData.phone.trim()) {
    errors.phone = 'Bitte geben Sie Ihre Telefonnummer ein.';
  } else if (!phoneRegex.test(formData.phone)) {
    errors.phone =
      'Die Telefonnummer muss zwischen 6 und 15 Ziffern lang sein.';
  }

  if (!formData.message.trim()) {
    errors.message = 'Bitte geben Sie eine Nachricht ein.';
  } else if (formData.message.length < 10) {
    errors.message = 'Die Nachricht muss mindestens 10 Zeichen lang sein.';
  }

  return errors;
};
