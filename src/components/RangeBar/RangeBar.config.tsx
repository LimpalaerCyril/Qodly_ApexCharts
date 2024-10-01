import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { BsCalendar3Range } from 'react-icons/bs';

import RangeBarSettings, { BasicSettings } from './RangeBar.settings';

export default {
	craft: {
		displayName: 'RangeBar',
		kind: EComponentKind.BASIC,
		props: {
			name: '',
			classNames: [],
			events: [],
		},
		related: {
			settings: Settings(RangeBarSettings, BasicSettings),
		},
	},
	info: {
		displayName: 'RangeBar',
		exposed: true,
		icon: BsCalendar3Range,
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
		orientation: 'vertical',
		legendPosition: 'top',
		titlePosition: 'center',
		exportable: true,
		zoomable: true,
		displayLabels: true,
		xAxisTickAmount: 12,
		yAxisTickAmount: 8,
		style: {
			width: '500px',
		},
	},
} as T4DComponentConfig<IRangeBarProps>;

export interface IRangeBarProps extends webforms.ComponentProps {
	name?: string;
	orientation?: 'vertical' | 'horizontal';
	annotations?: IAnnotation[];
	chartColors?: IColor[];
	exportable?: boolean;
	zoomable?: boolean;
	displayLabels?: boolean;
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

export interface IAnnotation {
	text: string;
	axis: 'x' | 'y' | 'point';
	coordType: 'string' | 'number' | 'datetime';
	coordFrom: string;
	coordTo: string;
	backgroundColor: string;
	borderColor: string;
}
