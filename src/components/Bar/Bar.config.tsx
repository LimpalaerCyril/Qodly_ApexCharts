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
			accept: ['string', 'object'],
		},
	},
	defaultProps: {
		name: 'Qodly Bar Chart name',
		legendPosition: 'top',
		titlePosition: 'center',
		chartType: 'bar',
		exportable: true,
		zoomable: true,
		displayLabels: true,
		strokeCurve: 'straight',
		xAxisTickAmount: 12,
		yAxisTickAmount: 8,
		style: {
			width: '500px',
		},
	},
} as T4DComponentConfig<IBarProps>;

export interface IBarProps extends webforms.ComponentProps {
	name?: string;
	chartType?: 'bar' | 'line' | 'area';
	chartColors?: IColor[];
	exportable?: boolean;
	zoomable?: boolean;
	displayLabels?: boolean;
	strokeCurve?: 'straight' | 'smooth' | 'monotoneCubic' | 'stepline';
	legendPosition?: 'top' | 'bottom' | 'left' | 'right' | 'hidden';
	titlePosition?: 'center' | 'left' | 'right';
	xAxisTitle?: string;
	yAxisTitle?: string;
	yAxisTickAmount?: number;
	xAxisTickAmount?: number;
	yAxisMin?: number;
	yAxisMax?: number;
}

export interface IColor {
	color: string;
}
