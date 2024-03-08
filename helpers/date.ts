export function validateDateAsString(dateAsString: string | undefined) {
  if (!dateAsString) {
    return false;
  }
  try {
    const [isoDate] = new Date(dateAsString).toISOString().split('T');
    return dateAsString === isoDate;
  } catch {
    return false;
  }
}
