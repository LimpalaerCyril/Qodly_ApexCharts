import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { FaChartArea } from "react-icons/fa";

import AreaSettings, { BasicSettings } from './Area.settings';

export default {
  craft: {
    displayName: 'Area',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(AreaSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Area',
    exposed: true,
    icon: FaChartArea,
    events: [
      {
        label: 'On Click',
        value: 'onclick',
      },
      {
        label: 'On Blur',
        value: 'onblur',
      },
      {
        label: 'On Focus',
        value: 'onfocus',
      },
      {
        label: 'On MouseEnter',
        value: 'onmouseenter',
      },
      {
        label: 'On MouseLeave',
        value: 'onmouseleave',
      },
      {
        label: 'On KeyDown',
        value: 'onkeydown',
      },
      {
        label: 'On KeyUp',
        value: 'onkeyup',
      },
    ],
    datasources: {
      accept: ['string', 'object'],
    },
  },
  defaultProps: {
    name: 'Qodly Area Chart name',
    legendPosition: 'top',
    titlePosition: 'center',
    chartType: 'area',
    exportable: true,
    zoomable: true,
    strokeCurve: 'straight',
    style: {
      width: '500px',
    },
  },
} as T4DComponentConfig<IAreaProps>;

export interface IAreaProps extends webforms.ComponentProps {
  name?: string;
  chartType?: 'area' | 'bar' | 'line';
  exportable?: boolean;
  zoomable?: boolean;
  strokeCurve?: 'straight' | 'smooth' | 'monotoneCubic' | 'stepline';
  legendPosition?: 'top' | 'bottom' | 'left' | 'right' | 'hidden';
  titlePosition?: 'center' | 'left' | 'right';
  xAxisTitle?: string;
  yAxisTitle?: string;
}
