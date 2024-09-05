import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';

import { IAnnotation, ICandlestickProps } from './Candlestick.config';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Candlestick: FC<ICandlestickProps> = ({
	displayLabels,
	annotations,
	chartColors,
	xAxisTickAmount,
	yAxisTickAmount,
	yAxisMin,
	yAxisMax,
	xAxisTitle,
	yAxisTitle,
	strokeCurve,
	exportable,
	zoomable,
	titlePosition,
	legendPosition,
	name,
	style,
	className,
	classNames = [],
}) => {
	const {
		connectors: { connect },
	} = useEnhancedNode();

	const showLegend = legendPosition !== 'hidden';
	const legendPos: 'top' | 'bottom' | 'left' | 'right' = showLegend ? legendPosition! : 'top';
	let initialColors = [
		'#FF4560',
		'#008FFB',
		'#00E396',
		'#FEB019',
		'#FF5828',
		'#9E9E9E',
		'#36B37E',
		'#607D8B',
		'#4BC0C0',
		'#E91E63',
		'#9C27B0',
		'#673AB7',
		'#3F51B5',
		'#2196F3',
		'#03A9F4',
		'#00BCD4',
		'#009688',
		'#4CAF50',
		'#8BC34A',
		'#CDDC39',
		'#FFEB3B',
		'#FFC107',
		'#FF9800',
		'#FF5722',
		'#795548',
	];
	const chartColorsArr = chartColors?.map((color) => color.color) ?? initialColors;
	var yaxis: YAxisAnnotations[] = [];
	var xaxis: XAxisAnnotations[] = [];
	var points: PointAnnotations[] = [];
	// TODO: do we need it ?
	for (const annotation of annotations || []) {
		if (annotation.axis === 'y') {
			yaxis.push({
				y: applyCoordType(annotation.coordType, annotation.coordFrom),
				y2: applyCoordType(annotation.coordType, annotation.coordTo),
				borderColor: annotation.borderColor,
				fillColor: annotation.backgroundColor,
				label: {
					text: annotation.text,
					style: {
						color: '#fff',
						background: annotation.backgroundColor,
					},
				},
			});
		} else if (annotation.axis === 'x') {
			xaxis.push({
				x: applyCoordType(annotation.coordType, annotation.coordFrom),
				x2: applyCoordType(annotation.coordType, annotation.coordTo),
				borderColor: annotation.borderColor,
				fillColor: annotation.backgroundColor,
				label: {
					text: annotation.text,
					style: {
						color: '#fff',
						background: annotation.backgroundColor,
					},
				},
			});
		} else if (annotation.axis === 'point') {
			points.push({
				x: applyCoordType(annotation.coordType, annotation.coordFrom),
				y: parseFloat(annotation.coordTo),
				marker: {
					size: 4,
					fillColor: annotation.backgroundColor,
					strokeColor: annotation.borderColor,
				},
				label: {
					text: annotation.text,
					style: {
						color: '#fff',
						background: annotation.backgroundColor,
					},
				},
			});
		}
	}
	var annotationsObj = { yaxis: yaxis, xaxis: xaxis, points: points };

	const options: ApexOptions = useMemo(
		() => ({
			chart: {
				type: 'candlestick',
				zoom: {
					enabled: zoomable,
				},
				toolbar: {
					tools: {
						download: exportable,
					},
				},
			},
			colors: chartColorsArr,
			annotations: {
				yaxis: annotationsObj.yaxis,
				xaxis: annotationsObj.xaxis,
				points: annotationsObj.points,
			},
			dataLabels: {
				enabled: displayLabels,
			},
			legend: {
				show: showLegend,
				position: legendPos,
			},
			stroke: {
				curve: strokeCurve,
			},
			title: {
				text: name,
				align: titlePosition,
			},
			grid: {
				row: {
					colors: ['#f3f3f3', 'transparent'],
					opacity: 0.5,
				},
			},
			xaxis: {
				type: 'category',
				title: {
					text: xAxisTitle,
				},
				tickAmount: xAxisTickAmount,
			},
			yaxis: {
				title: {
					text: yAxisTitle,
				},
				tickAmount: yAxisTickAmount,
				min: yAxisMin,
				max: yAxisMax,
			},
		}),
		[
			legendPos,
			name,
			showLegend,
			titlePosition,
			zoomable,
			exportable,
			strokeCurve,
			annotations,
			xAxisTitle,
			yAxisTitle,
			displayLabels,
			yAxisMin,
			yAxisMax,
			xAxisTickAmount,
			yAxisTickAmount,
		],
	);

	const series = useMemo(
		// Prevents unnecessary re-renders if no editor changes
		() => [
			{
				data: [
					{
						x: '2024-08-01',
						y: [6629.81, 6650.5, 6623.04, 6633.33],
					},
					{
						x: '2024-08-02',
						y: [6632.01, 6643.59, 6620, 6630.11],
					},
					{
						x: '2024-08-03',
						y: [6630.71, 6648.95, 6623.34, 6635.65],
					},
					{
						x: '2024-08-04',
						y: [6635.65, 6651, 6629.67, 6638.24],
					},
					{
						x: '2024-08-05',
						y: [6638.24, 6640, 6620, 6624.47],
					},
					{
						x: '2024-08-06',
						y: [6624.53, 6636.03, 6621.68, 6624.31],
					},
					{
						x: '2024-08-07',
						y: [6624.61, 6632.2, 6617, 6626.02],
					},
					{
						x: '2024-08-08',
						y: [6627, 6627.62, 6584.22, 6603.02],
					},
					{
						x: '2024-08-09',
						y: [6605, 6608.03, 6598.95, 6604.01],
					},
					{
						x: '2024-08-10',
						y: [6604.5, 6614.4, 6602.26, 6608.02],
					},
					{
						x: '2024-08-11',
						y: [6608.02, 6610.68, 6601.99, 6608.91],
					},
					{
						x: '2024-08-12',
						y: [6608.91, 6618.99, 6608.01, 6612],
					},
					{
						x: '2024-08-13',
						y: [6612, 6615.13, 6605.09, 6612],
					},
					{
						x: '2024-08-14',
						y: [6612, 6624.12, 6608.43, 6622.95],
					},
					{
						x: '2024-08-15',
						y: [6623.91, 6623.91, 6615, 6615.67],
					},
				],
			},
		],
		[],
	);

	const chart = {
		series: series,
		options: options,
	};

	return (
		<div ref={connect} style={style} className={cn(className, classNames)}>
			<ReactApexChart
				options={chart.options}
				series={chart.series}
				type={chart.options.chart?.type}
			/>
		</div>
	);
};

// todo: do we need this
function applyCoordType(type: IAnnotation['coordType'], value: string): string | number {
	switch (type) {
		case 'string':
			return value;
		case 'number':
			return parseFloat(value);
		case 'datetime':
			return new Date(value).getTime();
	}
}

export default Candlestick;