import api from './axios';

/**
 * GET /api/products/tags/:storeId
 * 매장 정보(주소·전화·운영시간)와 그 매장에서 태그한 제품들을 날짜별 그룹으로 반환한다.
 * taggedGroups는 최근 날짜 순이며, 같은 제품이 여러 날짜에 중복 등장할 수 있다.
 */
export async function getStoreTagDetail(storeId) {
  try {
    const { data } = await api.get(`/api/products/tags/${storeId}`);
    return normalizeStoreTagDetail(data.data);
  } catch (err) {
    if (err.response?.status === 404) {
      const error = new Error('Store not found');
      error.status = 404;
      throw error;
    }
    throw err;
  }
}

function normalizeStoreTagDetail(data) {
  return {
    storeName: data.storeName ?? '',
    address: data.address ?? '',
    phone: data.phone ?? '',
    hours: Array.isArray(data.hours)
      ? data.hours.map((item) => ({
          day: item.day ?? '',
          time: item.time ?? '',
        }))
      : [],
    taggedGroups: Array.isArray(data.taggedGroups)
      ? data.taggedGroups.map((group) => ({
          date: group.date ?? '',
          products: Array.isArray(group.products)
            ? group.products.map((product) => ({
                id: product.id,
                name: product.name ?? '',
                imageUrl: product.imageUrl ?? '',
              }))
            : [],
        }))
      : [],
  };
}
