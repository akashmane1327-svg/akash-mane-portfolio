const RESUME_PATH = '/resume.pdf';
const RESUME_FILENAME = 'Akash_Ashok_Mane_Resume.pdf';

export function openResume() {
  if (typeof window === 'undefined') return;
  window.open(RESUME_PATH, '_blank', 'noopener,noreferrer');
}

export const downloadResume = openResume;

export { RESUME_FILENAME, RESUME_PATH };

