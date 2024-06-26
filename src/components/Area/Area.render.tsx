import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

import { IAreaProps } from './Area.config';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

const Area: FC<IAreaProps> = ({ displayLabels, xAxisTitle, yAxisTitle, strokeCurve, chartType, exportable, zoomable, titlePosition, legendPosition, name, style, className, classNames = [] }) => {
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
          }
        },
        yaxis: {
          title: {
            text: datas.options.yaxis?.title?.text ?? yAxisTitle
          }
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
      <ReactApexChart options={chartData.options} series={chartData.series} type={chartData.options.chart?.type ?? 'area'} />
    </div>
  );
};

export default Area;
