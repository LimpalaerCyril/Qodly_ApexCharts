import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';
import {
  CgAlignBottom,
  CgAlignLeft,
  CgAlignRight,
  CgAlignTop,
  CgAlignCenter,
  CgShortcut,
} from 'react-icons/cg';

const commonSettings: TSetting[] = [
  {
    key: 'name',
    label: 'Name',
    type: ESetting.TEXT_FIELD,
    defaultValue: 'Qodly chart summary',
  },
  {
    key: 'titlePosition',
    label: 'Title Position',
    type: ESetting.RADIOGROUP,
    defaultValue: 'center',
    options: [
      { value: 'left', icon: CgAlignLeft },
      { value: 'center', icon: CgAlignCenter },
      { value: 'right', icon: CgAlignRight },
    ],
  },
  {
    key: 'legendPosition',
    label: 'Legend Position',
    type: ESetting.RADIOGROUP,
    defaultValue: 'top',
    options: [
      { value: 'top', icon: CgAlignTop },
      { value: 'bottom', icon: CgAlignBottom },
      { value: 'left', icon: CgAlignLeft },
      { value: 'right', icon: CgAlignRight },
      { value: 'hidden', icon: CgShortcut },
    ],
  },
  {
    key: 'chartType',
    label: 'Chart Type',
    type: ESetting.SELECT,
    defaultValue: 'area',
    options: [
      { value: 'area', label: 'Area' },
      { value: 'bar', label: 'Bar' },
      { value: 'line', label: 'Line' },
    ],
  },
  {
    key: 'strokeCurve',
    label: 'Stroke Curve',
    type: ESetting.SELECT,
    defaultValue: 'straight',
    options: [
      { value: 'straight', label: 'Straight' },
      { value: 'smooth', label: 'Smooth' },
      { value: 'monotoneCubic', label: 'Monotone Cubic' },
      { value: 'stepline', label: 'Stepline' },
    ],
  },
  {
    key: 'zoomable',
    label: 'Zoomable',
    type: ESetting.CHECKBOX,
  },
  {
    key: 'exportable',
    label: 'Exportable',
    type: ESetting.CHECKBOX,
  },
  {
    key: 'displayLabels',
    label: 'Display labels',
    type: ESetting.CHECKBOX,
  },
  {
    type: ESetting.DATAGRID,
    key: 'annotations',
    name: 'text',
    label: 'Annotations',
    data: [
      {
        key: 'text',
        label: 'Text',
        type: ESetting.TEXT_FIELD,
        defaultValue: 'Annotation',
      },
      {
        key: 'axis',
        label: 'Axis',
        type: ESetting.SELECT,
        defaultValue: 'x',
        options: [
          { value: 'x', label: 'X' },
          { value: 'y', label: 'Y' },
          { value: 'point', label: 'Point' },
        ],
      },
      {
        key: 'coordType',
        label: 'Coordinate Type',
        type: ESetting.SELECT,
        defaultValue: 'string',
        options: [
          { value: 'string', label: 'String' },
          { value: 'number', label: 'Number' },
          { value: 'datetime', label: 'Datetime' }
        ],
      },
      {
        key: 'coordFrom',
        label: 'From (X for point)',
        placeholder: '2021-01-01',
        type: ESetting.TEXT_FIELD,
      },
      {
        key: 'coordTo',
        label: 'To (Y for point)',
        placeholder: '2021-12-31',
        type: ESetting.TEXT_FIELD,
      },
      {
        key: 'backgroundColor',
        label: 'Background Color',
        type: ESetting.COLOR_PICKER,
        name: 'backgroundColor',
      },
      {
        key: 'borderColor',
        label: 'Border Color',
        type: ESetting.COLOR_PICKER,
        name: 'borderColor',
      }
    ],
  }
];

const Settings: TSetting[] = [
  {
    key: 'properties',
    label: 'Properties',
    type: ESetting.GROUP,
    components: commonSettings,
  },
  ...load(DEFAULT_SETTINGS).filter(
    'style.overflow',
    'display',
    'style.boxShadow',
    'style.textShadow',
    'style.textAlign',
    'style.textDecorationLine',
    'style.fontStyle',
    'style.textTransform',
  ),
];

export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter(
    'style.overflow',
    'display',
    'style.boxShadow',
    'style.textShadow',
    'style.textAlign',
    'style.textDecorationLine',
    'style.fontStyle',
    'style.textTransform',
  ),
];

export default Settings;
