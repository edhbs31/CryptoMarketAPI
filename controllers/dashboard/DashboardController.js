/* eslint-disable camelcase */
const express = require('express');
const axios = require('axios')
const router = express.Router();
const DashboardService  = require('../../services/DashboardServices')
const {
  HttpSuccess,
  HttpinteralServerError,
  HttpNotFound,
  } = require('../../HttpException/index');
/**
* Display a listing of the resource
*
* @return array of Object
*/

router.get('/', async (req, res) => {
  try {
    // call api using axios
    const crypto = await axios.get(`${process.env.API_CRYPTO}`, {
      headers: { 'X-CMC_PRO_API_KEY': `${process.env.API_KEY_CRYPTO}`, },
    });
    let data = crypto.data.data
    const query= req.query.query;
    // check is there any query to filter data by name
    if (query){
      const dashboardService = new DashboardService();
      data = await dashboardService.FilterData(data, query);
    }
    if (data.length == 0) {
      return HttpNotFound(res, { message: 'No Data return from API' }); 
    }
    return HttpSuccess(res, data);
  } catch (error) {
    return HttpinteralServerError(res, { message: `Internal Server Error ${error}` });
  }
});


module.exports = router;
