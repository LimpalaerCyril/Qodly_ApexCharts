import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';

import { IAnnotation, ILineProps } from './Line.config';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Line: FC<ILineProps> = ({ displayLabels, annotations, strokeCurve, chartType, exportable, zoomable, titlePosition, legendPosition, name, style, className, classNames = [] }) => {
	const {
		connectors: { connect },
	} = useEnhancedNode();

	const showLegend = legendPosition !== 'hidden';
	const legendPos: 'top' | 'bottom' | 'left' | 'right' = showLegend ? legendPosition! : 'top';
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
					size: 4,
					fillColor: annotation.backgroundColor,
					strokeColor: annotation.borderColor
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

	const options: ApexOptions = useMemo(
		() => ({
			chart: {
				type: chartType,
				zoom: {
					enabled: zoomable
				},
				toolbar: {
					tools: {
						download: exportable
					}
				}
			},
			annotations: {
				yaxis: annotationsObj.yaxis,
				xaxis: annotationsObj.xaxis,
				points: annotationsObj.points,
			},
			dataLabels: {
				enabled: displayLabels
			},
			legend: {
				show: showLegend,
				position: legendPos,
			},
			stroke: {
				curve: strokeCurve
			},
			title: {
				text: name,
				align: titlePosition
			},
			grid: {
				row: {
					colors: ['#f3f3f3', 'transparent'],
					opacity: 0.5
				}
			},
			xaxis: {
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
			}
		}),
		[legendPos, name, showLegend, titlePosition, zoomable, exportable, strokeCurve, chartType, annotations, displayLabels]
	)

	const series = useMemo( // Prevents unnecessary re-renders if no editor changes
		() => [
			{
				name: 'Value 1',
				data: Array.from({ length: 9 }, () => Math.floor(Math.random() * 150))
			},
			{
				name: 'Value 2',
				data: Array.from({ length: 9 }, () => Math.floor(Math.random() * 150))
			}
		],
		[legendPos, name, showLegend, titlePosition, zoomable, exportable]
	)

	const chart = {
		series: series,
		options: options,
	}

	return (
		<div ref={connect} style={style} className={cn(className, classNames)}>
			<ReactApexChart options={chart.options} series={chart.series} type={chart.options.chart?.type} />
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