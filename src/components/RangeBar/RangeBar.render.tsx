import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

import { IAnnotation, IRangeBarProps } from './RangeBar.config';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Bar: FC<IRangeBarProps> = ({
	displayLabels,
	chartColors,
	annotations,
	yAxisTickAmount,
	xAxisTickAmount,
	yAxisMin,
	yAxisMax,
	xAxisTitle,
	yAxisTitle,
	exportable,
	zoomable,
	titlePosition,
	legendPosition,
	name,
	orientation,
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
					type: 'rangeBar',
					zoom: {
						enabled: datas.options.chart?.zoom?.enabled ?? zoomable,
					},
					toolbar: {
						tools: {
							download: datas.options.chart?.toolbar?.tools?.download ?? exportable,
						},
					},
				},
				plotOptions: {
					bar: {
						horizontal: orientation === 'horizontal',
					},
				},
				colors: chartColorsArr,
				annotations: {
					yaxis: datas.options.annotations?.yaxis ?? annotationsObj.yaxis,
					xaxis: datas.options.annotations?.xaxis ?? annotationsObj.xaxis,
					points: datas.options.annotations?.points ?? annotationsObj.points,
				},
				dataLabels: {
					enabled: datas.options.dataLabels?.enabled ?? displayLabels,
				},
				legend: {
					show: datas.options.legend?.show ?? showLegend,
					position: datas.options.legend?.position ?? legendPos,
				},
				title: {
					text: datas.options.title?.text ?? name,
					align: datas.options.title?.align ?? titlePosition,
				},
				grid: {
					row: {
						colors: datas.options.grid?.row?.colors ?? ['#f3f3f3', 'transparent'],
						opacity: datas.options.grid?.row?.opacity ?? 0.5,
					},
				},
				xaxis: {
					title: {
						text: datas.options.xaxis?.title?.text ?? xAxisTitle,
					},
					tickAmount: datas.options.xaxis?.tickAmount ?? xAxisTickAmount,
				},
				yaxis: {
					title: {
						text: datas.options.yaxis?.title?.text ?? yAxisTitle,
					},
					tickAmount: datas.options.xaxis?.tickAmount ?? yAxisTickAmount,
					min: datas.options.yaxis?.min ?? yAxisMin,
					max: datas.options.yaxis?.max ?? yAxisMax,
				},
			};
			var series: any[] = datas.series;
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
			<ReactApexChart options={chartData.options} series={chartData.series} type="rangeBar" />
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

export default Bar;
