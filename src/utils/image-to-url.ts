import { imageServerUrl } from '@/configs/constants/global.constants';

export function imageToUrl(image: string) {
  return 'https://' + imageServerUrl + '/' + image;
}
