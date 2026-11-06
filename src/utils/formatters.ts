export function formatBDT(val: number, lang: 'bn' | 'en' = 'en'): string {
  const rounded = Math.round(val);
  const formattedEn = rounded.toLocaleString('en-IN');
  if (lang === 'bn') {
    // Convert to Bengali numerals
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const bnNum = formattedEn.replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
    return `৳${bnNum}`;
  }
  return `৳${formattedEn}`;
}

export function toBengaliNumber(val: number | string): string {
  const str = String(val);
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
}
