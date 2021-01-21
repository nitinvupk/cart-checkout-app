import { config } from '../config';

type HotelService = {
  requestAllHotels: () => Promise<any>
};

export const hotelService: HotelService = {
  requestAllHotels,
};

function requestAllHotels (): Promise<any> {
  const requestOptions = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return fetch(`${config.baseUrl}/hotels`, requestOptions)
    .then((response: any): Promise<any> => {
      if (response.status !== 200) {
        return Promise.reject('something went wrong!');
      }
      return response.json();
    })
    .then((json: any): Promise<any> | void => {
      if (json) {
        return json;
      }
    }).catch((error: string): string | void => {
      if (error) {
        return error;
      }
    });
}
