import api from './axios';

/**
 * GET /api/nfc/verify
 * 실물 NFC(제품 부착)에 각인된 uid로 제품을 식별한다. 비로그인 호출 허용
 * (온보딩 퍼널: 태그→인증서→캐릭터→로그인).
 * - 비로그인이면 방문 태그 이력만 생성되고, 검증·캐릭터 정보는 로그인 때와 동일하게 내려간다.
 * - 부수효과: 매장 태그 방문 이력이 기록된다 (매장 태그 이력 화면에 반영).
 * - 응답의 character는 캐릭터 컬렉션 추가 화면에서 사용한다 (없으면 null).
 * - 검증 후 uid를 그대로 정품 인증서 조회(GET /api/nfc/certificate?uid=)에 넘긴다.
 */
export async function readStoreTagNfc(uid) {
  const { data } = await api.get('/api/nfc/verify', { params: { uid } });
  return normalizeStoreTagNfc(data.data);
}

function normalizeStoreTagNfc(data) {
  if (!data) return null;

  return {
    productId: data.productId,
    productName: data.productName ?? '',
    character: data.character
      ? {
          id: data.character.id,
          name: data.character.name ?? '',
          collectionName: data.character.collectionName ?? '',
          description: data.character.description ?? '',
          imageUrl: data.character.imageUrl ?? '',
        }
      : null,
  };
}
