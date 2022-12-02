import {
  DEFAULT_COLOR,
  DEFAULT_COLOR_TRANSPARENT,
} from '../utils/config/constants';
import { DEVICE_WIDTH } from '../utils/config/device';

const logger = DeviceRuntimeCore.HmLogger.getLogger('fetch_api');
const { messageBuilder } = getApp()._options.globalData;

Page({
  state: {},
  label: null,
  build() {


    labelTemps = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 5,
      y: 100,
      w: (DEVICE_WIDTH - px(10)),
      h: px(180),
      text: '...',
      color: 0xaaaaaa,
      text_size: px(22),
      text_style: hmUI.text_style.WRAP,
      align_v: hmUI.align.CENTER_V,
      align_h: hmUI.align.CENTER_H,
    });

    btnRefresh = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: (DEVICE_WIDTH - px(400)) / 2,
      y: px(300),
      w: px(400),
      h: px(50),
      text_size: px(24),
      radius: px(12),
      normal_color: DEFAULT_COLOR,
      press_color: DEFAULT_COLOR_TRANSPARENT,
      text: 'Refresh',
      click_func: (button_widget) => {
        logger.log('click button');
        this.fetchTemps();
      }
    });

    this.fetchTemps();
  },
  fetchTemps() {
    btnRefresh.setProperty(hmUI.prop.TEXT, '...');

    messageBuilder.request({
      method: 'GET_TEMPS',
    })
    .then(data => {
      logger.log('receive data', data);
      const {
        temp1 = 'fail',
        temp2 = 'fail',
        temp3 = 'fail',
        temp_resolution = 'fail',
        uptime = 'fail',
      } = data;

      btnRefresh.setProperty(hmUI.prop.TEXT, 'Refresh');

      labelTemps.setProperty(hmUI.prop.TEXT,
`Water: ${temp2} °C
Heat: ${temp3} °C`
      );
    })
    .catch(err => {
      logger.log('receive data failed', err);
      btnRefresh.setProperty(hmUI.prop.TEXT, 'Refresh');
    })
  },
});
