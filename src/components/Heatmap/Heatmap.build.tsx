import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';

import { IAnnotation, IHeatmapProps } from './Heatmap.config';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Heatmap: FC<IHeatmapProps> = ({
	displayLabels,
	annotations,
	chartColors = [],
	xAxisTitle,
	yAxisTitle,
	strokeCurve,
	exportable,
	zoomable,
	titlePosition,
	legendPosition,
	name,
	colorFlipper,
	colorRanges,
	style,
	className,
	classNames = [],
}) => {
	const {
		connectors: { connect },
	} = useEnhancedNode();

	const showLegend = legendPosition !== 'hidden';
	const legendPos: 'top' | 'bottom' | 'left' | 'right' = showLegend ? legendPosition! : 'top';
	let initialColors = ['#008FFB'];
	const chartColorsArr =
		chartColors.length > 0
			? chartColors?.map((color) =>
					color.color.length > 7 ? color.color.substring(0, 7) : color.color,
				)
			: initialColors;
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
				type: 'heatmap',
				zoom: {
					enabled: zoomable,
				},
				toolbar: {
					tools: {
						download: exportable,
					},
				},
			},
			plotOptions: {
				heatmap: {
					colorScale: {
						inverse: colorFlipper,
						ranges:
							colorRanges?.map((color) => ({
								from: color.from,
								to: color.to,
								color:
									color.color.length > 7
										? color.color.substring(0, 7)
										: color.color,
							})) ?? [],
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
			},
			yaxis: {
				title: {
					text: yAxisTitle,
				},
			},
		}),
		[
			legendPos,
			name,
			chartColorsArr,
			showLegend,
			titlePosition,
			zoomable,
			exportable,
			strokeCurve,
			annotations,
			xAxisTitle,
			yAxisTitle,
			displayLabels,
			colorFlipper,
			colorRanges,
		],
	);

	const series = useMemo(
		// Prevents unnecessary re-renders if no editor changes
		() => [
			{
				name: 'Metric1',
				data: [
					{ x: 'Jan', y: 30 },
					{ x: 'Feb', y: 20 },
					{ x: 'Mar', y: 50 },
					{ x: 'Apr', y: 60 },
					{ x: 'May', y: 40 },
					{ x: 'Jun', y: 70 },
					{ x: 'Jul', y: 55 },
					{ x: 'Aug', y: 80 },
					{ x: 'Sep', y: 30 },
					{ x: 'Oct', y: 75 },
					{ x: 'Nov', y: 85 },
					{ x: 'Dec', y: 45 },
				],
			},
			{
				name: 'Metric2',
				data: [
					{ x: 'Jan', y: 40 },
					{ x: 'Feb', y: 30 },
					{ x: 'Mar', y: 60 },
					{ x: 'Apr', y: 20 },
					{ x: 'May', y: 50 },
					{ x: 'Jun', y: 80 },
					{ x: 'Jul', y: 45 },
					{ x: 'Aug', y: 65 },
					{ x: 'Sep', y: 70 },
					{ x: 'Oct', y: 60 },
					{ x: 'Nov', y: 40 },
					{ x: 'Dec', y: 75 },
				],
			},
			{
				name: 'Metric3',
				data: [
					{ x: 'Jan', y: 20 },
					{ x: 'Feb', y: 40 },
					{ x: 'Mar', y: 30 },
					{ x: 'Apr', y: 70 },
					{ x: 'May', y: 60 },
					{ x: 'Jun', y: 90 },
					{ x: 'Jul', y: 85 },
					{ x: 'Aug', y: 95 },
					{ x: 'Sep', y: 40 },
					{ x: 'Oct', y: 55 },
					{ x: 'Nov', y: 65 },
					{ x: 'Dec', y: 50 },
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

export default Heatmap;
