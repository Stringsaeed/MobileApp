import HelpApi from '@services/http';
import Geolocation from '@react-native-community/geolocation';

export const getHome = (
  type: 'LOADING' | 'REFRESHING' | 'UPDATING' = 'LOADING',
  page: number = 0,
  per_page: number = 10,
  offer_help: boolean = true,
  type_id: string,
) => (dispatch: (arg0: {type: string; payload?: any}) => void) => {
  dispatch({
    type: `@HOME/${type}`,
  });
  Geolocation.getCurrentPosition(
    async res => {
      try {
        const response = await HelpApi.get(
          `/posts?per_page=${per_page}&page=${page}&latitude=${
            res.coords.latitude
          }&longitude=${
            res.coords.longitude
          }&type_id=${type_id}&offer_help=${offer_help}`,
        );
        console.log(res, response);
        dispatch({
          type: '@HOME/SUCCESS',
          payload: response.data.data,
        });
      } catch (e) {
        console.log(e.response || e);
        dispatch({
          type: '@HOME/ERROR',
        });
      }
    },
    error => {
      console.log(error);
      dispatch({
        type: '@HOME/ERROR',
      });
    },
    {
      enableHighAccuracy: true,
    },
  );
};
