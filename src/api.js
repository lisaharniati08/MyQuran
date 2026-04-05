const BASE_URL = 'https://equran.id/api/v2';

export const getSurahList = async () => {
  const response = await fetch(`${BASE_URL}/surat`);
  if (!response.ok) throw new Error('Gagal mengambil data');
  return await response.json();
};

export const getSurahDetail = async (nomor) => {
  const response = await fetch(`${BASE_URL}/surat/${nomor}`);
  if (!response.ok) throw new Error('Gagal mengambil detail surat');
  return await response.json();
};