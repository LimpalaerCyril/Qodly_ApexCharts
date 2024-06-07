import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

import { IAnnotation, ILineProps } from './Line.config';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Line: FC<ILineProps> = ({ displayLabels, annotations, strokeCurve, chartType, exportable, zoomable, titlePosition, legendPosition, name, style, className, classNames = [] }) => {
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
			if (typeof v === 'string')
				datas = JSON.parse(v);
			else
				datas = JSON.parse(JSON.stringify(v));

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
								background: annotation.backgroundColor
							}
						}
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
								background: annotation.backgroundColor
							}
						}
					});
				} else if (annotation.axis === 'point') {
					points.push({
						x: applyCoordType(annotation.coordType, annotation.coordFrom),
						y: parseFloat(annotation.coordTo),
						marker: {
							size: 8,
							fillColor: annotation.backgroundColor,
							strokeColor: annotation.borderColor,
							radius: 2
						},
						label: {
							text: annotation.text,
							style: {
								color: '#fff',
								background: annotation.backgroundColor
							}
						}
					});
				}
			}
			var annotationsObj = { yaxis: yaxis, xaxis: xaxis, points: points }

			const showLegend = legendPosition !== 'hidden';
			const legendPos: 'top' | 'bottom' | 'left' | 'right' = showLegend ? legendPosition! : 'top';

			const options: ApexOptions = {
				chart: {
					type: chartType,
					zoom: {
						enabled: datas.options.chart?.zoom?.enabled ?? zoomable
					},
					toolbar: {
						tools: {
							download: datas.options.chart?.toolbar?.tools?.download ?? exportable
						}
					}
				},
				annotations: {
					yaxis: datas.options.annotations?.yaxis ?? annotationsObj.yaxis,
					xaxis: datas.options.annotations?.xaxis ?? annotationsObj.xaxis,
					points: datas.options.annotations?.points ?? annotationsObj.points
				},
				dataLabels: {
					enabled: datas.options.dataLabels?.enabled ?? displayLabels
				},
				legend: {
					show: datas.options.legend?.show ?? showLegend,
					position: datas.options.legend?.position ?? legendPos,
				},
				stroke: {
					curve: datas.options.stroke?.curve ?? strokeCurve
				},
				title: {
					text: datas.options.title?.text ?? name,
					align: datas.options.title?.align ?? titlePosition
				},
				grid: {
					row: {
						colors: datas.options.grid?.row?.colors ?? ['#f3f3f3', 'transparent'],
						opacity: datas.options.grid?.row?.opacity ?? 0.5
					}
				},
				xaxis: {
					categories: datas.options.xaxis?.categories,
				}
			};
			var series: any[] = datas.series

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
			<ReactApexChart options={chartData.options} series={chartData.series} type={chartData.options.chart?.type ?? 'line'} />
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

export default Line;
