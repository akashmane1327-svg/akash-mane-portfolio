const RESUME_PATH = '/resume.pdf';
const RESUME_FILENAME = 'Akash_Ashok_Mane_Resume.pdf';

export function downloadResume() {
  if (typeof window === 'undefined') return;

  const fallback = () => {
    window.open(RESUME_PATH, '_blank', 'noopener,noreferrer');
  };

  const link = document.createElement('a');
  link.href = RESUME_PATH;
  link.download = RESUME_FILENAME;
  link.rel = 'noopener noreferrer';
  link.style.display = 'none';
  document.body.appendChild(link);

  const isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);

  try {
    if (isSafari) {
      link.target = '_blank';
      link.click();
      window.setTimeout(() => link.remove(), 150);
      return;
    }

    link.click();
    window.setTimeout(() => link.remove(), 150);
  } catch {
    link.remove();
    fallback();
  }

  void fetch(RESUME_PATH, { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('Resume unavailable');
      return response.blob();
    })
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      const blobLink = document.createElement('a');
      blobLink.href = blobUrl;
      blobLink.download = RESUME_FILENAME;
      blobLink.rel = 'noopener noreferrer';
      blobLink.style.display = 'none';
      document.body.appendChild(blobLink);
      try {
        blobLink.click();
      } catch {
        fallback();
      }
      window.setTimeout(() => {
        blobLink.remove();
        window.URL.revokeObjectURL(blobUrl);
      }, 1500);
    })
    .catch(() => {
      fallback();
    });
}

export { RESUME_FILENAME, RESUME_PATH };
