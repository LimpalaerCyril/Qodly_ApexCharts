import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

import { IAnnotation, IHeatmapProps } from './Heatmap.config';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Heatmap: FC<IHeatmapProps> = ({
	displayLabels,
	chartColors = [],
	annotations,
	xAxisTitle,
	yAxisTitle,
	strokeCurve,
	exportable,
	zoomable,
	titlePosition,
	legendPosition,
	colorFlipper,
	colorRanges,
	name,
	style,
	className,
	classNames = [],
}) => {
	const { connect } = useRenderer();
	const [chartData, setChartData] = useState<any>(null);
	const {
		sources: { datasource: ds },
	} = useSources();

	useEffect(() => {
		if (!ds) return;

		const listener = async () => {
			const v = await ds.getValue<any>();
			var datas;
			if (typeof v === 'string') datas = JSON.parse(v);
			else datas = JSON.parse(JSON.stringify(v));

			const showLegend = legendPosition !== 'hidden';
			const legendPos: 'top' | 'bottom' | 'left' | 'right' = showLegend
				? legendPosition!
				: 'top';
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

			const options: ApexOptions = {
				chart: {
					type: 'heatmap',
					zoom: {
						enabled: datas.options?.chart?.zoom?.enabled ?? zoomable,
					},
					toolbar: {
						tools: {
							download: datas.options?.chart?.toolbar?.tools?.download ?? exportable,
						},
					},
				},
				plotOptions: {
					heatmap: {
						colorScale: {
							inverse:
								datas.options?.plotOptions?.heatmap?.colorScale?.inverse ??
								colorFlipper,
							ranges:
								datas.options?.plotOptions?.heatmap?.colorScale?.ranges ??
								colorRanges?.map((color) => ({
									from: color.from,
									to: color.to,
									color:
										color.color.length > 7
											? color.color.substring(0, 7)
											: color.color,
								})) ??
								[],
						},
					},
				},
				colors: chartColorsArr,
				annotations: {
					yaxis: datas.options?.annotations?.yaxis ?? annotationsObj.yaxis,
					xaxis: datas.options?.annotations?.xaxis ?? annotationsObj.xaxis,
					points: datas.options?.annotations?.points ?? annotationsObj.points,
				},
				dataLabels: {
					enabled: datas.options?.dataLabels?.enabled ?? displayLabels,
				},
				legend: {
					show: datas.options?.legend?.show ?? showLegend,
					position: datas.options?.legend?.position ?? legendPos,
				},
				stroke: {
					curve: datas.options?.stroke?.curve ?? strokeCurve,
				},
				title: {
					text: datas.options?.title?.text ?? name,
					align: datas.options?.title?.align ?? titlePosition,
				},
				grid: {
					row: {
						colors: datas.options?.grid?.row?.colors ?? ['#f3f3f3', 'transparent'],
						opacity: datas.options?.grid?.row?.opacity ?? 0.5,
					},
				},
				xaxis: {
					type: 'category',
					title: {
						text: datas.options?.xaxis?.title?.text ?? xAxisTitle,
					},
				},
				yaxis: {
					title: {
						text: datas.options?.yaxis?.title?.text ?? yAxisTitle,
					},
				},
			};
			var series: any[] = datas.series ?? [];

			var chart = {
				options: options,
				series: series,
			};

			setChartData(chart);
		};

		listener();

		ds.addListener('changed', listener);

		return () => {
			ds.removeListener('changed', listener);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ds]);

	if (!chartData) return null;

	return (
		<div ref={connect} style={style} className={cn(className, classNames)}>
			<ReactApexChart options={chartData.options} series={chartData.series} type="heatmap" />
		</div>
	);
};

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
