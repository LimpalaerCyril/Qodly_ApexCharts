import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { FaChartBar } from "react-icons/fa";

import BarSettings, { BasicSettings } from './Bar.settings';

export default {
	craft: {
		displayName: 'Bar',
		kind: EComponentKind.BASIC,
		props: {
			name: '',
			classNames: [],
			events: [],
		},
		related: {
			settings: Settings(BarSettings, BasicSettings),
		},
	},
	info: {
		displayName: 'Bar',
		exposed: true,
		icon: FaChartBar,
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
			accept: ['object'],
		},
	},
	defaultProps: {
		name: 'Qodly Bar Chart name',
		legendPosition: 'top',
		titlePosition: 'center',
		chartType: 'bar',
		exportable: true,
		zoomable: true,
		strokeCurve: 'straight',
		style: {
			width: '500px',
		},
	},
} as T4DComponentConfig<IBarProps>;

export interface IBarProps extends webforms.ComponentProps {
	name?: string;
	chartType?: 'bar' | 'line' | 'area';
	exportable?: boolean;
	zoomable?: boolean;
	strokeCurve?: 'straight' | 'smooth' | 'monotoneCubic' | 'stepline';
	legendPosition?: 'top' | 'bottom' | 'left' | 'right' | 'hidden';
	titlePosition?: 'center' | 'left' | 'right';
}
