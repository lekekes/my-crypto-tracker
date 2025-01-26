import { generateEmailHTML } from '../../utils/emailTemplate';

const normalizeHTML = (html: string): string =>
  html.replace(/\s+/g, ' ').trim();

describe('generateEmailHTML', () => {
  it('should generate correct HTML with valid inputs', () => {
    const firstName = 'Max';
    const lastName = 'Mustermann';
    const message = 'Das ist eine Testnachricht.';

    const result = normalizeHTML(
      generateEmailHTML(firstName, lastName, message),
    );

    expect(result).toContain('<!DOCTYPE html>');
    expect(result).toContain('<html lang="de">');
    expect(result).toContain('<title>Danke für deine Nachricht</title>');
    expect(result).toContain('<h1>Vielen Dank für deine Nachricht!</h1>');
    expect(result).toContain('<p>Hallo Max Mustermann,</p>');
    expect(result).toContain(
      '<div class="message"> Das ist eine Testnachricht. </div>',
    );
    expect(result).toContain('Wir melden uns so schnell wie möglich bei dir.');
  });

  it('should handle empty strings gracefully', () => {
    const firstName = '';
    const lastName = '';
    const message = '';

    const result = normalizeHTML(
      generateEmailHTML(firstName, lastName, message),
    );

    expect(result).toContain('<!DOCTYPE html>');
    expect(result).toContain('<html lang="de">');
    expect(result).toContain('<p>Hallo ,</p>');
    expect(result).toContain('<div class="message"> </div>');
  });

  it('should not crash with special characters in inputs', () => {
    const firstName = '<script>alert("XSS")</script>';
    const lastName = '<b>Test</b>';
    const message = 'Nachricht mit <b>Sonderzeichen</b>: <>&"\'';

    const result = normalizeHTML(
      generateEmailHTML(firstName, lastName, message),
    );

    expect(result).toContain(
      'Hallo <script>alert("XSS")</script> <b>Test</b>,',
    );
    expect(result).toContain('Nachricht mit <b>Sonderzeichen</b>: <>&"\'');
  });
});
