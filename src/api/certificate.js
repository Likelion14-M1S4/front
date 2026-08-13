import api from './axios';
import { certificateInfo } from '../mock/certificate';

// 백엔드 연동 전까지 mock 사용. 연동 시 axios 호출만 살리면 됩니다.

/**
 * GET /api/store-tag/certificate
 *
 * 응답:
 * { productName, imageUrl, orderNumber, productNumber, issuedAt, purchasedAt, receivedAt, seller, purchasePlace }
 */
export async function getCertificate() {
  // const { data } = await api.get('/store-tag/certificate');
  // return normalizeCertificate(data);

  return Promise.resolve(normalizeCertificate(certificateInfo));
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
