"use strict";

import axios from 'axios'

export { fetchJsonUrl }

async function fetchJsonUrl(url: string) {
  const response = await axios.get(url)
  return response.data
}
