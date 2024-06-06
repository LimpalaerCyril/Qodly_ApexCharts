import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';

import { IPieProps } from './Pie.config';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Pie: FC<IPieProps> = ({ chartType, gradient, titlePosition, legendPosition, name, style, className, classNames = [] }) => {
	const {
		connectors: { connect },
	} = useEnhancedNode();

	const gradientType = gradient ? 'gradient' : 'solid';
	const showLegend = legendPosition !== 'hidden';
	const legendPos: 'top' | 'bottom' | 'left' | 'right' = showLegend ? legendPosition! : 'top';

	const options: ApexOptions = useMemo(
		() => ({
			chart: {
				type: chartType
			},
			responsive: [{
				breakpoint: 480,
				options: {
					chart: {
						width: 200
					},
					legend: {
						position: 'bottom'
					}
				}
			}],
			dataLabels: {
				enabled: true
			},
			labels: ["Comedy", "Action", "SciFi", "Drama", "Horror", "Romance", "Thriller", "Mystery", "Documentary"],
			fill: {
				type: gradientType
			},
			legend: {
				show: showLegend,
				position: legendPos
			},
			title: {
				text: name,
				align: titlePosition
			}
		}),
		[legendPos, name, showLegend, titlePosition, chartType, gradientType]
	)

	const series = useMemo( // Prevents unnecessary re-renders if no editor changes
		() => Array.from({ length: 9 }, () => Math.floor(Math.random() * 150)),
		[legendPos, name, showLegend, titlePosition]
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

export default Pie;