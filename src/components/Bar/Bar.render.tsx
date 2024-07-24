import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

import { IBarProps } from './Bar.config';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Bar: FC<IBarProps> = ({ displayLabels, chartColors, yAxisTickAmount, xAxisTickAmount, yAxisMin, yAxisMax, xAxisTitle, yAxisTitle, strokeCurve, chartType, exportable, zoomable, titlePosition, legendPosition, name, style, className, classNames = [] }) => {
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

      const showLegend = legendPosition !== 'hidden';
      const legendPos: 'top' | 'bottom' | 'left' | 'right' = showLegend ? legendPosition! : 'top';
      let initialColors = ['#FF4560', '#008FFB', '#00E396', '#FEB019', '#FF5828', '#FFD601', '#36B37E', '#008FFB', '#4BC0C0', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'];
      const chartColorsArr = chartColors?.map((color) => color.color) ?? initialColors;

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
        colors: chartColorsArr,
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
          title: {
            text: datas.options.xaxis?.title?.text ?? xAxisTitle
          },
          tickAmount: datas.options.xaxis?.tickAmount ?? xAxisTickAmount
        },
        yaxis: {
          title: {
            text: datas.options.yaxis?.title?.text ?? yAxisTitle
          },
          tickAmount: datas.options.xaxis?.tickAmount ?? yAxisTickAmount,
          min: datas.options.yaxis?.min ?? yAxisMin,
          max: datas.options.yaxis?.max ?? yAxisMax
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
      <ReactApexChart options={chartData.options} series={chartData.series} type={chartData.options.chart?.type ?? 'bar'} />
    </div>
  );
};

export default Bar;
