import React, { Component, Fragment } from 'react';
import { orderBy } from 'lodash';

import { withTheme } from '../../components';
import {
  Chart,
  getSpecId,
  Settings,
  Axis,
  getAxisId,
  Position,
  ScaleType,
} from '@elastic/charts';

import {
  EUI_DARK_THEME,
  EUI_LIGHT_THEME,
} from '../../../../src/themes/charts/themes';

import {
  EuiSwitch,
  EuiSpacer,
  EuiTitle,
  EuiFlexGrid,
  EuiFlexItem,
  EuiCard,
  EuiCode,
  EuiCopy,
  EuiButton,
} from '../../../../src/components';

import { SIMPLE_GITHUB_DATASET, GITHUB_DATASET } from './data';
import { ChartTypeCard, MultiChartCard, CHART_COMPONENTS } from './shared';

class _CategoryChart extends Component {
  constructor(props) {
    super(props);

    this.idPrefix = 'chartType';

    this.state = {
      multi: false,
      stacked: false,
      rotated: true,
      ordered: true,
      formatted: false,
      chartType: 'BarSeries',
    };
  }

  onMultiChange = multiObject => {
    this.setState({
      ...multiObject,
    });
  };

  onRotatedChange = e => {
    this.setState({
      rotated: e.target.checked,
    });
    console.log(e.target.checked);
  };

  onOrderedChange = e => {
    this.setState({
      ordered: e.target.checked,
    });
  };

  onFormatChange = e => {
    this.setState({
      formatted: e.target.checked,
    });
  };

  onChartTypeChange = chartType => {
    this.setState({
      chartType: chartType,
    });
  };

  render() {
    const isDarkTheme = this.props.theme.includes('dark');
    const theme = isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme;
    const gridHorizontalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridHorizontalSettings
      : EUI_LIGHT_THEME.gridHorizontalSettings;
    const gridVerticalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridVerticalSettings
      : EUI_LIGHT_THEME.gridVerticalSettings;

    const ChartType = CHART_COMPONENTS[this.state.chartType];

    const DATASET = this.state.multi ? GITHUB_DATASET : SIMPLE_GITHUB_DATASET;

    return (
      <Fragment>
        <EuiTitle size="xxs">
          <h3>
            Number of GitHub issues per visualization type
            {this.state.multi && ' by type of issue'}
          </h3>
        </EuiTitle>

        <EuiSpacer size="s" />

        <Chart size={[undefined, 300]}>
          <Settings
            theme={theme}
            showLegend={this.state.multi}
            legendPosition={Position.Right}
            rotation={this.state.rotated ? 90 : 0}
          />
          <ChartType
            id={getSpecId('issues')}
            name="Issues"
            data={
              this.state.ordered
                ? orderBy(DATASET, ['count'], ['desc'])
                : orderBy(DATASET, ['vizType'], ['asc'])
            }
            xAccessor="vizType"
            yAccessors={['count']}
            splitSeriesAccessors={this.state.multi ? ['issueType'] : undefined}
            stackAccessors={this.state.stacked ? ['issueType'] : undefined}
          />
          <Axis
            id={getAxisId('bottom-axis')}
            position={this.state.rotated ? Position.Left : Position.Bottom}
            xScaleType={ScaleType.Ordinal}
            showGridLines
            gridLineStyle={gridVerticalSettings}
          />
          <Axis
            id={getAxisId('left-axis')}
            position={this.state.rotated ? Position.Bottom : Position.Left}
            tickFormat={this.state.formatted ? d => `${Number(d)}k` : undefined}
            showGridLines
            gridLineStyle={gridHorizontalSettings}
          />
        </Chart>

        <EuiSpacer />

        <EuiFlexGrid columns={3}>
          <EuiFlexItem>
            <EuiCard
              textAlign="left"
              title="Chart titles"
              description="Providing a meaningful, descriptive title can eliminate the necessity for axis titles. Though the title may need to change depending on the number of series."
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiCard
              textAlign="left"
              title="Order and rotation"
              description="It can be easier to compare categories by ordering them in descending order. Rotating the chart to be horizontal can give more space to the category name.">
              <EuiSwitch
                label="Order by count descending"
                checked={this.state.ordered}
                onChange={this.onOrderedChange}
              />
              <EuiSpacer size="s" />
              <EuiSwitch
                label="Rotate 90deg"
                checked={this.state.rotated}
                onChange={this.onRotatedChange}
              />
            </EuiCard>
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiCard
              textAlign="left"
              title="Tick marks"
              description="Tick marks should be spaced out properly and number values should be formatted. For example, if the number is in the thousands, remove a few numerals and add the `k` symbol.">
              <EuiCode>1000 ⇢ 1k</EuiCode> &nbsp; <EuiCode>20000 ⇢ 20k</EuiCode>
              <EuiSpacer size="s" />
              <EuiSwitch
                label="Simulate thousands formatting"
                checked={this.state.formatted}
                onChange={this.onFormatChange}
              />
            </EuiCard>
          </EuiFlexItem>

          <EuiFlexItem>
            <ChartTypeCard onChange={this.onChartTypeChange} />
          </EuiFlexItem>

          <EuiFlexItem>
            <MultiChartCard onChange={this.onMultiChange} />
          </EuiFlexItem>
        </EuiFlexGrid>

        <EuiSpacer />

        <div className="eui-textCenter">
          <EuiCopy
            textToCopy={`<Chart size={[undefined, 200]}>
  <Settings
    theme={isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme}
    rotation={${this.state.rotated ? 90 : 0}}
    showLegend={${this.state.multi}}
    ${this.state.multi ? 'legendPosition={Position.Right}' : ''}
  />
  <${this.state.chartType}
    id={getSpecId('issues')}
    name="Issues"
    data={${
      this.state.ordered
        ? "orderBy([{vizType: 'Data Table', count: 24, issueType: 'Bug'},{vizType: 'Heatmap',count: 12, issueType: 'Other'}], ['count'], ['desc'])"
        : "orderBy([{vizType: 'Data Table', count: 24, issueType: 'Bug'},{vizType: 'Heatmap',count: 12, issueType: 'Other'}], ['vizType'], ['asc'])"
    }}
    xAccessor="vizType"
    yAccessors={['count']}
    ${this.state.multi ? "splitSeriesAccessors={['issueType']}" : ''}
    ${this.state.stacked ? "stackAccessors={['issueType']}" : ''}
  />
  <Axis
    id={getAxisId('bottom-axis')}
    showGridLines
    position={${this.state.rotated ? 'Position.Left' : 'Position.Bottom'}}
    xScaleType={ScaleType.Ordinal}
  />
  <Axis
    id={getAxisId('left-axis')}
    showGridLines
    position={${this.state.rotated ? 'Position.Bottom ' : 'Position.Left'}}
    ${this.state.formatted ? 'tickFormat={d => `${Number(d)}k`}' : ''}
  />
</Chart>`}>
            {copy => (
              <EuiButton fill onClick={copy} iconType="copyClipboard">
                Copy code of current configuration
              </EuiButton>
            )}
          </EuiCopy>
        </div>
      </Fragment>
    );
  }
}

export const CategoryChart = withTheme(_CategoryChart);
