import axios from "axios";
import { API_URI } from '../constants';

const getPresets = async () => {
  const { data } = await axios.get(API_URI);
  return data;
};

export {
  getPresets,
};
