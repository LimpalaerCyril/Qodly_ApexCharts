import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

import { IDonutProps } from './Donut.config';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Donut: FC<IDonutProps> = ({ displayLabels, chartType, gradient, titlePosition, legendPosition, name, style, className, classNames = [] }) => {
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

      const gradientType = gradient ? 'gradient' : 'solid';
      const showLegend = legendPosition !== 'hidden';
      const legendPos: 'top' | 'bottom' | 'left' | 'right' = showLegend ? legendPosition! : 'top';

      const options: ApexOptions = {
        chart: {
          type: chartType
        },
        responsive: datas.options.responsive ?? [{
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
          enabled: datas.options.dataLabels?.enabled ?? displayLabels
        },
        labels: datas.options.labels ?? [],
        fill: {
          type: gradientType
        },
        legend: {
          show: datas.options.legend?.show ?? showLegend,
          position: datas.options.legend?.position ?? legendPos
        },
        title: {
          text: datas.options.title?.text ?? name,
          align: datas.options.title?.align ?? titlePosition
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
      <ReactApexChart options={chartData.options} series={chartData.series} type={chartData.options.chart?.type ?? 'donut'} />
    </div>
  );
};

export default Donut;
