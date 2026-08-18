import api from './axios';

/**
 * GET /api/nfc/certificate
 * 정품 인증서를 반환한다. 비로그인 호출 허용(태그 직후 로그인 전 화면).
 * uid(NFC 태그 값)를 넘기면 그 실물 제품의 최신 구매 기록 기준으로 발급한다(유저 무관, verify에서 받은 uid 그대로 전달).
 * uid를 생략하면 로그인 유저의 최근 구매 1건 기준 (비로그인 + uid 없으면 404).
 */
export async function getCertificate(uid) {
  const { data } = await api.get('/api/nfc/certificate', {
    params: uid ? { uid } : undefined,
  });
  return normalizeCertificate(data.data);
}

function normalizeCertificate(data) {
  return {
    productName: data?.productName ?? '',
    imageUrl: data?.imageUrl ?? '',
    orderNumber: data?.orderNumber ?? '',
    productNumber: data?.productNumber ?? '',
    issuedAt: data?.issuedAt ?? '',
    purchasedAt: data?.purchasedAt ?? '',
    receivedAt: data?.receivedAt ?? '',
    seller: data?.seller ?? '',
    purchasePlace: data?.purchasePlace ?? '',
  };
}
