import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';

import { IAreaProps } from './Area.config';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Area: FC<IAreaProps> = ({ displayLabels, strokeCurve, chartType, exportable, zoomable, titlePosition, legendPosition, name, style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const showLegend = legendPosition !== 'hidden';
  const legendPos: 'top' | 'bottom' | 'left' | 'right' = showLegend ? legendPosition! : 'top';

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
    [legendPos, name, showLegend, titlePosition, zoomable, exportable, strokeCurve, chartType, displayLabels]
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

export default Area;