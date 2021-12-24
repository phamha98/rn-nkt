import {translate} from '../../library/utils/i18n/translate';
import moment from 'moment';
export function DateToString(date: Date): any {
  const now = new Date();
  if (moment(now).format('DD/MM/YYYY') === moment(date).format('DD/MM/YYYY')) {
    return translate('date:tvToday') ? translate('date:tvToday') : '';
  }
  const yesterday = new Date(now.getMilliseconds() - 1000 * 3600 * 24);
  if (
    moment(yesterday).format('DD/MM/YYYY') === moment(date).format('DD/MM/YYYY')
  ) {
    return translate('date:tvYesterday') ? translate('date:tvYesterday') : '';
  }
  return moment(date).format('DD/MM/YYYY');
}
