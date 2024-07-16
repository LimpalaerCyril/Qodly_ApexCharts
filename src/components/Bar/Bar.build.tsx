import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';

import { IBarProps } from './Bar.config';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Bar: FC<IBarProps> = ({ displayLabels, chartColors, yAxisMin, yAxisMax, xAxisTitle, yAxisTitle, strokeCurve, chartType, exportable, zoomable, titlePosition, legendPosition, name, style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const showLegend = legendPosition !== 'hidden';
  const legendPos: 'top' | 'bottom' | 'left' | 'right' = showLegend ? legendPosition! : 'top';
  let initialColors = ['#FF4560', '#008FFB', '#00E396', '#FEB019', '#FF5828', '#FFD601', '#36B37E', '#008FFB', '#4BC0C0', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'];
  const chartColorsArr = chartColors?.map((color) => color.color) ?? initialColors;
  var datamultiplier = 1;
  if (yAxisMax) {
    datamultiplier = yAxisMax / 150;
  }

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
      colors: chartColorsArr,
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
        title: {
          text: xAxisTitle
        }
      },
      yaxis: {
        title: {
          text: yAxisTitle
        },
        min: yAxisMin,
        max: yAxisMax
      }
    }),
    [legendPos, name, showLegend, titlePosition, zoomable, exportable, strokeCurve, chartType, xAxisTitle, yAxisTitle, displayLabels, yAxisMin, yAxisMax]
  )

  const series = useMemo( // Prevents unnecessary re-renders if no editor changes
    () => [
      {
        name: 'Value 1',
        data: Array.from({ length: 9 }, () => (Math.floor(Math.random() * 150 * datamultiplier)))
      },
      {
        name: 'Value 2',
        data: Array.from({ length: 9 }, () => (Math.floor(Math.random() * 150 * datamultiplier)))
      }
    ],
    [yAxisMax]
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

export default Bar;