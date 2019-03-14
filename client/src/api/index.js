import axios from 'axios';

import { BASE_URL } from '../constants/api';
import { base64 } from '../utils';

const getExpression = async expression => {
  const encodeExpr = base64.encode(expression);
  const { data } = await axios.get(`${BASE_URL}/calculate/${encodeExpr}`);
  return data && data.response;
};

const api = {
  getExpression
};

export default api;
