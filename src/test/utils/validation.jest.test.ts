import { validateContactForm } from '../../utils/validation';

describe('validateContactForm', () => {
  test('should return no errors for valid input', () => {
    const validFormData = {
      firstName: 'Max',
      lastName: 'Mustermann',
      email: 'max.mustermann@example.com',
      phone: '123456789',
      message: 'Dies ist eine gültige Nachricht.',
    };

    const errors = validateContactForm(validFormData);
    expect(errors).toEqual({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    });
  });

  test('should validate firstName', () => {
    const formData = {
      firstName: '',
      lastName: 'Mustermann',
      email: 'max.mustermann@example.com',
      phone: '123456789',
      message: 'Nachricht.',
    };

    const errors = validateContactForm(formData);
    expect(errors.firstName).toBe('Bitte geben Sie Ihren Vornamen ein.');
  });

  test('should invalidate firstName with numbers', () => {
    const formData = {
      firstName: 'Max123',
      lastName: 'Mustermann',
      email: 'max.mustermann@example.com',
      phone: '123456789',
      message: 'Nachricht.',
    };

    const errors = validateContactForm(formData);
    expect(errors.firstName).toBe('Der Vorname darf nur Buchstaben enthalten.');
  });

  test('should validate lastName', () => {
    const formData = {
      firstName: 'Max',
      lastName: '',
      email: 'max.mustermann@example.com',
      phone: '123456789',
      message: 'Nachricht.',
    };

    const errors = validateContactForm(formData);
    expect(errors.lastName).toBe('Bitte geben Sie Ihren Nachnamen ein.');
  });

  test('should invalidate lastName with numbers', () => {
    const formData = {
      firstName: 'Max',
      lastName: 'Mustermann123',
      email: 'max.mustermann@example.com',
      phone: '123456789',
      message: 'Nachricht.',
    };

    const errors = validateContactForm(formData);
    expect(errors.lastName).toBe('Der Nachname darf nur Buchstaben enthalten.');
  });

  test('should validate email', () => {
    const formData = {
      firstName: 'Max',
      lastName: 'Mustermann',
      email: '',
      phone: '123456789',
      message: 'Nachricht.',
    };

    const errors = validateContactForm(formData);
    expect(errors.email).toBe('Bitte geben Sie Ihre E-Mail-Adresse ein.');
  });

  test('should invalidate malformed email', () => {
    const formData = {
      firstName: 'Max',
      lastName: 'Mustermann',
      email: 'invalid-email',
      phone: '123456789',
      message: 'Nachricht.',
    };

    const errors = validateContactForm(formData);
    expect(errors.email).toBe(
      'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    );
  });

  test('should validate phone', () => {
    const formData = {
      firstName: 'Max',
      lastName: 'Mustermann',
      email: 'max.mustermann@example.com',
      phone: '',
      message: 'Nachricht.',
    };

    const errors = validateContactForm(formData);
    expect(errors.phone).toBe('Bitte geben Sie Ihre Telefonnummer ein.');
  });

  test('should invalidate short phone number', () => {
    const formData = {
      firstName: 'Max',
      lastName: 'Mustermann',
      email: 'max.mustermann@example.com',
      phone: '123',
      message: 'Nachricht.',
    };

    const errors = validateContactForm(formData);
    expect(errors.phone).toBe(
      'Die Telefonnummer muss zwischen 6 und 15 Ziffern lang sein.',
    );
  });

  test('should validate message', () => {
    const formData = {
      firstName: 'Max',
      lastName: 'Mustermann',
      email: 'max.mustermann@example.com',
      phone: '123456789',
      message: '',
    };

    const errors = validateContactForm(formData);
    expect(errors.message).toBe('Bitte geben Sie eine Nachricht ein.');
  });

  test('should invalidate short message', () => {
    const formData = {
      firstName: 'Max',
      lastName: 'Mustermann',
      email: 'max.mustermann@example.com',
      phone: '123456789',
      message: 'Kurz.',
    };

    const errors = validateContactForm(formData);
    expect(errors.message).toBe(
      'Die Nachricht muss mindestens 10 Zeichen lang sein.',
    );
  });

  test('should handle multiple errors', () => {
    const formData = {
      firstName: '',
      lastName: '',
      email: 'invalid-email',
      phone: '123',
      message: '',
    };

    const errors = validateContactForm(formData);

    expect(errors.firstName).toBe('Bitte geben Sie Ihren Vornamen ein.');
    expect(errors.lastName).toBe('Bitte geben Sie Ihren Nachnamen ein.');
    expect(errors.email).toBe(
      'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    );
    expect(errors.phone).toBe(
      'Die Telefonnummer muss zwischen 6 und 15 Ziffern lang sein.',
    );
    expect(errors.message).toBe('Bitte geben Sie eine Nachricht ein.');
  });
});
