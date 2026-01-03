import DOMPurify from 'dompurify';

export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['br', 'i', 'b', 'em', 'strong'], // Allow only safe formatting tags
    ALLOWED_ATTR: [], // No attributes allowed for simplicity
  });
};