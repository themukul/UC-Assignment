import Axios from 'axios';
import * as Constants from './actionConstants';

export const getFetchedImageAction = (payload) => {
  return (
    {
      type: Constants.GET_FETCHED_IMAGES,
      payload: payload
    }
  );
}

export const fetchImagesAction = (skipCount = 0) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: `https://www.urbanclap.com/api/v1/content/weddings/ideas?skip=${skipCount}&limit=24`,
    })
      .then((response) => {
        if (!response.data.isError && !response.data.success.data.seo_media_details.isError) {
          let img_payload = [];
          response.data.success.data.seo_media_details.payload.map((value, index) => {
            let img_obj = {};
            img_obj.alt_tag = value.alt_tag;
            img_obj.id = value.id + index;
            img_obj.name = value.name;
            img_obj.url = value.cloudinary_urls.base_url + value.cloudinary_urls.medium.low_res + value.cloudinary_urls.s3_path;
            img_obj.array_index = index; 
            img_payload.push(img_obj);
          });
          dispatch(getFetchedImageAction(img_payload));
        } else {
          console.log("Error in fetched response !");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}