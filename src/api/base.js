import API from './config';

const ERROR_NONE = 0;
const ERROR_REQUEST_FAILED = 10000;
const ERROR_NO_TAGS_PROVIDED = 10001;
const errMap = new Map([
  [ERROR_NONE, "Success"],
  [ERROR_REQUEST_FAILED, "Request to Nununi API failed."],
  [ERROR_NO_TAGS_PROVIDED, "No tags provided."]
]);

function getPayload(errCode = ERROR_NONE, errMsg = '', result = '') {
  return {
    errcode: errCode,
    errmsg: errMsg || errMap.get(errCode) || 'Undefined error.',
    result
  };
}

const getApiData = async (
  id = process.env.NUNUNI_ID,
  version,
  data,
  method = ''
) => {
  if (!data.tags) {
    return getPayload(ERROR_NO_TAGS_PROVIDED);
  }

  try {
    const { status, data: response } = await API.post(
      `/${version}/${id}/content/${method}?t=${new Date().getTime()}&c=${Math.random()}`,
      data
    );
    if (status !== 200) {
      return getPayload(status, response.error_description, response);
    }
    return response;
  } catch (e) {
    return getPayload(ERROR_REQUEST_FAILED);
  }
};

const getProductTagApiData = async (
  id = process.env.NUNUNI_ID,
  version,
  productId
) => {
  try {
    const { status, data: response } = await API.get(
      `/${version}/${id}/products/${productId}/tags?t=${new Date().getTime()}`
    );
    if (status !== 200) {
      return getPayload(status, response.error_description, response);
    }
    return response;
  } catch (e) {
    return getPayload(ERROR_REQUEST_FAILED);
  }
};

const getRelatedProductsApiData = async (
  id = process.env.NUNUNI_ID,
  version,
  productId
) => {
  try {
    const { status, data: response } = await API.get(
      `/${version}/${id}/products/${productId}/tags?select=relatedProducts&t=${new Date().getTime()}`
    );
    if (status !== 200) {
      return getPayload(status, response.error_description, response);
    }
    return response;
  } catch (e) {
    return getPayload(ERROR_REQUEST_FAILED);
  }
};

const getClassifyApiData = async (
  id = process.env.NUNUNI_ID,
  version,
  productIds
) => {
  try {
    const { status, data: response } = await API.post(
      `/${version}/${id}/products/classify?t=${new Date().getTime()}`,
      productIds
    );
    if (status !== 200) {
      return getPayload(status, response.error_description, response);
    }
    return response;
  } catch (e) {
    return getPayload(ERROR_REQUEST_FAILED);
  }
};

const getClassifyProductTypeApiData = async (
  id = process.env.NUNUNI_ID,
  version,
  productType
) => {
  try {
    const { status, data: response } = await API.post(
      `/${version}/${id}/products/classifyProductType?t=${new Date().getTime()}`,
      productType
    );
    if (status !== 200) {
      return getPayload(status, response.error_description, response);
    }
    return response;
  } catch (e) {
    return getPayload(ERROR_REQUEST_FAILED);
  }
};

export {
  getApiData,
  getProductTagApiData,
  getRelatedProductsApiData,
  getClassifyApiData,
  getClassifyProductTypeApiData
};
