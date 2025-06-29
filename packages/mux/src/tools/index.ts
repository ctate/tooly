import { z } from 'zod'
import {
  ListVideoViewsSchema,
  GetVideoViewSchema,
  ListErrorsSchema,
  ListFiltersSchema,
  ListFilterValuesSchema,
  ListDimensionsSchema,
  ListDimensionValuesSchema,
  ListExportsSchema,
  ListExportsViewsSchema,
  ListBreakdownValuesSchema,
  GetOverallValuesSchema,
  ListInsightsSchema,
  GetMetricTimeseriesDataSchema,
  ListAllMetricValuesSchema,
  ListMonitoringDimensionsSchema,
  ListMonitoringMetricsSchema,
  GetMonitoringBreakdownSchema,
  GetMonitoringBreakdownTimeseriesSchema,
  GetMonitoringHistogramTimeseriesSchema,
  GetMonitoringTimeseriesSchema,
  ListRealtimeDimensionsSchema,
  ListRealtimeMetricsSchema,
  GetRealtimeBreakdownSchema,
  GetRealtimeHistogramTimeseriesSchema,
  GetRealtimeTimeseriesSchema,
  ListIncidentsSchema,
  GetIncidentSchema,
  ListRelatedIncidentsSchema,
  ListAnnotationsSchema,
  CreateAnnotationSchema,
  GetAnnotationSchema,
  UpdateAnnotationSchema,
  DeleteAnnotationSchema,
} from '../types.js'

// Export all tools
export * from './list-video-views.js'
export * from './get-video-view.js'
export * from './list-errors.js'
export * from './list-filters.js'
export * from './list-filter-values.js'
export * from './list-dimensions.js'
export * from './list-dimension-values.js'
export * from './list-exports.js'
export * from './list-exports-views.js'
export * from './list-breakdown-values.js'
export * from './get-overall-values.js'
export * from './list-insights.js'
export * from './get-metric-timeseries-data.js'
export * from './list-all-metric-values.js'
export * from './list-monitoring-dimensions.js'
export * from './list-monitoring-metrics.js'
export * from './get-monitoring-breakdown.js'
export * from './get-monitoring-breakdown-timeseries.js'
export * from './get-monitoring-histogram-timeseries.js'
export * from './get-monitoring-timeseries.js'
export * from './list-realtime-dimensions.js'
export * from './list-realtime-metrics.js'
export * from './get-realtime-breakdown.js'
export * from './get-realtime-histogram-timeseries.js'
export * from './get-realtime-timeseries.js'
export * from './list-incidents.js'
export * from './get-incident.js'
export * from './list-related-incidents.js'
export * from './list-annotations.js'
export * from './create-annotation.js'
export * from './get-annotation.js'
export * from './update-annotation.js'
export * from './delete-annotation.js'

// Import tool definitions
import { listVideoViewsTool } from './list-video-views.js'
import { getVideoViewTool } from './get-video-view.js'
import { listErrorsTool } from './list-errors.js'
import { listFiltersTool } from './list-filters.js'
import { listFilterValuesTool } from './list-filter-values.js'
import { listDimensionsTool } from './list-dimensions.js'
import { listDimensionValuesTool } from './list-dimension-values.js'
import { listExportsTool } from './list-exports.js'
import { listExportsViewsTool } from './list-exports-views.js'
import { listBreakdownValuesTool } from './list-breakdown-values.js'
import { getOverallValuesTool } from './get-overall-values.js'
import { listInsightsTool } from './list-insights.js'
import { getMetricTimeseriesDataTool } from './get-metric-timeseries-data.js'
import { listAllMetricValuesTool } from './list-all-metric-values.js'
import { listMonitoringDimensionsTool } from './list-monitoring-dimensions.js'
import { listMonitoringMetricsTool } from './list-monitoring-metrics.js'
import { getMonitoringBreakdownTool } from './get-monitoring-breakdown.js'
import { getMonitoringBreakdownTimeseriesTool } from './get-monitoring-breakdown-timeseries.js'
import { getMonitoringHistogramTimeseriesTool } from './get-monitoring-histogram-timeseries.js'
import { getMonitoringTimeseriesTool } from './get-monitoring-timeseries.js'
import { listRealtimeDimensionsTool } from './list-realtime-dimensions.js'
import { listRealtimeMetricsTool } from './list-realtime-metrics.js'
import { getRealtimeBreakdownTool } from './get-realtime-breakdown.js'
import { getRealtimeHistogramTimeseriesTool } from './get-realtime-histogram-timeseries.js'
import { getRealtimeTimeseriesTool } from './get-realtime-timeseries.js'
import { listIncidentsTool } from './list-incidents.js'
import { getIncidentTool } from './get-incident.js'
import { listRelatedIncidentsTool } from './list-related-incidents.js'
import { listAnnotationsTool } from './list-annotations.js'
import { createAnnotationTool } from './create-annotation.js'
import { getAnnotationTool } from './get-annotation.js'
import { updateAnnotationTool } from './update-annotation.js'
import { deleteAnnotationTool } from './delete-annotation.js'

// Export all tools as an array
export const Tools = [
  listVideoViewsTool,
  getVideoViewTool,
  listErrorsTool,
  listFiltersTool,
  listFilterValuesTool,
  listDimensionsTool,
  listDimensionValuesTool,
  listExportsTool,
  listExportsViewsTool,
  listBreakdownValuesTool,
  getOverallValuesTool,
  listInsightsTool,
  getMetricTimeseriesDataTool,
  listAllMetricValuesTool,
  listMonitoringDimensionsTool,
  listMonitoringMetricsTool,
  getMonitoringBreakdownTool,
  getMonitoringBreakdownTimeseriesTool,
  getMonitoringHistogramTimeseriesTool,
  getMonitoringTimeseriesTool,
  listRealtimeDimensionsTool,
  listRealtimeMetricsTool,
  getRealtimeBreakdownTool,
  getRealtimeHistogramTimeseriesTool,
  getRealtimeTimeseriesTool,
  listIncidentsTool,
  getIncidentTool,
  listRelatedIncidentsTool,
  listAnnotationsTool,
  createAnnotationTool,
  getAnnotationTool,
  updateAnnotationTool,
  deleteAnnotationTool,
] as const

// Tool parameter validation schemas
export const toolParameterSchemas = {
  listVideoViews: ListVideoViewsSchema,
  getVideoView: GetVideoViewSchema,
  listErrors: ListErrorsSchema,
  listFilters: ListFiltersSchema,
  listFilterValues: ListFilterValuesSchema,
  listDimensions: ListDimensionsSchema,
  listDimensionValues: ListDimensionValuesSchema,
  listExports: ListExportsSchema,
  listExportsViews: ListExportsViewsSchema,
  listBreakdownValues: ListBreakdownValuesSchema,
  getOverallValues: GetOverallValuesSchema,
  listInsights: ListInsightsSchema,
  getMetricTimeseriesData: GetMetricTimeseriesDataSchema,
  listAllMetricValues: ListAllMetricValuesSchema,
  listMonitoringDimensions: ListMonitoringDimensionsSchema,
  listMonitoringMetrics: ListMonitoringMetricsSchema,
  getMonitoringBreakdown: GetMonitoringBreakdownSchema,
  getMonitoringBreakdownTimeseries: GetMonitoringBreakdownTimeseriesSchema,
  getMonitoringHistogramTimeseries: GetMonitoringHistogramTimeseriesSchema,
  getMonitoringTimeseries: GetMonitoringTimeseriesSchema,
  listRealtimeDimensions: ListRealtimeDimensionsSchema,
  listRealtimeMetrics: ListRealtimeMetricsSchema,
  getRealtimeBreakdown: GetRealtimeBreakdownSchema,
  getRealtimeHistogramTimeseries: GetRealtimeHistogramTimeseriesSchema,
  getRealtimeTimeseries: GetRealtimeTimeseriesSchema,
  listIncidents: ListIncidentsSchema,
  getIncident: GetIncidentSchema,
  listRelatedIncidents: ListRelatedIncidentsSchema,
  listAnnotations: ListAnnotationsSchema,
  createAnnotation: CreateAnnotationSchema,
  getAnnotation: GetAnnotationSchema,
  updateAnnotation: UpdateAnnotationSchema,
  deleteAnnotation: DeleteAnnotationSchema,
} as const 